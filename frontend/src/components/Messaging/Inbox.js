import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import ThreadItem from './ThreadItem'
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import {postThread, getInbox} from '../../api/apiRequest.js';

function Inbox() {
    const [threadList, setThreadList] = useState([<ThreadItem />, <ThreadItem />, <ThreadItem />]);
    const [show, setShow] = useState(false);

    const [targetUser, setUser] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        console.log("use effect");
        getConvos().then((res) => {
            setThreadList(res);
        })

        //console.log("use effect threadlist")
        //console.log(threadList)


    },[]);

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
            arr.push(<ThreadItem receiver={thread.receivername}/>)
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


    const handleSubmitThread = (event) => {
        console.log(targetUser);
        let err = errorMessage(targetUser);
        if (err == "") {
            postThread({'username': targetUser,});
            setUser("");
            handleClose();
        }
    }



    return (

        <div>
            <Button variant="primary" onClick={handleShow}>
                Create Thread
            </Button>

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

                    <ListGroup style={{ padding: "0px" }}>
                        {threadList}
                    </ListGroup>
                </div>


    );
}

export default Inbox;