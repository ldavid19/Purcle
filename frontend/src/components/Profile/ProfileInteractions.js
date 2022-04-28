import { Container, Row, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

import PostCard from '../Post/PostCard';
import ProfileInteractionsItem from './ProfileInteractionsItem';
import ProfileButtonGroup from './ProfileButtonGroup';

import { getReactionsFromUser, getCommentsfromUserProfile, getPostsFromUser } from '../../api/apiRequest';

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
        getCommentsfromUserProfile(props.id)
            .then((res) => {
                console.log(res);
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

    if (props.type === "Comments") {
        console.log("UsER COMMENTS", comments);
        if (!comments || comments.length === 0) {
            return (<h3>This user has not commented on any posts.</h3>)
        }

        return (<h2>comments ui here</h2>)
    }

    if (props.type === "Reactions") {
        console.log(reactions)
        if (!reactions || reactions.length === 0) {
            return (<h3>This user has not reacted to any posts.</h3>)
        }

        return (<PostCard postList={reactions} />)
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
    
    if (!props.user) {
        return (
            <h3>This user profile does not exist.</h3>
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