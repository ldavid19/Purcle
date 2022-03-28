import axios from 'axios';

import { formatPost, formatUser, unformatUser } from "./helper.js";
import { createRandPost, createRandUser } from "./testing.js";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var allPosts = [];

/* General functions */
async function get(type, id) { //GET request
    var data = [];

    await axios.get('/api/' + type + '/' + id)
        .then((res) => {
            data = res;
        });

    console.log(data);

    return data;
}

async function put(type, id, data) { //PUT request
    var ret = [];

    await axios.put('/api/' + type + '/' + id, data)
        .then((res) => {
            ret = res;
        });

    return ret;
}

async function post(type, id, data) { //POST request
    var ret = [];

    await axios.post('/api/' + type + '/' + id, data)
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
        const post = formatPost(createRandPost(i));
        res.push(post);
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

/* user helpers */
async function getUser(id) {
    return get("profile", id);
}

/* misc helpers */
async function getScore(id) {
    return allPosts[id].score;
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