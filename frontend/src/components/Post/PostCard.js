import { ListGroup } from 'react-bootstrap';

import PostCardItem from './PostCardItem';

function PostCard() {
    let arr = ["title post 1", "title post 2", "title post 3", "title post 4", "title post 5", "title post 6", "title post 7", "title post 8"];

    let list = arr.map((name, index) => (
        <PostCardItem key={index} title={name} textPost={index % 2}/>
    ));
    
    return (
        <ListGroup>
            {list}
        </ListGroup>
    );
}

export default PostCard;