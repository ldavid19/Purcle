import { ListGroup, Row, Col, Image, Ratio } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { getScore, makeReaction, getCurrUser, getSpecReaction, deleteReaction } from "../../api/apiRequest.js";
import { getRelativeTime } from '../../api/helper.js';

import { Link } from "react-router-dom";

function Anon(props) {
    if (props.anon) {
        return (
            <nobr>anonymous</nobr>
        );
    }

    //add props.id to link to profile
    return (
        <Link to={{pathname: `/profile/${props.user_id}`, query:{id: props.user_id}}}>
            {props.username}
        </Link>
    );
}

function PostCardTitle(props) {
    return (
        <Col style={{textAlign: "left", textDecoration: "none"}} 
            as={Link} to={{pathname: `/post/${props.id}`, query:{id: props.id}}}>
            
            <h3 style={{fontSize:20}}> {props.title} </h3>
            <p style={{margin: 0}}>
                {"by "}
                < Anon username={props.username} anon={props.anon} user_id={props.user_id}/>
                {" in "} 
                <Link to={{pathname: `/topic/${props.topic}`, query:{id: props.topic}}}>
                    {props.topic}
                </Link>
                {" " + getRelativeTime(props.date)}
            </p>
        </Col>
    );
}

function handleVote(type, postid) {
    getCurrUser()
        .then((res) => {
        var newReaction;
        newReaction = {
            id: undefined,
            user_id: res.curr_user,
            reaction_type: type,
            post_id: postid
        };
        console.log(newReaction);
        makeReaction(newReaction);
    })
    .catch(err => console.error(`Error: ${err}`));
}

function PostCardScore(props) {
    var [score, setScore] = useState(0);
    var [up_color, setUpColor] = useState("black");
    var [down_color, setDownColor] = useState("black");

    const [curr_id, setCurrID] = useState(null);
    const getCurrID = () => {
        getCurrUser()
            .then((res) => {
                console.log(res);
                var temp = res.curr_user;
                setCurrID(temp);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    function updateScore(post_id) {
        getScore(post_id)
        .then((res) => {
            console.log(res)
            setScore(res);
        })
    }

    useEffect(() => {
        getCurrUser()
            .then((res1) => {
                getSpecReaction(props.id, res1.curr_user)
                    .then((res) => {
                        if (res === 1) {
                            setUpColor("mediumslateblue")
                            setDownColor("black")
                        } else if (res === -1) {
                            setDownColor("mediumslateblue")
                            setUpColor("black")
                        }
                    })
                    .catch(err => console.error(`Error: ${err}`));
            })
            .catch(err => console.error(`Error: ${err}`));
        getCurrID();
        updateScore(props.id);
    }, []);

    return (
        <Col xs={1}>
            <IconButton 
                aria-label="upvote"
                size="small"
                onClick={function() {
                        if (up_color.localeCompare("black") === 0) {
                            deleteReaction(props.id, curr_id)
                                .then(() => {
                                    handleVote(0, props.id)
                                })
                                .catch(err => {
                                    handleVote(0, props.id)
                                    console.error(`Error: ${err}`)
                                });
                            setScore(score + 1)
                            setUpColor("mediumslateblue")
                        } else {
                            deleteReaction(props.id, curr_id)
                                .catch(err => console.error(`Error: ${err}`));
                            setUpColor("black");
                            setScore(score - 1)
                        }
                        setDownColor("black");
                    }}
            >
                < KeyboardArrowUpIcon style={{color: up_color}}/>
            </IconButton>

            <p style={{margin: "0px"}}>{score}</p>

            <IconButton 
                aria-label="downvote"
                size="small"
                onClick={function() {
                    if (down_color.localeCompare("black") === 0) {
                        deleteReaction(props.id, curr_id)
                            .then(() => {
                                handleVote(1, props.id)
                            })
                            .catch(err => {
                                handleVote(1, props.id)
                                console.error(`Error: ${err}`)
                            });
                        setScore(score - 1)
                        setDownColor("mediumslateblue")
                    } else {
                        deleteReaction(props.id, curr_id)
                            .catch(err => console.error(`Error: ${err}`));
                        setDownColor("black");
                        setScore(score + 1)
                    }
                    setUpColor("black");
                }}
            >
                < KeyboardArrowDownIcon style={{color: down_color}}/>
            </IconButton>
        </Col>
    );
}

function PostCardImg(props) {
    if (!props.type) {
        return null;
    }
    
    //if props.type == true, then has image
    return (
        <Col lg={1} ms={2} xs={2}>
            <Ratio aspectRatio="1x1">
                <Image
                    thumbnail
                    src={props.content} 
                />
            </Ratio>
        </Col>
    )
}

function PostCardItem(props) {
    //console.log(props);
    //console.log(props.post)

    /* posts are formatted this way
    post = {
        id: post.post_id,
        title: post.post_title,
        content: post.post_content,
        topic: post.post_topic,
        type: post.post_type,
        user: post.user_id,
        anon: post.post_is_anonymous,
        date: post.post_time,
        score: post.post_score
    }*/

    return (
        <ListGroup.Item>
            <Row className="align-items-center">
                <PostCardScore 
                    id={props.post.id}
                />
                
                <PostCardImg 
                    type={props.post.type} 
                    content={props.post.content}
                />
                
                <PostCardTitle 
                    title={props.post.title} 
                    topic={props.post.topic} 
                    username={props.username} 
                    user_id={props.post.user}
                    anon={props.post.anon}
                    date={props.post.date}
                    id={props.post.id}
                />                  
            </Row>
        </ListGroup.Item>
    );
}

export default PostCardItem;