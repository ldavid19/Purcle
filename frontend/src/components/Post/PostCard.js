import { ListGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import PostCardItem from './PostCardItem';

import { getUser } from '../../api/apiRequest';


function PostCard(props) {
    const [list, setList] = useState([]);

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
    
    useEffect(() => {
        if (!props.postList) {
            return
        }

        var posts = Array.from(props.postList);
        var postcards = [];
        //var users = [];
        //console.log(posts);

        addUsernames(posts).then((res) => {
            setList(res);
        })

        /*
        var postcards = posts.map((post) => (
            <PostCardItem 
                key={post.id}
                post={post}
                userLookup={userLookup}
            />
        ));
        */

        //setList(postcards);
    }, [props.postList])

    async function addUsernames(posts) {
        let postcards = [];
        let users = {};

        for (let i in posts) {
            let post = posts[i];

            let { username, users } = await userLookup(post.user, users);
            //console.log(username);
            //console.log(users);

            postcards.push(
                <PostCardItem 
                    key={post.id}
                    post={post}
                    username={username}
                />
            )
        }

        return postcards;
    }

    async function userLookup(id, users) {
        //console.log("looking up user: " + id)
        if (users && id in users) {
            return {
                username: users[id], 
                users: users
            }
        }

        if (!users) {
            users = {};
        }

        let username;

        console.log("googling user: " + id);

        await getUser(id)
            .then((res) => {
                username = res.username;
                //console.log(res);

                /*
                let userList = loadedUsers;
                userList[id] = user.username;

                setLoadedUsers(userList);
                */
                users[id] = username;
            })

        //console.log(username);

        return {
            username: username, 
            users: users
        };
    }

    //if postList is null means cannot be retrieved
    if (!props.postList) {
        return (
            <p>Unfortunately, your timeline cannot be retrived at the moment. Please check back at a later time.</p>
        )
    }

    //while postList is being retrieved show loading spinner
    if (props.postList.length <= 0) {
        return (
            <LinearProgress />
        );
        /*
        return (
            <Col>
                <Spinner animation="border" role="status" variant='primary' style={{justifyContent: "center"}}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        )
        */
    }

    return (
        <ListGroup style={{padding:"0px"}}>
            {list}
        </ListGroup>
    );
}

export default PostCard;