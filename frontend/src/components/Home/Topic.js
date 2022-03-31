import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Button } from '@mui/material';

import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { getRandPosts, getAllPosts, getPostsFromTopic, getTopicInfo } from '../../api/apiRequest.js';

function Topic() {
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(id);

    const [posts, setPosts] = useState([]);
    const [topic, setTopic] = useState("All");
    const [followCount, setFollowCount] = useState(0);

    useEffect(() => {
        getPosts();
        getInfo();
    }, []);

    const getPosts = () => {
        if (!id || id === "all") {
            getAllPosts()
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
        } else {
            getPostsFromTopic(id)
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
        }
    }

    const getInfo = () => {
        if (!id || id == "all") {
            setTopic("All");
        } else {
            getTopicInfo(id)
                .then((res) => {
                    console.log(res);
                    setFollowCount(100);
                })
            setTopic(id);
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

            <Row >
                <Col>
                    <h1>{topic}</h1>
                </Col>
                
                <Col>
                    <h1>{followCount}{(followCount === 1) ? " follower" : " followers"}</h1>
                </Col>
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