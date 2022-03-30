import { ListGroup, Spinner, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import PostCardItem from './PostCardItem';

function PostCard(props) {
    const [list, setList] = useState([]);

    //console.log(props.postList)
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
        var posts = Array.from(props.postList);
        //console.log(posts);

        var postcards = posts.map((post) => (
            <PostCardItem 
                key={post.id}
                post={post}
            />
        ));

        setList(postcards);
    }, [props.postList])

    //check if post list not retrieved yet
    if (props.postList.length <= 0) {
        return (
            <Col>
                <Spinner animation="border" role="status" variant='primary' style={{justifyContent: "center"}}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col>
        )
    }

    return (
        <ListGroup style={{padding:"0px"}}>
            {list}
        </ListGroup>
    );
}

export default PostCard;