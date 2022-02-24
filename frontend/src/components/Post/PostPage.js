import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

import { getPost } from '../../api/apiRequest';

function Content(props) {
    //if props.type == true then is image 
    if (props.type) {
        return (
            <Container>
                <Image
                    src={props.content}
                />
            </Container>
            
        );
    } else {
        return (
            <Container>
                <p>{props.content}</p>
            </Container>
        )
    }
}

function PostPage(props) {
    const nullPost = {
        post_id: "",
        post_topic: "",
        post_type: false,
        user_id: "",
        post_is_anonymous: false,
        post_title: "Post not found",
        post_content: "",
        post_time: new Date(),
        post_score: 0
    }

    const [post, setPost] = useState(nullPost);
    
    useEffect(() => {
        getPost()
        .then((res) => {
            setPost(res);
            console.log(res);
        })
        .catch(err => console.error(`Error: ${err}`));
    }, [])

    
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>{post.post_title}</h1>
                </Col>

                <Col>
                    <h2>{post.post_topic}</h2>
                </Col>
            </Row>

            <Content type={post.post_type} content={post.post_content}/>
        </Container>
    );
    
}

export default PostPage;