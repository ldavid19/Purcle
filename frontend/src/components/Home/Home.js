import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { getPosts } from '../../api/apiRequest.js';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getNewPosts();
    }, []);

    const getNewPosts = () => {
        getPosts()
        .then((res) => {
            setPosts(res);
            console.log(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }

    return (
        <Container style={{padding: "0px 75px"}}>
            <Row style={{padding: "20px 0px"}}>
                <NewPost />
            </Row>

            <Row>
                <PostCard postList={posts}/> 
            </Row>
        </Container>
    );
}

export default Home;