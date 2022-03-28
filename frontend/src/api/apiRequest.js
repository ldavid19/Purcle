import axios from 'axios';

import { formatPost, formatUser, unformatUser } from "./helper.js";
import { createRandPost, createRandUser } from "./testing.js";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var allPosts = [];

/* General functions */
async function get(type, query = "") { //GET request
    var data = [];

    if (query != "") {
        query = "/" + query;
    }

    const url = '/api/' + type + query;
    //console.log(url);

    await axios.get(url)
        .then((res) => {
            data = res;
        });

    console.log(data);

    return data;
}

async function put(type, query = "", data) { //PUT request
    var ret = [];

    if (query != "") {
        query = "/" + query;
    }

    await axios.put('/api/' + type + query, data)
        .then((res) => {
            ret = res;
        });

    return ret;
}


/* GET helper functions */
/* post helpers */
async function getRandPosts() {
    var res = [];

    for (var i = 0; i < 100; i++) {
        const post = createRandPost(i);
        res.push(post);
    }

    allPosts = res;

    return res;
}

async function getPost(id) {
    return get("post");
}

async function getAllPosts() {
    console.log(allPosts);
    return get("post");
}

/*
 * retrieve a limited number posts from database
 * with an offset argument so when we want to pull
 * more posts we don't grab the same ones
 * 
 * limit = number of posts to retrieve
 * offset = number of posts to skip over
 */
async function getNumPosts(limit, offset) {

}

/* user helpers */
async function getUser(id) {
    return get("profile", id);
}

/* misc helpers */
async function getScore(id) {
    return 0;
}

function databaseLength() {
    return allPosts.length;
}


/* POST helper functions */
/* post helpers */
async function makePost(post) {
    allPosts.push(post);
}

function incrementScore(id, offset) {
    allPosts[id].score += offset;
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
async function updateUser(id, data) {
    return put("profile", id, unformatUser(data));
}

export { getRandPosts, getPost, getAllPosts, getUser, getScore, databaseLength, 
        makePost, upvote, downvote, updateUser };