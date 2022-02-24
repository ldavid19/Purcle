import { ListGroup, Row, Col, Image, Ratio, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { getScore, upvote, downvote } from "../../api/apiRequest.js";
import { IconButton } from '@mui/material';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

function PostCardTitle(props) {
    var getRelativeTime = () => {
        var now = new Date(Date.now());

        var time = "";
        var unit = "";

        var secDiff = now.getSeconds() - props.date.getSeconds();
        if (secDiff > 0) {
            time = secDiff;
            unit = "second";
        }

        var minDiff = now.getMinutes() - props.date.getMinutes();
        if (minDiff > 0) {
            time = minDiff;
            unit = "minute";
        }
        
        var hrDiff = now.getHours() - props.date.getHours();
        if (hrDiff > 0) {
            time = hrDiff;
            unit = "hour";
        }

        var monthDiff = now.getMonth() - props.date.getMonth();
        if (monthDiff > 0) {
            time = monthDiff;
            unit = "month";
        }

        var yearDiff = now.getFullYear() - props.date.getFullYear();
        if (yearDiff > 0) {
            time = yearDiff;
            unit = "year"
        }

        if (time === 0) {
            return "now"
        } else if (time !== 1) {
            unit += "s"
        }

        return time + " " + unit + " ago";
    }

    return (
        <Col style={{textAlign: "left", textDecoration: "none"}}  as={Link} to={{pathname: `/post/${props.id}`, query:{id: props.id}}}>
            <h3 style={{fontSize:20}}> {props.title} </h3>
            <p style={{margin: 0}}>by <a href={"#" + props.user }>{props.user}</a> in <a href="#">{props.topic}</a> {getRelativeTime()}</p>
        </Col>
    );
}

function PostCardScore(props) {
    var [score, setScore] = useState(0);

    function updateScore(id) {
        getScore(id)
        .then((res) => {
            setScore(res);
        })
    }

    useEffect(() => {
        updateScore(props.id);
    }, []);

    return (
        <Col xs={1}>
            <IconButton 
                aria-label="upvote"
                size="small"
                onClick={ function() {
                    upvote(props.id)
                    .then(() => {
                        updateScore(props.id);
                    });
                }}
            >
                < KeyboardArrowUpIcon />
            </IconButton>

            <p style={{margin: "0px"}}>{score}</p>

            <IconButton 
                aria-label="downvote"
                size="small"
                onClick={ function() {
                    downvote(props.id)
                    .then(() => {
                        updateScore(props.id);
                    });
                }}
            >
                < KeyboardArrowDownIcon />
            </IconButton>
        </Col>
    );
}

function PostCardImg(props) {
    //if props.type == true, then is image
    if (props.type) {
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
    } else {
        return (null);
    }
}

function PostCardItem(props) {
    const imgSize = 70;

    /*
        key={post.post_id} 
        title={post.post_title}
        content={post.post_content}
        topic={post.post_topic}
        type={post.post_type}
        user={post.user_id}
        anon={post.post_is_anonymous}
        date={post.post_time}
    */

    return (
        <ListGroup.Item>
            <Row className="align-items-center">
                <PostCardScore 
                    score={props.score} 
                    id={props.id}
                />
                
                <PostCardImg 
                    type={props.type} 
                    content={props.content}
                />
                
                <PostCardTitle 
                    title={props.title} 
                    topic={props.topic} 
                    user={props.user} 
                    anon={props.anon}
                    date={props.date}
                    id={props.id}
                />                  
            </Row>
        </ListGroup.Item>
    );
}

export default PostCardItem;