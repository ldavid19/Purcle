import React, { useEffect, useState } from 'react';

import ThreadItem from './ThreadItem'
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useParams } from "react-router-dom";

import {postThread, getContext, postMessage} from '../../api/apiRequest.js';
import { Card, Container, ListGroup, Row, Col, Image, Ratio } from 'react-bootstrap';
import Message from './Message';




function ThreadView() {

    const { id } = useParams();

    const [thread, setThread] = useState(null);
    const [messageList, setMsgList] = useState([]);

    const [error, setError] = React.useState("");

    const [message, setMessage] = useState("");

    const handleUpdateUserInput = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setMessage(event.target.value);
    }

    function errorMessage(msg) {
        let err = "";
        if (msg === null || msg == 0) {
            err = err + "Please enter a message.\n";
        }
        return err;
    }

    const handleSubmitMessage = (event) => {
        let err = errorMessage(message);
        setError(err);
        if (err == "") {
            let body = {'body': message};
            sendMessage(id, body);
            setMessage("");
            setError("");
        }
    }

    useEffect(() => {
        // getThreadContext(id).then((res) => {
        //     setThread(res.thread);

        //     setMsgList(res.message_list)
        // })

        setUpContext();

    },[]);

    function setUpContext(receiver) {

        let arr = [];

        getThreadContext(id).then((res) => {
            setThread(res.thread);

            res.message_list.forEach(message => {
                arr.push(<Message sender={message.sender} message={message.body} time={message.date} />)
            })

            setMsgList(arr)
        })
    }

    async function getThreadContext(receiver) {
        let context = await getContext(receiver);
        return context;
    }

    async function postApiMessage(receiver, message) {
        let response = await postMessage(receiver, message);
        return response;
    }

    function sendMessage(receiver, message) {
        postApiMessage(receiver, message).then((res) => {
            console.log("message sent");
        })
    }

    return (
        <div className="MessageBox">
            <Card style={{ width: '50rem'}}>
                <Card.Header>
                    {id}
                </Card.Header>
            
            <Card.Body>
                <ListGroup style={{ padding: "0px" }}>
                    {messageList}
                </ListGroup>
            </Card.Body>

            

            <Card.Footer>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col xs={10}>
                            <form>
                                <input name="message" type="text" className="form-control" placeholder="Type your message here" onChange={handleUpdateUserInput}/>
                            </form>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={handleSubmitMessage}>
                                Send
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {error}
                    </Row>
                </Container>
            </Card.Footer>
        </Card>
        </div>
        
        
        
    )


}

export default ThreadView;