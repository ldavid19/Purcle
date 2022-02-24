import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { Button } from '@mui/material';

import { getRandPosts, getAllPosts } from '../../api/apiRequest.js';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        getAllPosts()
        .then((res) => {
            setPosts(res);
            console.log(res);
            console.log("fUCK")
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    const getNewPosts = () => {
        getRandPosts()
        .then((res) => {
            setPosts(res);
            console.log(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    return (
        <Container style={{padding: "0px 75px"}}>
            <Row style={{padding: "20px 0px"}}>
                <NewPost getPosts={getPosts}/>
            </Row>

            <Row>
                <PostCard postList={posts}/> 
            </Row>

            <Button onClick={() => {
                getNewPosts();
            }}>
                reload
            </Button>
        </Container>
    );
}

export default Home;