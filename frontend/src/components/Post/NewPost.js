import { useState } from "react";

import { Button, Modal } from "react-bootstrap";

function NewPost() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Write new post!
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New post</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sike u can't write a post yet lol</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Submit
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPost;