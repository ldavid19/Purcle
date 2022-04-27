import axios from 'axios';

import { formatPost, formatUser, unformatUser } from "./helper.js";
import { createRandPost, createRandUser } from "./testing.js";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

/* General functions */
async function get(type, query = "") { //GET request
    var data = [];

    if (query !== "") {
        query = "/" + query;
    }

    const url = '/api/' + type + query;
    console.log("get: " + url);

    await axios.get(url)
        .then((res) => {
            data = res.data;
        });

    console.log(data);

    return data;
}

async function del(type, query = "") { //DELETE request
    var ret = [];

    if (query !== "") {
        query = "/" + query;
    }

    const url = '/api/' + type + query;
    console.log("del: " + url);

    await axios.delete(url)
        .catch(err => {
            if (err.status === 400 || err.status === 401) {
                console.log("error!")
                ret = {"ERROR": "ERROR"};
            }
        })
        .then((res) => {
            ret = res;
        });

    return ret;
}

async function put(type, id, data, token) { //PUT request
    var ret = [];
    //console.log("token " + token)
    await axios.put('/api/' + type + '/' + id, data, {headers:{Authorization: "Token " + token}})
        .catch(err => {
            //console.log("err: " + err);
            if (err.status === 400 || err.status === 401) {
                ret = {"ERROR": "ERROR"};
            }
        })
        .then((res) => {
            ret = res;
        });

    return ret;
}

async function patch(type, id, data, token) { //PUT request
    var ret = [];
    //console.log("token " + token)
    await axios.patch('/api/' + type + '/' + id, data, {headers:{Authorization: "Token " + token}})
        .catch(err => {
            //console.log("err: " + err);
            if (err.status === 400 || err.status === 401) {
                ret = {"ERROR": "ERROR"};
            }
        })
        .then((res) => {
            ret = res;
        });

    return ret;
}

async function post(type, id, data) { //POST request
    var ret = [];

    if (id != "") {
        type = type + "/";
    } else {
        id = id + "/"
    }

    console.log("post: /api/" + type + id);
    console.log(data); 
    await axios.post('/api/' + type + id, data, {
        validateStatus: function (status) {
            console.log("status < 500");
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
        .then(res => {
            if (res.status === 400) {
                console.log(res.data);
                ret = res.data;
            } else {
                console.log(res);
                ret = res.data;
            }
        }
        )

        console.log(ret);
    //console.log("post function done\n");

    return ret;
}

// async function post(type, data) { //POST request
//     var ret = [];

//     await axios.post('/api/' + type, data)
//         .then((res) => {
//             ret = res;
//         });

//     return ret;
// }

/* GET helper functions */
/* post helpers */
async function getRandPosts() {
    var res = [];

    for (var i = 0; i < 100; i++) {
        const post = createRandPost(i);
        res.push(formatPost(post));
    }

    return res;
}

async function getPost(id) {
    let data = [];

    await get("post", id)
        .then((res) => {
            data = formatPost(res);
        })

    console.log(data);
    return data;
}

async function getAllPosts() {
    let data = [];

    await get("posts")
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((post) => {
                data.push(formatPost(post))
            });
        });

    data.sort((a, b) => b.date - a.date);

    return data;
}

async function getPostsFromTopic(topic) {
    let data = [];

    await get("posts", topic)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((post) => {
                //console.log("pushed!")
                data.push(formatPost(post))
            });
            //console.log(data);
        })
        .catch(err => console.error(`Error: ${err}`));

    data.sort((a, b) => b.date - a.date);

    return data;
}


async function getPostsFromUser(user_id) {
    let data = [];

    await get("user_posts", user_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((post) => {
                console.log("pushed!")
                data.push(formatPost(post))
            });
            console.log(data);
        });

    return data;
}

