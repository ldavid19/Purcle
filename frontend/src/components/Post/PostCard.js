import { ListGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import PostCardItem from './PostCardItem';

function PostCard(props) {
    const [list, setList] = useState([]);

    //console.log(props.postList)
    
    useEffect(() => {
        var posts = Array.from(props.postList);

        var postcards = posts.map((post) => (
            <PostCardItem 
                key={post.post_id} 
                title={post.post_title}
                content={post.post_content}
                topic={post.post_topic}
                type={post.post_type}
                user={post.user_id}
                anon={post.post_is_anonymous}
                date={post.post_time}
                score={post.post_score}
            />
        ));

        setList(postcards);
    }, [props.postList])

    if (props.postList.length > 0) {
        return (
            <ListGroup style={{padding:"0px"}}>
                {list}
            </ListGroup>
        );
    } else {
        return (
            <h2>No posts retrieved :(</h2>
        )
    }
    
    
}

export default PostCard;