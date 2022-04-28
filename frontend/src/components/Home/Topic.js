import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Button } from '@mui/material';

import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

import { getRandPosts, getAllPosts, getPostsFromTopic, getTopicInfo, getCurrUser, updateTopic, getUser, updateUser } from '../../api/apiRequest.js';

function Topic() {
    const { id } = useParams();
    const navigate = useNavigate();

    console.log(id);

    const nullTopic = {
        topic_id : "All",
        topic_num_followers: 0
    }

    const nullUser = {
        topics:[]
        //topics = []
    }

    const [posts, setPosts] = useState([]);
    const [topic, setTopic] = useState(nullTopic);
    const [following, setFollowing] = useState(false);
    const [curr, setCurr] = useState(nullUser);
    const [currId, setCurrId] = useState(0)

    useEffect(() => {
        getPosts();
        getInfo();
        getCurr();
        
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
            // setTopic("All");
        } else {
            getTopicInfo(id)
                .then((res) => {
                    console.log(res);
                    setTopic(res);
                    // setFollowCount(100);
                })
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

    const getCurr = () => {
        getCurrUser().then(res => {
            console.log(res)
            const currid = res.curr_user;
            setCurrId(currid)
            getUser(currid)
            .then(res => {
                setCurr(res);
            }).catch(err => console.error(`Error: ${err}`));
            // console.log("following?",curr.topics.includes(id))

            // if (curr.topics.includes(id)) {
            //     setFollowing(true);
            // }
        }).catch(err => console.error(`Error: ${err}`));
    }

    const handleFollowTopic = () => {
        setFollowing(true)
        topic.topic_num_followers++;
        curr.topics.push(id);
        updateTopic(id, topic, localStorage.getItem('token'))
        updateUser(currId, curr, localStorage.getItem('token'))
        getCurr();
    }

    const handleUnfollowTopic = () => {
        setFollowing(false)
        topic.topic_num_followers--;
        var arr = curr.topics;
        var index = arr.indexOf(id)
        if (index !== -1) {
            arr.splice(index);
        }
        curr.topics=arr;
        updateTopic(id, topic, localStorage.getItem('token'))
        updateUser(currId, curr, localStorage.getItem('token'))
        getCurr();

    }

    return (
        <Container className="Home" style={{padding: "0px 75px"}}>
            <Row style={{padding: "20px 0px"}}>
                <NewPost getPosts={getPosts}/>
            </Row>

            <Row >
                <Col>
                    <h1>{topic.topic_id}</h1>
                </Col>
                <Col>
                    {!curr.topics.includes(id)&&<Button onClick={handleFollowTopic}> Follow Topic</Button>}
                    {curr.topics.includes(id)&& <Button onClick={handleUnfollowTopic}> Unfollow Topic</Button>}
                </Col>
                
                <Col>
                    <h5>{topic.topic_num_followers}{(topic.topic_num_followers === 1) ? " follower" : " followers"}</h5>
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