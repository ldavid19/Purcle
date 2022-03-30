import { ListGroup, Row, Col, Image, Ratio } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { getScore, upvote, downvote } from "../../api/apiRequest.js";
import { getRelativeTime } from '../../api/helper.js';

import { Link } from "react-router-dom";


function Anon(props) {
    if (props.anon) {
        return (
            <nobr>anonymous</nobr>
        );
    }

    return (
        <Link to="/profile">{props.user}</Link>
    );
}

function PostCardTitle(props) {
    return (
        <Col style={{textAlign: "left", textDecoration: "none"}} 
            as={Link} to={{pathname: `/post/${props.id}`, query:{id: props.id}}}>
            
            <h3 style={{fontSize:20}}> {props.title} </h3>
            <p style={{margin: 0}}>
                {"by "}
                < Anon user={props.user} anon={props.anon} />
                {" in "} 
                <Link to="/profile">{props.topic}</Link>
                {" " + getRelativeTime(props.date)}
            </p>
        </Col>
    );
}

function PostCardScore(props) {
    var [score, setScore] = useState(0);

    var [up_color, setUpColor] = useState("black");
    var [down_color, setDownColor] = useState("black");

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
                    up_color.localeCompare("black") === 0
                    ? setUpColor("mediumslateblue"):setUpColor("black");
                    setDownColor("black");
                }}
            >
                < KeyboardArrowUpIcon style={{color: up_color}}/>
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
                    down_color.localeCompare("black") === 0
                    ? setDownColor("mediumslateblue"):setDownColor("black");
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
                    user={props.post.user} 
                    anon={props.post.anon}
                    date={props.post.date}
                    id={props.post.id}
                />                  
            </Row>
        </ListGroup.Item>
    );
}

export default PostCardItem;