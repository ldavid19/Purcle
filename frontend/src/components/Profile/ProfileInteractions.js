import { Container, Row, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

import PostCard from '../Post/PostCard';
import ProfileInteractionsItem from './ProfileInteractionsItem';
import ProfileButtonGroup from './ProfileButtonGroup';

import { getReactionsFromUser, getCommentsfromUser, getPostsFromUser } from '../../api/apiRequest';

function ProfileInterationsMap(props) {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [reactions, setReactions] = useState([]);
    console.log(props.type)

    const getPosts = () => {
        getPostsFromUser(props.id)
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    const getComments = () => {
        getCommentsfromUser(props.id)
            .then((res) => {
                setComments(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    const getReactions = () => {
        getReactionsFromUser(props.id)
            .then((res) => {
                setReactions(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    useEffect(() => {
        getPosts();
        getComments();
        getReactions();
    }, []);

    useEffect(() => {
        console.log("reload interactions")
    }, [props.type]);

    console.log(props.type);

    if (props.type === "Reactions") {
        if (!reactions || reactions.length === 0) {
            return (<h3>This user has not reacted to any posts.</h3>)
        }

        return (<h2>reactions</h2>)
    }

    if (props.type === "Comments") {
        console.log(comments)
        if (!comments || comments.length === 0) {
            return (<h3>This user has not made any comments.</h3>)
        }

        return (<PostCard postList={comments} />)
    }

    if (props.type === "Posts") {
        if (!posts || posts.length === 0) {
            return (<h3>This user has not made any posts.</h3>)
        }
    
        return (<PostCard postList={posts}/>)
    }

    return (<h3>Error: type={props.type} :(</h3>)
}

function ProfileInteractions(props) {
    const [interactionType, setInterType] = useState("Posts");

    const setType = (type) => {
        console.log(type);
        setInterType(type);
    }

    
    if (!props.user || props.user.private) {
        return (
            <h3>This user profile is private.</h3>
        )
    }
    

    return (
        <Container>
            <Row style={{marginBottom: "15px"}}>
                < ProfileButtonGroup type={interactionType} setType={setType} />
            </Row>

            <Row>
                < ProfileInterationsMap id={props.id} type={interactionType}/>
            </Row>
        </Container>
    )
}

export default ProfileInteractions;