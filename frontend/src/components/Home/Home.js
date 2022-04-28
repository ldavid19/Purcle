import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@mui/material';

import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { getRandPosts, getAllPosts, getTimeline, getCurrUser } from '../../api/apiRequest.js';

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [uid, setUID] = useState(0); //current user id

    useEffect(() => {
        //getPosts();
        /*getCurrentUser().then((res) => {
            getCurrentTimeline();
        });
        */
        startup();
    }, []);

    const startup = () => {
        getCurrUser()
        .then((res) => {
            console.log(res);
            let id = res.curr_user;

            console.log(id);
            setUID(id);

            getTimeline(id)
            .then((res) => {
                setPosts(res);
            })
        })
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
            console.log(res);
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
                {console.log(uid)}
                <PostCard postList={posts} curr_user={uid}/> 
            </Row>

            <Link to="/login">
                <Button >
                    Not logged in? Log in here.
                </Button>
            </Link>

            {/*
            <Button onClick={() => {
                getRandom();
            }}>
                reload
            </Button>
            */}
        </Container>
    );
}

export default Home;