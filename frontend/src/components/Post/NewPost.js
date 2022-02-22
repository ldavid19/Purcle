import { useState } from "react";
import React from 'react';
import { Button, Dropdown, Modal } from "react-bootstrap";

function errorMessage(title, type, text, image) {
    let message = "";
    if (type.localeCompare("Image") !== 0 && type.localeCompare("Text") !== 0) {
        message = "A post type needs to be selected.\n";
    }
    if (title.length === 0) {
        message = message + "Your post needs a title.\n";
    }
    if (type.localeCompare("Text") === 0 && text.length === 0) {
        message = message + "Please insert text.\n";
    }
    if (type.localeCompare("Image") === 0 && image.length === 0) {
        message = message + "Please insert image.\n";
    }
    return message;
}

function NewPost() {

    const options = [
        {id: 'birbs', name: 'birbs'},
        {id: 'cooking', name: 'cooking'},
        {id: 'purdue', name: 'purdue'}
    ]

    const [show, setShow] = useState(false);

    const handleSubmit = () =>{
        setError(errorMessage(title, type, text, image));
    }

    const [error, setError] = React.useState("");
  
    const handleClose = () => {
        setShow(false);
        setTitle("");
        setImage("");
        setText("");
        setType("");
        setError("");
        setChecked(false);
    }
    const handleShow = () => {
        setShow(true);
    };

    const [checked, setChecked] = React.useState(false);
    const handleAnonChange = () => {
        setChecked(!checked);
    };

    const [title, setTitle] = React.useState("");
    const handleTitleChange = ev => {
        setTitle(ev.target.value);
    };

    const [image, setImage] = React.useState("");
    const handleImageChange = ev => {
        setImage(ev.target.value);
    };

    const [text, setText] = React.useState("");
    const handleTextChange = ev => {
        setText(ev.target.value);
    };

    const [type, setType] = React.useState("");
    const handleTypeChange = ev => {
        setType(ev.target.value);
        setImage("");
        setText("");
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create new post!
            </Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select onChange={handleTypeChange}>                        
                    <option type="default" selected disabled hidden>Choose post type</option>
                    <option type="text">Text</option>
                    <option type="image">Image</option>
                </select>
                {' '}
                <label>
                    Anonymous{' '}
                    <input type="checkbox" 
                    checked={checked}
                    onChange={handleAnonChange}/>
                </label>
                <p></p>
                <textarea
                    name="title"
                    placeholder=" Title"
                    value={title || ""}
                    onChange={handleTitleChange}
                    style={{width: "465px"}}
                    maxlength="100"
                    rows={1}
                    cols={5}
                />
                <p></p>
                { 
                    type.localeCompare("Image") === 0 || type.localeCompare("Text") === 0 ?
                        type.localeCompare("Image") !== 0 ?
                            <textarea
                                name="text"
                                placeholder=" Insert text here"
                                value={text || ""}
                                onChange={handleTextChange}                       
                                style={{width: "465px"}}
                                maxlength="500"
                                rows={5}
                                cols={5}
                            />
                        :
                            <textarea
                                name="image"
                                placeholder=" Image"
                                value={image || ""}
                                onChange={handleImageChange}
                                style={{width: "465px"}}
                                maxlength="100"
                                rows={1}
                                cols={5}
                            />
                    :
                        <p></p>
                }
            </Modal.Body>
            <Modal.Footer>
                {/*<Button variant="secondary" onClick={handleClose}>
                Cancel
                </Button> */}
                <p>{error}</p>
                <Button variant="primary" onClick={handleSubmit}>
                Post
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPost;