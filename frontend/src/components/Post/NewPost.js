import { useState } from "react";
import React from 'react';
import { Button, Modal } from "react-bootstrap";

function NewPost() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [checked, setChecked] = React.useState(false);
    const handleAnonChange = () => {
        setChecked(!checked);
    };

    const [title, setTitle] = React.useState("");
    const handleTitleChange = ev => setTitle(ev.target.value);

    const [photo, setPhoto] = React.useState("");
    const handlePhotoChange = ev => setPhoto(ev.target.value);

    const [text, setText] = React.useState("");
    const handleTextChange = ev => setText(ev.target.value);

    const [type, setType] = React.useState("");
    const handleTypeChange = ev => setType(ev.target.value);
  
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Write new post!
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <select onChange={handleTypeChange}>                        
                    <option type="default" selected disabled hidden>Choose post type</option>
                    <option type="text">Text</option>
                    <option type="photo">Photo</option>
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
                    isInvalid={!title}
                    style={{width: "465px"}}
                    maxlength="100"
                    rows={1}
                    cols={5}
                />
                <p></p>
                { 
                    type.localeCompare("Photo") === 0 || type.localeCompare("Text") === 0 ?
                        type.localeCompare("Photo") !== 0 ?
                            <textarea
                                name="text"
                                placeholder=" Insert text here"
                                value={text || ""}
                                onChange={handleTextChange}
                                isInvalid={!text}                            
                                style={{width: "465px"}}
                                maxlength="500"
                                rows={5}
                                cols={5}
                            />
                        :
                            <textarea
                                name="photo"
                                placeholder=" Photo"
                                value={photo || ""}
                                onChange={handlePhotoChange}
                                isInvalid={!photo}
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
                <p>{checked ? ' ' : 'ERROR'}</p>
                <Button variant="primary" onClick={handleClose}>
                Post
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPost;