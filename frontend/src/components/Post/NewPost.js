import { useEffect, useState } from "react";
import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { Modal, Col, Row, Image } from "react-bootstrap";
import { Button } from '@mui/material';

import { makePost, getAllTopics, makeTopic, getTopic, getCurrUser, makeImagePost } from "../../api/apiRequest.js";
import axios from 'axios'
import $ from "jquery";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    console.log(z);
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      console.log(file)
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };

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
    // if (type.localeCompare("Image") === 0 && text.length === 0) {
    //     message = message + "Please insert image.\n";
    // } else if (type.localeCompare("Image") === 0 && text.length < 5) {
    //     message = message + "Filetype not supported.\n";
    // } else if (type.localeCompare("Image") === 0
    // && text.substring(text.length - 4, text.length).localeCompare(".png") !== 0
    // && text.substring(text.length - 4, text.length).localeCompare(".PNG") !== 0
    // && text.substring(text.length - 4, text.length).localeCompare(".jpg") !== 0
    // && text.substring(text.length - 4, text.length).localeCompare(".JPG") !== 0
    // && text.substring(text.length - 5, text.length).localeCompare(".jpeg") !== 0
    // && text.substring(text.length - 5, text.length).localeCompare(".JPEG") !== 0) {
    //     message = message + "Filetype not supported.\n";
    // }
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
            //var content_str = type.localeCompare("Image") === 0 ? image : text;

            var newPost;

            if (newTopic) {
                getCurrUser()
                    .then((res_u1) => {
                        console.log(res_u1);
                        console.log("trying to create a new topic");
                        var createdTopic = {
                            topic_id: topic.label,
                            topic_num_followers: 0
                        };
                        makeTopic(createdTopic)
                            .then((res_t) => {
                                newPost = {
                                    id: undefined,
                                    post_topic: topic.label,
                                    post_type: type_int,
                                    user_id: res_u1.curr_user,
                                    //user_id: 1,
                                    post_is_anonymous: checked,
                                    post_title: title,
                                    post_content: text,
                                    post_time: undefined
                                };
                                console.log(newPost);
                                type_int == 0 ? makePost(newPost) : makeImagePost(newPost)
                                //.catch(err => console.error(`Error: ${err}`));
                            })
                            .catch(err => console.error(`Error: ${err}`));
                    })
                    .catch(err => console.error(`Error: ${err}`));
            } else {
                getCurrUser()
                    .then((res_u2) => {
                        console.log(res_u2);
                        newPost = {
                            id: undefined,
                            post_topic: topic.label,
                            post_type: type_int,
                            user_id: res_u2.curr_user,
                            //user_id: 1,
                            post_is_anonymous: checked,
                            post_title: title,
                            post_content: text,
                            post_time: undefined
                        };
                        console.log(newPost);
                        type_int == 0 ? makePost(newPost) : makeImagePost(newPost)
                        //.catch(err => console.error(`Error: ${err}`));
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

    const [image, setImage] = React.useState(undefined);
    const handleImageChange = ev => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        //setText(URL.createObjectURL(ev.target.files[0]));
        //setImage(ev.target.files[0]);
        setText("/media/images/" + ev.target.files[0].name);
        console.log(ev.target.files[0]);
        console.log(ev.target.files[0].name);
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
                setTopics(topic_list);
                console.log(topics);
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
                            <div>
                                {/*}
                                <form method="post" enctype="multipart/form-data">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    <button type="submit">Upload</button>
                                </form>
                                */}
                                {/*}
                                <div w3-include-html="test.html"></div>
                                {includeHTML()}
                                */}
                                <input
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                <p></p>
                                { image.length > 0 ? <Image src={image}/> : ""}
                            </div>
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