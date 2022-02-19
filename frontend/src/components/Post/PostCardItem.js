import { ListGroup, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
function PostCardItem(props) {
    const imgSize = 50;

    if (props.textPost) {
        return (
            <ListGroup.Item>
                <Row>                  
                    <Col style={{textAlign: "left"}}>
                        <h3 style={{fontSize:20}}> {props.title} </h3>
                        <p style={{margin: 0}}><a href="#">user</a> in <a href="#">topic</a></p>
                    </Col>
                </Row>
            </ListGroup.Item>
        )
    } else {
        return (
            <ListGroup.Item>
                <Row>
                    <Image 
                        thumbnail
                        src={"https://www.pngkey.com/png/detail/352-3525856_png-file-add-post-icon-png.png"} 
                        style={{height: imgSize, width: imgSize}}
                    />
                    
                    <Col style={{textAlign: "left"}}>
                        <h3 style={{fontSize:20}}> {props.title} </h3>
                        <p style={{margin: 0}}><a href="#">user</a> in <a href="#">topic</a></p>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    }
}

export default PostCardItem;