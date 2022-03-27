import { Container, Row } from 'react-bootstrap';
import React, { Component, useState, useEffect } from 'react';
import PostCard from '../Post/PostCard';
import { Modal, Col, Image } from "react-bootstrap";
import { Button } from '@mui/material';

import { getRandPosts, getUser } from '../../api/apiRequest.js';

import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


function Profile(props) {
    

    const [error, setError] = React.useState("");

    function errorMessage(bio) {
        console.log(bio)
        let message = "";
        if (bio === null || bio.length == 0) {
            message = message + "Please enter a bio.\n";
        }
        return message;
    }

    const [posts, setPosts] = useState([]);

    const [show, setShow] = useState(false);

    const nullUser = {
        id: 1,
        profile_name: "User not found",
        user_profile_picture: null,
        user_bio: "",
        user_followers_count: 0,
        user_following_count: 0,
        allow_only_followed_users: 0,
        first_name: "null first",
        last_name: "null last",
        user_email: "null email"
    }

    const [user, setUser] = useState(nullUser);

    const [tempUser, setTempUser] = useState(nullUser);

    /*
        profile_name: randString(3, false, false),
        user_profile_picture: randImg(),
        user_bio: randString(15 + rand(10), true, true),
        user_followers_count: rand(500),
        user_following_count: rand(500),
        allow_only_followed_users: rand(2),
        first_name: randWord(),
        last_name: randWord(),
        user_email: randString(3, false, true) + "com"
    */


    const handleUpdateUser = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setTempUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmitUpdate = (event) => {
        console.log("submit");
        let err = errorMessage(tempUser.user_bio);
        setError(err);
        if (err == "") {
            setUserApi();
            setTempUser(nullUser)
            handleClose();
        }
    }

    const getNewPosts = () => {
        getRandPosts()
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    const getNewUser = () => {
        getUser()
            .then((res) => {
                setUser(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    };

    const getUserApi = () => {
        axios.get('/api/profile/1')
            .then(res => {
                const usr = res.data;
                setUser(usr);
            })
    }

    const setUserApi = () => {
        axios.put('/api/profile/1', tempUser)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            
            });
    }

    useEffect(() => {
        getNewPosts();
        //getNewUser();
        getUserApi();
    }, []);

    

    // const [mypics,setPics] = useState([])
    // const {state,dispatch} = useContext(UserContext)
    // const [image,setImage] = useState("")
    // useEffect(()=>{
    //    fetch('/mypost',{
    //        headers:{
    //            "Authorization":"Bearer "+localStorage.getItem("jwt")
    //        }
    //    }).then(res=>res.json())
    //    .then(result=>{
    //        console.log(result)
    //        setPics(result.mypost)
    //    })
    // },[])
    // useEffect(()=>{
    //    if(image){
    //     const data = new FormData()
    //     data.append("file",image)
    //     data.append("upload_preset","insta-clone")
    //     data.append("cloud_name","cnq")
    //     fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
    //         method:"post",
    //         body:data
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{


    //        fetch('/updatepic',{
    //            method:"put",
    //            headers:{
    //                "Content-Type":"application/json",
    //                "Authorization":"Bearer "+localStorage.getItem("jwt")
    //            },
    //            body:JSON.stringify({
    //                pic:data.url
    //            })
    //        }).then(res=>res.json())
    //        .then(result=>{
    //            console.log(result)
    //            localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
    //            dispatch({type:"UPDATEPIC",payload:result.pic})
    //            //window.location.reload()
    //        })

    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    //    }
    // },[image])
    // const updatePhoto = (file)=>{
    //     setImage(file)
    // }


    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",

                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={user.user_profile_picture}
                        />

                    </div>
                    <div className="down">
                        <p></p>
                        {/* <div style="padding-top:5em;"></div> */}
                        <h4>{user.profile_name}</h4>
                        <h7>{user.user_bio}</h7>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>727 posts</h6>
                            <h6>{user.user_followers_count} followers</h6>
                            <h6>{user.user_following_count} following</h6>
                        </div>

                    </div>
                </div>

                <div className="file-field input-field" style={{ margin: "0px" }}>
                    <div className="btn #64b5f6 blue darken-1">
                        <span onClick={handleShow}>Update Profile</span>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <form>
                                    <textarea
                                        name="user_bio"
                                        placeholder="New Bio"
                                        style={{ width: "465px" }}
                                        onChange={handleUpdateUser}
                                    />
                                    <label>Upload New Profile Picture</label>
                                    <input
                                        type="file"
                                    />
                                </form>

                            </Modal.Body>
                            <Modal.Footer>
                                <p>{error}</p>
                                <Button variant="primary" onClick={handleSubmitUpdate}>
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} /> */}
                    </div>
                    {/* <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div> */}
                </div>
            </div>
            <div>
                <p>Post History</p>
                {/* <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} /> */}
            </div>
            <Container style={{ padding: "25px 50px 75px" }}>
                <Row>
                    <PostCard postList={posts} />
                </Row>
            </Container>
            <div className="gallery">
                {/* {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               } */}
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture" />
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture" />
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture" />
                {/* <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>  
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>  
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>  
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>   */}
            </div>
        </div>
        
    );
}


export default Profile