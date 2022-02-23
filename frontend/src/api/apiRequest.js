import { createRandPost, createRandUser } from "./testing.js";

/* GET functions */

function getReq() {
    console.log("oh")
}

async function getPosts() {
    var res = [];

    for (var i = 0; i < 100; i++) {
        res.push(createRandPost(i));
    }

    return res;
}

async function getPost() {
    return createRandPost();
}

async function getUser() {
    var user = createRandUser(0);

    return user;
}

async function getScore(post) {
    return Math.floor(Math.random() * 500);
}

/* POST functions */
async function upvote(post) {
    console.log("upvoted!")
}

async function downvote(post) {
    console.log("downvoted!")
}

export { getPosts, getPost, getUser, getScore, upvote, downvote };