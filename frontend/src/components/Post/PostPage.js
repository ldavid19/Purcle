import React, { useEffect, useState } from 'react';
import { Container, Card, Image } from 'react-bootstrap';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { getPost } from '../../api/apiRequest';
import { getRelativeTime } from '../../api/helper';

import { Button } from '@mui/material';

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
    const [anon, setAnon] = React.useState(false);

    const handleSubmit = () => {
        var newComment = {
            //comment_id: databaseLength(),
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
        setAnon(anonCheck);
        setAnonCheck(false);
        setTestCommentText(commentText);
        setCommentText("");
        setShowTestComment(true);
    }

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
    }, []); 


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
                        anon ? 
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