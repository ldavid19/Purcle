import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Image } from 'react-bootstrap';

import { useParams, useNavigate, Link } from 'react-router-dom';

import ErrorPage from '../ErrorPage';

import { getPost } from '../../api/apiRequest';
import { getRelativeTime } from '../../api/helper';

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
        post_time: new Date(Date.now()),
        post_score: 0
    }

    const [post, setPost] = useState(nullPost);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const errorHandler = (e) => {
        navigate('/post', { replace: true });
        window.location.reload();
    }
    
    useEffect(() => {

        console.log(props)
        
        getPost(id)
        .then((res) => {
            setPost(res);
            console.log(res);
        })
        .catch(err => {
            console.error(`Error: ${err}`);
            errorHandler();
            setError(true);
        });
        
        //setPost(newPost);
    }, [post]);

    /*
    useEffect(() => {
        if (error) {
            navigate.push('/');
        }
    })*/

    return (
        <Container>
            <Card>
                <h1>{post.post_title}</h1>

                <p style={{margin: 0}}>
                    {"by "}
                    <Link to="/profile">{post.user_id}</Link>
                    {" in "} 
                    <a href="#">{post.post_topic}</a> 
                    {" " + getRelativeTime(post.post_time)}
                </p>

                <Content style={{textAlign: "center"}} type={post.post_type} content={post.post_content}/>
            </Card>
        </Container>
    )
    
}

export default PostPage;