async function getTimeline(userID) {
    console.log("getting timeline: " + userID)
    let user, topics;
    let posts = [];
    
    await getUser(userID)
        .then(res => {
            user = res//formatUser(res.data);
        })
        .catch(err => console.error(`Error: ${err}`));

    if (!user) {
        console.log("user not found");
        return null;
    }

    topics = user.topics;
    //console.log(user)
    //console.log(topics)

    if (!topics) {
        console.log("user does not follow any topics!");
        return null;
    }

    for (let topic in topics) {
        let postsFromTopic = [];

        await getPostsFromTopic(topics[topic])
            .then(res => {
                postsFromTopic = res;
            })
            .catch(err => console.error(`Error: ${err}`));

        //console.log(postsFromTopic);

        posts = posts.concat(postsFromTopic);
    }

    //console.log(posts);
    posts.sort((a, b) => b.date - a.date);

    return posts;        
}

/* user helpers */
async function getUser(id) {
    let data = [];

    await get("profile", id)
        .then((res) => {
            console.log(res);
            data = formatUser(res);
        })
    console.log("getuser" + data);
    return data;
}

async function getCurrUser() {
    console.log(get("current_user"));
    return get("current_user");
}

async function convertToUserProfile(id) {
    console.log("convertToUserProfile returns: " + get("convert", id));
    return get("convert", id);
}

/* topic helpers */
async function getAllTopics() {
    let data = [];

    await get("topic")
        .then((res) => {
            console.log(res);
            data = res;
        });
    return data;
}

async function getTopicInfo(topic) {
    return get("topic", topic);
}

/* misc helpers */
async function getScore(post_id) {
    let score = 0;
    
    await get("post_reactions", post_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);
    
            arr.map((reaction) => {
                if (reaction.reaction_type === 0) {
                    score = score + 1;
                } else {
                    score = score - 1;
                }
            });
        });

    console.log(score)
    return score;
}

async function getSpecReaction(post_id, curr_id) {
    let data = [];
    console.log(curr_id)

    await get("post_reactions", post_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((reaction) => {
                if (reaction.user_id === curr_id) {
                    data.push(reaction)
                }
            });
            console.log(data);
        })
        .catch(err => console.error(`Error: ${err}`));

    var type = 0;
    if (data.length > 0) {
        var temp = data[0];
        if (temp.reaction_type === 0) {
            type = 1;
        } else {
            type = -1;
        }
    }
    return type;
}

async function deleteReaction(post_id, curr_id) {
    let data = [];
    console.log(curr_id)

    await get("post_reactions", post_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((reaction) => {
                data.push(reaction)
            });
            console.log(data);
        });

    if (data.length > 0) {
        var temp = data[0];
        await del("del_reaction", temp.id)
        .catch(err => console.error(`Error: ${err}`));
    }
}

async function getTopic(id) {
    //console.log("getTopic returns: " + get("topic", id));
    return get("topic", id);
}

async function getUsers() {
    return get("userlist");
}

async function getReactionsFromUser(id) {
    let data = [];

    await get("user_reactions", id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((reaction) => {
                data.push(reaction)
            });
            console.log(data);
        });

    return data;
}

async function getInteractions(id) {
    let interactions = {
        posts: [],
        comments: [],
        reactions: []
    };

    let posts = await getPostsFromUser(id)
        .then((res) => {
            interactions.posts = res;
        })
        .catch(err => console.error(`Error: ${err}`));

    let comments = await getCommentsfromUser(id)
        .then((res) => {
            interactions.comments = res;
        })
        .catch(err => console.error(`Error: ${err}`));

    let reactions = await getReactionsFromUser(id)
        .then((res) => {
            interactions.reactions = res;
        })
        .catch(err => console.error(`Error: ${err}`));

    Promise.allSettled([posts, comments, reactions])
        .then(values => {
            console.log(values);
            console.log(interactions);
            return interactions;
        });

    return interactions
}


/* POST helper functions */
/* post helpers */

