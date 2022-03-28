import axios from 'axios';

import { formatPost, formatUser, unformatUser } from "./helper.js";
import { createRandPost, createRandUser } from "./testing.js";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var allPosts = [];
var allTopics = [];

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

async function post(type, id, data) { //POST request
    var ret = [];

    await axios.post('/api/' + type + '/' + id, data)
        .then((res) => {
            ret = res;
        });

    return ret;
}

async function post(type, data) { //POST request
    var ret = [];

    await axios.post('/api/' + type + '/', data, {
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
        .then(res => {
            if (res.status === 400) {
                console.log(res.data);
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

async function getAllTopics() {
    //console.log(allTopics);
    //return allTopics;
    return get("topic");
}


/* POST helper functions */
/* post helpers */
async function makePost(post) {
    allPosts.push(post);
}

async function makeTopic(topic) {
    allTopics.push(topic);
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

/* user helpers */ //MOVE LATER THX
async function updateUser(id, data) {
    return put("profile", id, unformatUser(data));
}

/* signup helpers */
async function postUser(data) {
    const ret = post("sign_up", data);
    console.log("result from post: " + ret);
    return ret;
}

export {
    getRandPosts, getPost, getAllPosts, getUser, getScore, databaseLength,
    makePost, upvote, downvote, updateUser, postUser
};
