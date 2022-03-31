import axios from 'axios';

import { formatPost, formatUser, unformatUser } from "./helper.js";
import { createRandPost, createRandUser } from "./testing.js";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

/* General functions */
async function get(type, query = "") { //GET request
    var data = [];

    if (query != "") {
        query = "/" + query;
    }

    const url = '/api/' + type + query;
    console.log("get: " + url);

    await axios.get(url)
        .then((res) => {
            data = res.data;
        });

    //console.log(data);

    return data;
}

async function getNoID(type) {
    var data = [];

    await axios.get('/api/' + type)
        .then((res) => {
            data = res;
        });

    console.log(data);

    return data;
}

async function put(type, id, data, token) { //PUT request
    var ret = [];
    console.log("token " + token)
    await axios.put('/api/' + type + '/' + id, data, {headers:{Authorization: "Token " + token}})
        .catch(err => {
            console.log("err: " + err);
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
    console.log("token " + token)
    await axios.patch('/api/' + type + '/' + id, data, {headers:{Authorization: "Token " + token}})
        .catch(err => {
            console.log("err: " + err);
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
    }

    console.log("post: /api/" + type + id);
    await axios.post('/api/' + type + id, data, {
        validateStatus: function (status) {
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
    // .catch(err => {
    //     ret = err.message;
    //     console.log(err.toJSON());
    // })

    console.log("post function done\n");

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

    return data;
}

async function getPostsFromTopic(topic) {
    let data = [];

    await get("posts", topic)
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
    console.log("what the fuck")
    let user, topics;
    let posts = [];
    
    await getUser(userID)
        .then(res => {
            user = res//formatUser(res.data);
        })
        .catch(err => console.error(`Error: ${err}`));

    if (!user) {
        return null;
    }

    topics = user.topics;
    console.log(user)
    console.log(topics)

    for (let topic in topics) {
        let postsFromTopic = [];

        await getPostsFromTopic(topics[topic])
            .then(res => {
                postsFromTopic = res;
            })
            .catch(err => console.error(`Error: ${err}`));

        console.log(postsFromTopic);

        posts = posts.concat(postsFromTopic);
    }

    console.log(posts);

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

    return data;
}

async function getCurrUser() {
    let data = [];

    await get("current_user")
        .then((res) => {
            data = formatUser(res);
        });

        console.log(data);
    return data;
}

/* misc helpers */
async function getScore(id) {
    return 0;
}

// async function getAllTopics() {
//     console.log(get("topic"));
//     return get("topic");
// }
async function getAllTopics() {
    let data = [];

    await get("topic")
        .then((res) => {
            console.log(res);
            data = res;
        });
    return data;
}

async function getTopic(id) {
    console.log("getTopic returns: " + get("topic", id));
    return get("topic", id);
}

/* POST helper functions */
/* post helpers */

async function makePost(data) {
    let ret = [];
    console.log("attempting to make a post");

    await post("post", "", data)
        .then((res) => {
            console.log("this hits");
            ret = res;
        })
        .catch(err => console.error(`Error: ${err}`));
        console.log("this hits");
    return ret;
}

async function makeTopic(data) {
    console.log(data);
    return post("topic", "", data);
}

function incrementScore(id, offset) {
    //allPosts[id].score += offset;
}

async function upvote(id) {
    incrementScore(id, 1);
    //console.log("upvoted!")
}

async function downvote(id) {
    incrementScore(id, -1);
    //console.log("downvoted!")
}

/* user helpers */
async function updateUser(id, data, token) {
    return patch("profile_update", id, unformatUser(data), token);
}

/* signup helpers */
async function postUser(data) {
    const ret = post("sign_up", '', data);
    console.log("result from post: " + ret);
    return ret;
}

/* authentication helpers */
async function login(data) {
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

// async function postProfile(data) {
//     return post("profile_detail", 0, data);
// }

export {
    getRandPosts, getPost, getAllPosts, getPostsFromTopic, getTimeline,     //GET post functions
    getUser, getScore, getAllTopics, getCurrUser, getTopic,           //GET misc functions
    upvote, downvote, updateUser, postUser, login, makePost, makeTopic, logout,             //POST misc functions
};  //always leave a comma on the last entry
