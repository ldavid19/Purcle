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
    
    await axios.get('/api/' + type + query)
        .then((res) => {
            data = res;
        });

    console.log(data);

    return data;
}

async function put(type, id, data) { //PUT request
    var ret = [];

    if (id != "") {
        id = "/" + id;
    }

    await axios.put('/api/' + type + id, data)
        .then((res) => {
            ret = res;
        });

    return ret;
}

async function post(type, data) { //POST request
    var ret = [];

    await axios.post('/api/' + type, data)
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

async function getAllTopics() {
    return get("topic");
}

async function getTopic(id) {
    return get("topic", id);
}

/* POST helper functions */
/* post helpers */
async function makePost(post) {
    return post("post", post);
}

async function makeTopic(data) {
    return post("topic", data);
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
        makePost, upvote, downvote, updateUser, getAllTopics, makeTopic, getTopic, }; // always leave a comma on the last entry