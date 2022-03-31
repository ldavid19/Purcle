import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { Button } from '@mui/material';

import { getRandPosts, getAllPosts, getPostsFromTopic, getTimeline, getUser, getCurrUser } from '../../api/apiRequest.js';

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [uid, setUID] = useState(4); //current user id

    useEffect(() => {
        //getPosts();
        getCurrentUser();
        getCurrentTimeline();
    }, []);

    const getCurrentUser = () => {
        getCurrUser()
        .then((res) => {

            /*
            console.log(res.data);
            let usr = formatUser(res.data);
            console.log(usr);

            setUser(usr);
            */ 
            //console.log("getting current user: ")
            //console.log(res);
            setUser(res);
        })
        .catch(err => console.error(`Error: ${err}`));

    }

    const getCurrentTimeline = () => {
        getTimeline(uid) //change this to currently logged in user
        .then((res) => {
            /*
            var post_list = [];
            var data = Array.from(res);

            data.map((post) => {
                const formattedPost = formatPost(post);
                console.log(formattedPost)
                post_list.push(formattedPost);
            }, setPosts(post_list));
            */
            //console.log("getting timeline: ")
            //console.log(res);
            setPosts(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    /* for testing purposes */
    const getRandom = () => {
        getRandPosts()
        .then((res) => {
            //var post_list = [];

            /*
            res.map((post) => {
                const formattedPost = formatPost(post);
                console.log(formattedPost)
                post_list.push(formattedPost);
            }, setPosts(post_list));
            */

            console.log(res);
            setPosts(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    return (
        <Container className="Home" style={{padding: "0px 75px"}}>
            <Row style={{padding: "20px 0px"}}>
                <NewPost getPosts={getCurrentTimeline}/>
            </Row>

            <Row style={{display: "flex"}}>
                <PostCard postList={posts}/> 
            </Row>

            <Button onClick={() => {
                getRandom();
            }}>
                reload
            </Button>
        </Container>
    );
}

export default Home;