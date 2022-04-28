import React from 'react';
import Comment from './Comment';
import { List, Divider } from '@mui/material';

function CommentList(props) {

    console.log("entered CommentList function");
    const listComments = props.comments.map((comment) => (
        <Comment
            key={comment.id}
            user_id={comment.user_id}
            content={comment.content}
            date={comment.date}
            is_anonymous={comment.isAnon}
        />
    ));

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {listComments}
            <Divider variant="inset" component="li" />
        </List>
    );
}
export default CommentList;