import { Container, Row } from 'react-bootstrap';
import React, { Component }  from 'react';
import NewPost from "../Post/NewPost.js";
import PostCard from '../Post/PostCard';

function Body() {
    return (
        <Container style={{padding: "25px 50px 75px"}}>
            <Row>
                <NewPost />
            </Row>

            <Row>
                <PostCard/> 
            </Row>
        </Container>
    );
}

export default Body;