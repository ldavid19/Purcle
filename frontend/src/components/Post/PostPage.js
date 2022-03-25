import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';

import { useParams, useNavigate, Link } from 'react-router-dom';

import ErrorPage from '../ErrorPage';

import { databaseLength, getPost } from '../../api/apiRequest';
import { getRelativeTime } from '../../api/helper';

import { Button } from '@mui/material';

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

    const [showTestComment, setShowTestComment] = useState(false);
    const [testCommentText, setTestCommentText] = useState("");
    const [commentText, setCommentText] = React.useState("");
    const handleCommentTextChange = ev => {
        setCommentText(ev.target.value);
    };
    const [anonCheck, setAnonCheck] = React.useState(false);
    const handleAnonCheckChange = () => {
        setAnonCheck(!anonCheck);
    }

    const handleSubmit = () => {
        var newComment = {
            comment_id: databaseLength(),
            user_id: "user",
            comment_content: commentText,
            comment_created_date: new Date(Date.now()),
            comment_is_anonymous: anonCheck
        };
        /*
        makeComment(newComment)
        .then((res) => {
            props.getComments();
            //getAllComments();
        });
        */
        setShowTestComment(true);
        setAnonCheck(false);
        setTestCommentText(commentText);
        setCommentText("");
    }

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

            <Card>
                <h1></h1>
                <textarea
                    name="commentText"
                    placeholder=" New Comment"
                    value={commentText || ""}
                    onChange={handleCommentTextChange}
                    maxLength="500"
                    rows={2}
                />
                <label>
                    Anonymous{' '}
                    <input type="checkbox" 
                    checked={anonCheck}
                    onChange={handleAnonCheckChange}/>
                </label>
                {
                    commentText.length > 0 ?
                        <Button variant="primary" onClick={handleSubmit}>
                            Post
                        </Button>
                    :
                        <Button variant="primary">
                            Post
                        </Button>
                }
            </Card>
            {showTestComment ?
                <Card style = {{textAlign: "left"}}>
                    {testCommentText}
                    {
                        anonCheck ? 
                            <body>by Anonymous time ago</body>
                            :
                            <body>
                                by{' '}
                                <Link to="/profile">{"user"}</Link>
                                {' '}time ago
                            </body>
                    }
                </Card>
                :
                <body></body>
            }

        </Container>
    )
    
}

export default PostPage;