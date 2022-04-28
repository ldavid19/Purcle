import React, { useEffect, useState } from 'react';
import { Container, Card, Image } from 'react-bootstrap';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { getPost, getUser, getCommentsfromPost, makeComment, convertToUserProfile, getCurrUser } from '../../api/apiRequest';
import { getRelativeTime } from '../../api/helper';

import { Button, TextField, FormGroup, FormControlLabel, Switch } from '@mui/material';

import CommentList from './CommentList';

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

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(nullPost);
    const [username, setUsername] = useState("");
    const [commentText, setCommentText] = React.useState("");
    const [anonCheck, setAnonCheck] = React.useState(false);

    const handleCommentTextChange = ev => {
        setCommentText(ev.target.value);
    };
    const handleAnonCheckChange = () => {
        setAnonCheck(!anonCheck);
    }

    const [curr_id, setCurrID] = useState(null);
    const getCurrID = () => {
        getCurrUser()
            .then((res) => {
                console.log(res);
                setCurrID(res.curr_user);
                //console.log(curr_id);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    const [comments, setComments] = useState([]);
    const getComments = () => {
        getCommentsfromPost(id)
            .then((res) => {
                let data = res;
                console.log(res);

                let comment_list = [];
                data.map((c) => {
                    let newComment = {
                        id: c.id,
                        user_id: c.user_id,
                        post_id: c.post_id,
                        content: c.comment_content,
                        date: c.comment_created_date,
                        isAnon: c.comment_is_anonymous
                    }

                    comment_list.push(newComment);
                })

                //console.log(comment_list);
                setComments(comment_list);
                //console.log(comments);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    const handleSubmit = () => {
        if (commentText.length > 0) {
            var newComm;
            convertToUserProfile(curr_id)
                .then((res) => {
                    console.log(res);
                    newComm = {
                        id: undefined,
                        user_id: res.curr_userprofile,
                        post_id: post.id,
                        comment_content: commentText,
                        comment_created_date: undefined,
                        comment_is_anonymous: anonCheck
                    };
                    //console.log(newComm);
                    makeComment(newComm);
                })
                .catch(err => console.error(`Error: ${err}`));
        }

        setAnonCheck(false);
        setCommentText("");
    }

    //redirects user to an error page, then reloads page to ensure that screen is not stuck on nothing 
    const errorHandler = (e) => {
        navigate('/error', { replace: true });
        window.location.reload();
    }

    useEffect(() => {

        //console.log(id)
        getComments();
        getCurrID();

        getPost(id)
            .then((res) => {
                let userid = res.user;
                console.log(res);

                getUser(userid)
                    .then((res) => {
                        let name = res.username;
                        console.log(res);
                        setUsername(name);
                    })

                setPost(res);
            })
            .catch(err => {
                console.error(`Error: ${err}`);
                //errorHandler();
            });

        //setPost(newPost);
    }, []);


    return (
        <Container>
            <Card>
                <h1>{post.title}</h1>

                <p style={{/*margin: 0*/ }}>
                    {"posted by "}
                    <Link to={{ pathname: `/profile/${post.user}`, query: { id: post.user } }}>
                        {username}
                    </Link>
                    {" in "}
                    <Link to={{ pathname: `/topic/${post.topic}`, query: { id: post.topic } }}>
                        {post.topic}
                    </Link>
                    {" " + getRelativeTime(post.date)}
                </p>

                <p></p>
                {post.type == 0 ?
                    <Content style={{ textAlign: "center" }} type={post.type} content={post.content} />
                    :
                    <Image style={{ textAlign: "center" }} src={post.content} />
                }
            </Card>

            <Card>
                <TextField
                    name="commentText"
                    placeholder=" New Comment"
                    value={commentText || ""}
                    onChange={handleCommentTextChange}
                    maxLength="500"
                    rows={2}
                />
                <FormGroup className="align-items-center">
                    <FormControlLabel control={
                        <Switch checked={anonCheck}
                            onChange={handleAnonCheckChange} />
                    }

                        label="Anonymous" />
                </FormGroup>
                {
                    commentText.length > 0 ?
                        <Button variant="contained" onClick={handleSubmit} color="success">
                            Post
                        </Button>
                        :
                        <Button variant="outlined" color="error">
                            Post
                        </Button>
                }
            </Card>
            <CommentList
                comments={comments}
            />
        </Container>
    )

}

export default PostPage;