import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, Container, ListGroup, Row, Col, Button } from "react-bootstrap";

import LinearProgress from '@mui/material/LinearProgress';

import ThreadItem from './ThreadItem';
import Message from './Message';

import {postThread, getContext, postMessage, getCurrUser} from '../../api/apiRequest.js';


function ThreadView() {

    const { id } = useParams();

    const [messageList, setMsgList] = useState([]);

    const [error, setError] = React.useState("");

    const [message, setMessage] = useState("");

    const [receiver, setReceiver] = useState("");

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

        window.location.reload();
    }

    useEffect(() => {
        setUpContext().then((res) => {
            setMsgList(res)
        });

    },[]);

    async function setUpContext(receiver) {

        let arr = [];

        let user = await getCurrUser();

        let context = await getThreadContext(id);

        console.log(context);
        let currUser = "";

        if (user.curr_user == context.thread.user) {
            console.log(context.thread.receivername)
            currUser = context.thread.receivername;
        } else {
            console.log(context.thread.username)
            currUser = context.thread.username;
        }

        context.message_list.forEach(message => {
            arr.push(
                <Message 
                    sender={message.sender} 
                    message={message.body} 
                    time={message.date} 
                    curr={currUser}
                />
                
                )
        })

        return arr;
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

    if (!messageList) {
        return (
            <p>You currently have no conversations.</p>
        )
    }

    //while postList is being retrieved show loading spinner
    if (messageList.length <= 0) {
        return (
            <LinearProgress />
        );
    }

    return (
        <div className="MessageBox">
            <Card style={{ width: '50rem'}}>
                <Card.Header>
                    {receiver}
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