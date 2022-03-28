var moment = require('moment'); // require
moment().format(); 

const placeholder = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const nullPostFrontend = {
    id: 0,
    title: "Post not found",
    content: "",
    topic: "",
    type: 0,
    user: "",
    anon: true,
    date: new Date(Date.now()),
    score: 0
}

/*
const nullPostBackend = {
    post_id: databaseLength(),
    post_topic: topic,
    post_type: 0,
    user_id: "user",
    post_is_anonymous: checked,
    post_title: title,
    post_content: content,
    post_time: new Date(Date.now()),
    post_score: 0
};
*/

const nullUserFrontend = {
    username: "User not found",
    pfp: placeholder,
    bio: "",
    follower_count: 0,
    following_count: 0,
    private: true,
    first: "",
    last: "",
    email: ""
}

const nullUserBackend = {
    profile_name: "User not found",
    user_profile_picture: placeholder,
    user_bio: "",
    user_followers_count: 0,
    user_following_count: 0,
    allow_only_followed_users: true,
    first_name: "",
    last_name: "",
    user_email: ""
}

function getRelativeTime(date) {
    if (!date) {
        return "some time ago";
    }
/*
    var now = new Date(Date.now());

    var time = 0;
    var unit = "";

    var secDiff = now.getSeconds() - date.getSeconds();
    if (secDiff > 0) {
        time = secDiff;
        unit = "second";
    }

    var minDiff = now.getMinutes() - date.getMinutes();
    if (minDiff > 0) {
        time = minDiff;
        unit = "minute";
    }
    
    var hrDiff = now.getHours() - date.getHours();
    if (hrDiff > 0) {
        time = hrDiff;
        unit = "hour";
    }

    var monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff > 0) {
        time = monthDiff;
        unit = "month";
    }

    var yearDiff = now.getFullYear() - date.getFullYear();
    if (yearDiff > 0) {
        time = yearDiff;
        unit = "year"
    }

    if (time === 0) {
        return "just now"
    } else if (time !== 1) {
        unit += "s"
    }
*/
    //return time + " " + unit + " ago";
    return moment(date).fromNow();
}

/*
 * Helper functions to normalize data that is pulled from the database into a format
 * that is simpler to read and manipulate in frontend code
 */
function formatPost(post) {    
    //assume post pulled from server is formatted this way:
    /* post = {
        post_id:,
        post_topic:,
        post_type:,
        user_id:,
        post_is_anonymous:,
        post_title:,
        post_content:,
        post_time:,
        post_score:
    };
    */

    //reformat post into simpler keys
    /*
    var newPost = nullPostFrontend;

    if (post.post_id) newPost.id = post_id;

    if (post.post_title) newPost.title = post.post_title;

    if (post.post_)
    */

    try {
        // date timefield is formatted: "2022-03-27T23:46:14.588566Z"
        const momentDate = moment(post.post_time);

        //console.log(momentDate);

        const newPost = {
            id: post.id,
            title: post.post_title,
            content: post.post_content,
            topic: post.post_topic,
            type: post.post_type,
            user: post.user_id,
            anon: post.post_is_anonymous,
            date: momentDate.toDate(),
            score: post.post_score
        }

        //console.log(post);
        //console.log(newPost);

        return newPost;
    } catch (e) {
        console.log("failed to parse post!!");
        return nullPostFrontend;
    }
}

function formatUser(user) {
    // the data is formatted very inconsistently throughout each component so this function fixes that
    console.log(user);
    
    //assume user pulled from server is formatted this way:
    /* user = {
        profile_name: randString(3, false, false),
        user_profile_picture: randImg(),
        user_bio: randString(15 + rand(10), true, true),
        user_followers_count: rand(500),
        user_following_count: rand(500),
        allow_only_followed_users: rand(2),
        first_name: randWord(),
        last_name: randWord(),
        user_email: randString(3, false, true) + "com"
    }
    */

    //reformat user into simpler keys
    //add followers list and following list??
    try {
        const newUser = {
            username: user.profile_name,
            pfp: user.user_profile_picture,
            bio: user.user_bio,
            follower_count: user.user_followers_count,
            following_count: user.user_following_count,
            private: user.allow_only_followed_users,
            first: user.first_name,
            last: user.last_name,
            email: user.user_email
        }

        return newUser;
    } catch (e) {
        console.log("Error: " + e);
        return (nullUserFrontend);
    }
}

/*
 * Helper functions to change data that to send to database into a format
 * that can be read by database
 */
function unformatUser(user) {
    // the data is formatted very inconsistently throughout each component so this function fixes that
    console.log(user);
    
    //assume user pulled from server is formatted this way:
    /* user = {
            username: ,
            pfp: ,
            bio: ,
            follower_count: ,
            following_count: ,
            private: ,
            first: ,
            last: ,
            email:
        }
    */

    //reformat user into simpler keys
    //add followers list and following list??
    try {
        const newUser = {
            profile_name: user.username,
            user_profile_picture: user.pfp,
            user_bio: user.bio,
            user_followers_count: user.follower_count,
            user_following_count: user.following_count,
            allow_only_followed_users: user.private,
            first_name: user.first,
            last_name: user.last,
            user_email: user.email
        }

        return newUser;
    } catch (e) {
        console.log("Error: " + e);
        return (nullUserBackend);
    }
}

export { getRelativeTime, formatPost, formatUser, unformatUser };