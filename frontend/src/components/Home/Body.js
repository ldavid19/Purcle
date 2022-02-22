import { Container, Row } from 'react-bootstrap';
import React, { Component, useState, useEffect }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { getPost } from '../../api/apiRequest.js';

function Body() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getNewPosts();
    }, []);

    const getNewPosts = () => {
        getPost()
        .then((res) => {
            setPosts(res);
            console.log(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    return (
        <Container style={{padding: "25px 50px 75px"}}>
            <Row>
                <NewPost />
            </Row>

            <Row>
                <PostCard postList={posts}/> 
            </Row>
        </Container>
    );
}

export default Body;