async function makePost(data) {
    let ret = [];
    console.log("attempting to make a post");

    await post("postlist", "", data)
        .then((res) => {
            console.log(res);
            ret = res;
        })
        .catch(err => console.error(`Error: ${err}`));
    return ret;
}

async function makeImagePost(data) {
    makePost(data)
    // let ret = [];
    // console.log("attempting to make an image post");

    // await post("image", "", data)
    //     .then((res) => {
    //         console.log(res);
    //         ret = res;
    //     })
    //     .catch(err => console.error(`Error: ${err}`));
    // return ret;
}

async function makeTopic(data) {
    console.log(data);
    return post("topic", "", data);
}

/* user helpers */
async function updateUser(id, data, token) {
    return patch("profile_update", id, unformatUser(data), token);
}

/* signup helpers */
async function postUser(data) {
    const ret = post("sign_up", '', data);
    //console.log("result from post: " + ret);
    return ret;
}


/* DM helpers */

async function postThread(data) {
    const ret = post("create-thread",'', data);
    return ret;
}

async function getInbox() {
    const ret = get("inbox");
    return ret;
}

async function getContext(id) {
    const ret = get("inbox", id);
    return ret;
}

async function postMessage(receiver, message) {
    const ret = post("create-message", receiver, message);
    return ret;
}

/* authentication helpers */
async function login(username, password) {
    const data = {
        "username": username,
        "password": password
    }
    console.log(data);
    return post("auth", "login/", data);
}

async function logout(token) {
    const data = {};

    var ret = [];

    await axios.post('/api/auth/logout/', data, {headers:{Authorization: "Token " + token}})
        .then(res => {
            if (res.status === 400) {
                console.log(res.data);
                ret = res.data;
            } else {
                console.log(res);
                ret = res.data;
            }
        }
        );

    console.log("logout done\n");
    return ret;
}

async function getCommentsfromPost(post_id) {
    let data = [];

    await get("post_comments", post_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((comment) => {
                //console.log("pushed!")
                //data.push(formatPost(post))
                data.push(comment)
            });
            console.log(data);
        });

    return data;
}

async function getCommentsfromUser(user_id) {
    let data = [];

    console.log(user_id)
    await get("user_comments", user_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((comment) => {
                //console.log("pushed!")
                //data.push(formatPost(post))
                data.push(comment)
            });
            console.log(data);
        });

    return data;
}

async function getNonanonCommentsfromUser(user_id) {
    let data = [];

    await get("user_nonanon_comments", user_id)
        .then((res) => {
            console.log(res);
            let arr = Array.from(res);

            arr.map((comment) => {
                //console.log("pushed!")
                //data.push(formatPost(post))
                data.push(comment)
            });
            console.log(data);
        });

    return data;
}

async function makeComment(data) {
    let ret = [];
    //console.log("attempting to make a comment");

    await post("comment", "", data)
        .then((res) => {
            console.log(res);
            ret = res;
        })
        .catch(err => console.error(`Error: ${err}`));
    return ret;
}

// async function postProfile(data) {
//     return post("profile_detail", 0, data);
// }

async function makeReaction(data) {
    let ret = [];
    //console.log("attempting to make a comment");

    await post("reaction", "", data)
        .then((res) => {
            console.log(res);
            ret = res;
        })
        .catch(err => console.error(`Error: ${err}`));
    return ret;
}

export {

    getRandPosts, getPost, getAllPosts, getPostsFromTopic, getTimeline, 
    getInbox, getContext, getPostsFromUser,
    getUser, getScore, getAllTopics, getCurrUser, convertToUserProfile, getTopicInfo, getTopic, getUsers,          //GET misc functions
    getCommentsfromPost, getCommentsfromUser, getNonanonCommentsfromUser, getReactionsFromUser, getInteractions,
    makeComment, makeImagePost, makeReaction, getSpecReaction, deleteReaction, 
    updateUser, postUser, login, makePost, makeTopic, logout, postThread, postMessage,            //POST misc functions

};  //always leave a comma on the last entry
