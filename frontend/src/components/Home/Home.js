import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { Button } from '@mui/material';

import { getRandPosts, getAllPosts, getPostsFromTopic, getTimeline, getUser } from '../../api/apiRequest.js';
import { formatPost, formatUser } from '../../api/helper.js';

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        //getPosts();
        getCurrentUser();
        getCurrentTimeline();
    }, []);

    const getCurrentUser = () => {
        getUser(1)
        .then((res) => {
            console.log(res.data);
            let usr = formatUser(res.data);
            console.log(usr);

            setUser(usr);
        })
        .catch(err => console.error(`Error: ${err}`));

    }

    const getPosts = () => {
        //getAllPosts()
        getPostsFromTopic("purdue")
        .then((res) => {
            var post_list = [];
            var data = Array.from(res.data);

            data.map((post) => {
                const formattedPost = formatPost(post);
                console.log(formattedPost)
                post_list.push(formattedPost);
            }, setPosts(post_list));

            //setPosts(res.data);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    const getCurrentTimeline = () => {
        getTimeline(1) //change this to currently logged in user
        .then((res) => {
            var post_list = [];
            var data = Array.from(res);

            data.map((post) => {
                const formattedPost = formatPost(post);
                console.log(formattedPost)
                post_list.push(formattedPost);
            }, setPosts(post_list));
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    const getRandom = () => {
        getRandPosts()
        .then((res) => {
            var post_list = [];

            res.map((post) => {
                const formattedPost = formatPost(post);
                console.log(formattedPost)
                post_list.push(formattedPost);
            }, setPosts(post_list));

            console.log(res);
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