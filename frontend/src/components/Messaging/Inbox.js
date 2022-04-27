import React, { useEffect, useState } from 'react';
import { ListGroup, Container, Row, Modal } from 'react-bootstrap';

import ThreadItem from './ThreadItem'
import { Button } from '@mui/material';

import {postThread, getInbox, getCurrUser} from '../../api/apiRequest.js';

function Inbox() {
    const [threadList, setThreadList] = useState([]);
    const [show, setShow] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [currUser, setCurrUser] = useState(0);

    const [targetUser, setUser] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseErr = () => setShowErr(false);
    const handleShowErr = () => {
        setShowErr(true);
        setUser(targetUser);
    }
    


    useEffect(() => {

        console.log("use effect");
        getCurrentUser();
        getConvos().then((res) => {
            setThreadList(res);
        })

        //console.log("use effect threadlist")
        //console.log(threadList)


    },[]);

    const getCurrentUser = () => {
        getCurrUser()
        .then((res) => {
            console.log(res);
            let id = res.curr_user;

            console.log(id);

            setCurrUser(id);
        })
    }

    async function getConvos() {
        // getInbox().then(res => {
        //     console.log(res)
        //     setThreadList(res);
        //     console.log("api threadlist")
        //     console.log(threadList)
        // }).catch(err => console.error(`Error: ${err}`));
        let arr = [];

        let threads = await getInbox();

        threads.forEach(thread => {

            arr.push(<ThreadItem id={thread.id} currUser={currUser}/>)
        })
        return arr;

    }

    function errorMessage(username) {
        console.log(username)
        let message = "";
        if (username === null || username == 0) {
            message = message + "Please enter a User.\n";
        }
        return message;
    }

    const handleUpdateUserInput = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setUser(event.target.value);
    }


    async function makeThread(body) {
        let response = await postThread(body);
        return response;
    }


    const handleSubmitThread = (event) => {
        console.log(targetUser);
        let err = errorMessage(targetUser);
        if (err == "") {

            let response = "";

            makeThread({'username': targetUser,}).then((res) => {
                if(res.hasOwnProperty('message')){

                    handleClose();
                    handleShowErr();
                }
            })
            setUser("");
            handleClose();
        }
    }



    return (

        <Container className="Home" style={{padding: "0px 75px"}}>
            <Row style={{padding: "20px 0px"}}>
                <Button variant="contained" onClick={handleShow}>
                    Create Thread
                </Button>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Thread</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <form>
                    <input name="username" type="text" className="form-control" placeholder="User to start thread with" onChange={handleUpdateUserInput}/>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    
                    <Button variant="primary" onClick={handleSubmitThread}>
                        Create
                    </Button>
                </Modal.Footer>

            </Modal>

            <Modal show={showErr} onHide={handleCloseErr}>
                <Modal.Header closeButton>
                    Error creating thread
                </Modal.Header>

                    <Modal.Body centered>

                        <p>User "{targetUser}" does not exist</p>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseErr}>
                            Cancel
                        </Button>

                    </Modal.Footer>
            </Modal>

            <Row style={{display: "flex"}}>
                <ListGroup style={{ padding: "0px" }}>
                    {threadList}
                </ListGroup>
            </Row>
        </Container>

    );
}

export default Inbox;