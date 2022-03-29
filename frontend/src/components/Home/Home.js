import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { Button } from '@mui/material';

import { getRandPosts, getAllPosts } from '../../api/apiRequest.js';
import { formatPost } from '../../api/helper.js';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        getAllPosts()
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

    const getNewPosts = () => {
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
                <NewPost getPosts={getPosts}/>
            </Row>

            <Row style={{display: "flex"}}>
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