import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

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
    /*
        key={post.post_id} 
        title={post.post_title}
        content={post.post_content}
        topic={post.post_topic}
        type={post.post_type}
        user={post.user_id}
        anon={post.post_is_anonymous}
        date={post.post_time}
        score={post.post_score}
    */

    const nullPost = {
        post_topic: "",
        post_type: false,
        user_id: "",
        post_anon: false,
        post_title: "Post not found",
        post_content: "",
        post_date: (new Date()).toString(),
        post_score: 0
    }

    const [post, setPost] = useState(nullPost);
    const { id } = useParams();

    console.log(id);
    
    useEffect(() => {

        console.log(props)
        
        getPost(id)
        .then((res) => {
            setPost(res);
            console.log(res);
        })
        .catch(err => console.error(`Error: ${err}`));
        
        //setPost(newPost);
    }, [post]);

    const time = "fuck" //post.post_date.toString();
    
    return (
        <Container fluid style={{textAlign: "left"}}>
                <Row>
                    <h1>{post.post_title}</h1>
                </Row>

                <Row>
                    <p>posted by {post.user_id} in {post.post_topic}</p>
                </Row>

            <Content style={{textAlign: "center"}} type={post.post_type} content={post.post_content}/>
        </Container>
    );
    
}

export default PostPage;