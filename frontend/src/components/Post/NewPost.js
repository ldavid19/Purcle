import { useEffect, useState } from "react";
import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { Modal, Col, Row, Image } from "react-bootstrap";
import { Button } from '@mui/material';

import { makePost, getAllTopics, makeTopic, getTopic, getCurrUser } from "../../api/apiRequest.js";
import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

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

    const [newTopic, setNewTopic] = useState(false);

    const [error, setError] = React.useState("");

    const handleSubmit = () => {
        if (errorMessage(title, type, text, topic).length === 0) {
            var content;
            if (type === "Text") {
                content = text;
            } else {
                content = "";
            }

            var type_int = type.localeCompare("Image") === 0 ? 1 : 0;
            var content_str = type.localeCompare("Image") === 0 ? image : text;

            var newPost;
            var u_id;

            if (newTopic) {
                getCurrUser()
                    .then(res_u => {
                        console.log(res_u);
                        u_id = res_u.id;
                        console.log("trying to create a new topic");
                        var createdTopic = {
                            topic_id: topic.label,
                            topic_num_followers: 0
                        };
                        makeTopic(createdTopic)
                            .then(res_t => {
                                newPost = {
                                    id: 99,
                                    //post_topic: {topic_id: topic.label, topic_num_followers: topic.value},
                                    post_topic: res_t.topic_topic,
                                    post_type: type_int,
                                    //user_id: res_u.id, XXXX
                                    user_id: 0,
                                    post_is_anonymous: checked,
                                    post_title: title,
                                    post_content: content_str,
                                    post_time: new Date(Date.now()) //idk if this is right XXXX
                                };
                                console.log(newPost);
                                makePost(newPost)
                                .catch(err => console.error(`Error: ${err}`));
                            })
                            .catch(err => console.error(`Error: ${err}`));
                    })
                    .catch(err => console.error(`Error: ${err}`));
            } else {
                getCurrUser()
                    .then(res_u => {
                        console.log(res_u);
                        u_id = res_u.id;
                        newPost = {
                            id: 99,
                            //post_topic: {topic_id: topic.label, topic_num_followers: topic.value},
                            post_topic: topic.label,
                            post_type: type_int,
                            //user_id: res_u.id, XXXX
                            user_id: 0,
                            post_is_anonymous: checked,
                            post_title: title,
                            post_content: content_str,
                            post_time: new Date(Date.now()) //idk if this is right XXXX
                        };
                        console.log(newPost);
                        makePost(newPost)
                        .catch(err => console.error(`Error: ${err}`));
                    })
                    .catch(err => console.error(`Error: ${err}`));
            }

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
            setNewTopic(true);
        } else {
            setNewTopic(false);
        }
    }

    const [topics, setTopics] = useState([]);
    const getTopics = () => {
        getAllTopics()
            .then((res) => {
                let data = res;
                console.log(res);

                let topic_list = [];
                
                data.map((t) => {
                    let newTopic = {
                        label: t.topic_id,
                        value: t.topic_num_followers
                    }

                    topic_list.push(newTopic);
                })

                console.log("this hits1");
                console.log(topic_list);
                console.log("this hits2");
                //console.log(res.data);
                console.log("this hits3");
                setTopics(topic_list);
                console.log("this hits4");
                console.log(topics);
                console.log("this hits5");
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    useEffect(() => {
        console.log("useEffect runs");
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