import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Button } from '@mui/material';

import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { getRandPosts, getAllPosts, getPostsFromTopic } from '../../api/apiRequest.js';

function Topic() {
    const [posts, setPosts] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        if (id == "all") {
            getAllPosts()
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
        } else {
            getPostsFromTopic(id) //change this to currently logged in user
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
        }
    }

    /* for testing purposes */
    const getRandom = () => {
        getRandPosts()
        .then((res) => {
            console.log(res);
            setPosts(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    const errorHandler = (e) => {
        navigate('/error', { replace: true });
        window.location.reload();
    }

    return (
        <Container className="Home" style={{padding: "0px 75px"}}>
            <Row style={{padding: "20px 0px"}}>
                <NewPost getPosts={getPosts}/>
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

export default Topic;