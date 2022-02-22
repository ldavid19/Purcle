import { ListGroup, Row, Col, Image, Ratio } from 'react-bootstrap';
import React from 'react';

function PostCardTitle(props) {
    var getRelativeTime = () => {
        var now = new Date(Date.now());

        var yearDiff = now.getFullYear() - props.date.getFullYear();
        if (yearDiff > 0) {
            return yearDiff + " years ago"
        }

        var monthDiff = now.getMonth() - props.date.getMonth();
        if (monthDiff > 0) {
            return monthDiff + " months ago"
        }
        
        var hrDiff = now.getHours() - props.date.getHours();
        if (hrDiff > 0) {
            return hrDiff + " hours ago";
        }

        var minDiff = now.getMinutes() - props.date.getMinutes();
        if (minDiff > 0) {
            return minDiff + " minutes ago";
        }

        var secDiff = now.getSeconds() - props.date.getSeconds();
        if (secDiff > 0) {
            return secDiff + " seconds ago"
        } else {
            return "now"
        }
    }

    return (
        <Col style={{textAlign: "left"}}>
            <h3 style={{fontSize:20}}> {props.title} </h3>
            <p style={{margin: 0}}><a href={"#" + props.user }>user</a> in <a href="#">{props.topic}</a> | {getRelativeTime()}</p>
        </Col>
    );
}

function PostCardItem(props) {
    const imgSize = 70;

    /*
        key={post.post_id} 
                title={post.post_title}
                content={post.post_content}
                topic={post.post_topic}
                type={post.post_type}
                user={post.user_id}
                anon={post.post_is_anonymous}
                date={post.post_time}
        */

    if (props.type) {
        //image post
        return (
            <ListGroup.Item>
                <Row>
                    <div style={{ width: imgSize, height: 'auto' }}>
                        <Ratio aspectRatio="1x1">
                            <Image
                                thumbnail
                                src={props.content} 
                            />
                        </Ratio>
                    </div>

                    <PostCardTitle 
                        title={props.title} 
                        topic={props.topic} 
                        user={props.user} 
                        anon={props.anon}
                        date={props.date}
                    />                    
                </Row>
            </ListGroup.Item>
        )
    } else {
        return (
            <ListGroup.Item>
                <Row>
                    <PostCardTitle 
                        title={props.title} 
                        topic={props.topic} 
                        user={props.user} 
                        anon={props.anon}
                        date={props.date}
                    />
                </Row>
            </ListGroup.Item>
        );
    }
}

export default PostCardItem;