import { useEffect, useState } from "react";
import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { Modal, Col, Row, Image } from "react-bootstrap";
import { Button } from '@mui/material';

import { makePost, databaseLength, getAllTopics } from "../../api/apiRequest.js";

function errorMessage(title, type, text, topic) {
    let message = "";
    if (topic === null || topic.value === null) {
        message = message + "Please choose topic.\n";
    } else if (topic.label.length < 1) {
        message = message + "Please choose topic.\n";
    }
    if (type.localeCompare("Image") !== 0 && type.localeCompare("Text") !== 0) {
        message = message + "Please choose a post type.\n";
    }
    if (title.length === 0) {
        message = message + "Please insert title.\n";
    }
    if (type.localeCompare("Text") === 0 && text.length === 0) {
        message = message + "Please insert text.\n";
    }
    if (type.localeCompare("Image") === 0 && text.length === 0) {
        message = message + "Please insert image.\n";
    } else if (type.localeCompare("Image") === 0 && text.length < 5) {
        message = message + "Filetype not supported.\n";
    } else if (type.localeCompare("Image") === 0
    && text.substring(text.length - 4, text.length).localeCompare(".png") !== 0
    && text.substring(text.length - 4, text.length).localeCompare(".jpg") !== 0
    && text.substring(text.length - 5, text.length).localeCompare(".jpeg") !== 0) {
        message = message + "Filetype not supported.\n";
    }
    return message;
}

function NewPost(props) {

    const [show, setShow] = useState(false);

    const [error, setError] = React.useState("");

    const handleSubmit = () => {
        if (errorMessage(title, type, text, topic).length === 0) {
            var content;
            if (type == "Text") {
                content = text;
            } else {
                content = "";
            }
            var newPost = {
                post_id: databaseLength(),
                post_topic: topic,
                post_type: 0,
                user_id: "user",
                post_is_anonymous: checked,
                post_title: title,
                post_content: content,
                post_time: new Date(Date.now()),
                post_score: 0
            };

            makePost(newPost)
            .then((res) => {
                props.getPosts();
                //getAllPosts();
            });

            setShow(false);
            setTitle("");
            setImage(null);
            setText("");
            setType("");
            setError("");
            setTopic("");
            setChecked(false);
        } else {
            setError(errorMessage(title, type, text, topic));
        }
    }
  
    const handleClose = () => {
        setShow(false);
        setTitle("");
        setImage(null);
        setText("");
        setType("");
        setError("");
        setTopic("");
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

    const [image, setImage] = React.useState(null);
    const handleImageChange = ev => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setText(ev.target.value);
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

    const [topic, setTopic] = React.useState(null);
    const handleTopicChange = ev => {
        setTopic(ev);
        if (ev.__isNew__ === true) {
            ev.value = 0;
        }
    }

    const [topics, setTopics] = useState([]);
    const getTopics = () => {
        getAllTopics()
            .then((res) => {
                let data = res.data;

                let topic_list = []
                
                data.map((topic) => {
                    let newTopic = {
                        label: topic.topic_id,
                        value: topic.topic_num_followers
                    }

                    topic_list.push(newTopic);
                })

                //console.log(topic_list)

                //console.log(res.data);
                setTopics(topic_list);
                //console.log(topics);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    useEffect(() => {
        console.log("LOADED!! :))")
        getTopics();
    }, []);

    const formatOptionLabel = ({ label, value }) => (
        <Row>
            <Col>{label.toLowerCase()}</Col>
            <Col></Col>
            <Col>{topics.some(e => e.label === label) ? value : 0} followers</Col>
        </Row>
    );

    return (
        <>
            <Button variant="contained" onClick={handleShow}>
                Create new post
            </Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Creatable
                        value={topic}
                        options={topics.sort(function(a, b){return b.value-a.value})}
                        onChange={handleTopicChange}
                        placeholder="Choose Topic"
                        formatOptionLabel={formatOptionLabel}
                    />
                    <p></p>
                </Row>
                <Row>
                <Col>
                    <select onChange={handleTypeChange}>                        
                        <option type="default" selected disabled hidden>Choose post type</option>
                        <option type="text">Text</option>
                        <option type="image">Image</option>
                    </select>
                    {' '}
                </Col>
                
                <Col>
                </Col>

                <Col>
                    <label>
                        Anonymous{' '}
                        <input type="checkbox" 
                        checked={checked}
                        onChange={handleAnonChange}/>
                    </label>
                    {' '}
                </Col>
                </Row>

                <p></p>
                <textarea
                    name="title"
                    placeholder=" Title"
                    value={title || ""}
                    onChange={handleTitleChange}
                    style={{width: "465px"}}
                    maxLength="100"
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
                                style={{width: "465px", height: "300px"}}
                                maxlength="500"
                                rows={5}
                                cols={5}
                            />
                        :
                            <form>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <p></p>
                                { image.length > 0 ?
                                            <Image
                                                src={image} 
                                            />
                                : ""}
                                </form>
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