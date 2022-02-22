import { useState } from "react";
import React from 'react';
import { Button, Modal } from "react-bootstrap";
import {View, StyleSheet, Text} from 'react-native';

function NewPost() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
    };
  
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Write new post!
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>
                    Anonymous{' '}
                    <input type="checkbox" 
                    checked={checked}
                    onChange={handleChange}/>
                </label>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button variant="secondary" onClick={handleClose}>
                Cancel
    </Button> */}
                <Text style={[{textAlign:'left'}]}>
                    <p>{checked ? ' ' : checked.toString()}</p>
                </Text>
                <Button variant="primary" onClick={handleClose}>
                Submit
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPost;