import React, { useEffect, useState } from 'react';
import { Container, Card, Image } from 'react-bootstrap';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { getPost } from '../../api/apiRequest';
import { getRelativeTime } from '../../api/helper';

function Content(props) {
    //if props.type == true then is image 
    if (props.type) {
        //uhhh this should print but it doesnt but it still works so idk 
        console.log("IMAGE");
        return (
            <Container>
                <Image
                    src={props.content}
                />
            </Container>
            
        );
    }
        
    return (
        <Container>
            <p>{props.content}</p>
        </Container>
    )
}

function PostPage(props) {
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

    const nullPost = {
        id: "",
        title: "Post not found",
        content: "",
        topic: "",
        type: false,
        user: "",
        anon: false,
        date: new Date(Date.now()),
        score: 0
    }

    const [post, setPost] = useState(nullPost);
    const { id } = useParams();
    const navigate = useNavigate();

    //redirects user to an error page, then reloads page to ensure that screen is not stuck on nothing 
    const errorHandler = (e) => {
        navigate('/error', { replace: true });
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
        });
        
        //setPost(newPost);
    }, [post]);


    return (
        <Container>
            <Card>
                <h1>{post.title}</h1>

                <p style={{margin: 0}}>
                    {"by "}
                    <Link to="/profile">{post.user}</Link>
                    {" in "} 
                    <a href="#">{post.topic}</a> 
                    {" " + getRelativeTime(post.date)}
                </p>

                <Content style={{textAlign: "center"}} type={post.type} content={post.content}/>
            </Card>
        </Container>
    )
    
}

export default PostPage;