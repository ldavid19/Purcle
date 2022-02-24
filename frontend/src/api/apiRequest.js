import { createRandPost, createRandUser } from "./testing.js";

var allPosts = [];

/* GET functions */

function getReq() {
    console.log("oh")
}

async function getRandPosts() {
    var res = [];

    for (var i = 0; i < 100; i++) {
        res.push(createRandPost(i));
    }

    allPosts = res;

    return res;
}

async function getPost(id) {
    return allPosts[id];
}

async function getAllPosts() {
    console.log(allPosts);
    return allPosts;
}

async function getUser() {
    var user = createRandUser(0);

    return user;
}

async function getScore(id) {
    return allPosts[id].post_score;
}

function databaseLength() {
    return allPosts.length;
}

/* POST functions */
async function makePost(post) {
    allPosts.push(post);
}

function incrementScore(id, offset) {
    allPosts[id].post_score += offset;
}

async function upvote(id) {
    incrementScore(id, 1);
    //console.log("upvoted!")
}

async function downvote(id) {
    incrementScore(id, -1);
    console.log("downvoted!")
}

export { getRandPosts, getPost, getAllPosts, getUser, getScore, makePost, databaseLength, upvote, downvote };