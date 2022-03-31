import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import PostCard from '../Post/PostCard';
import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';
import { useParams } from "react-router-dom";

import { getRandPosts, getUser, updateUser, getCurrUser } from '../../api/apiRequest.js';
import { formatUser, unformatUser } from '../../api/helper';

/*
import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
*/

function ConfirmationModal(props) {
    console.log("poop");

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure about deleting your account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={props.handleDelete} color="error">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

function UpdateProfileModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form>
                    <textarea
                        name="bio"
                        placeholder="New Bio"
                        style={{ width: "465px" }}
                        onChange={props.handleUpdateUser}
                    />
                    <label>Upload New Profile Picture</label>
                    <input
                        type="file"
                    />
                </form>
                <br></br>
                <br></br>
                <Button onClick={props.handleShowConfirmation} color="error">
                    Delete Account
                </Button>

            </Modal.Body>
            <Modal.Footer>
                <p>{props.error}</p>
                <Button variant="primary" onClick={props.handleSubmitUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function deleteProfile() {
    console.log("deleteeee");
}

function CloseConfirmationModal() {

}

function Profile(props) {
    console.log(props)
    var placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
    placeholder = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"


    const { id } = useParams()

    const nullUser = {
        username: "User not really found",
        pfp: placeholder,
        bio: "",
        follower_count: 0,
        following_count: 0,
        private: true,
        first: "",
        last: "",
        email: ""
        //topics = []
    }

    const testUser = {
        username: "test user",
        pfp: null,
        bio: "i hate ap bio",
        follower_count: 6,
        following_count: 9,
        private: true,
        first: "what",
        last: "thefuc",
        email: "weyellforyahoo@yahoo.com"
        //topics = []
    }

    const updateBool = {
        curr_user: -1
    }

    /* state hooks */
    const [user, setUser] = useState(nullUser);
    const [error, setError] = React.useState("");
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [tempUser, setTempUser] = useState(nullUser);
    const [update, setUpdate] = useState(false);

    /* user formatted this way:
    User = {
        username: string,
        pfp: string,
        bio: string,
        follower_count: int,
        following_count: int,
        private: bool,
        first: string,
        last: string,
        email: string
    }
    */

    /* helper functions */
    const handleUpdateUser = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setTempUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    function errorMessage(bio) {
        console.log(bio)
        let message = "";
        if (bio === null || bio.length == 0) {
            message = message + "Please enter a bio.\n";
        }
        return message;
    }

    const handleSubmitUpdate = (event) => {
        console.log("submit");
        let err = errorMessage(tempUser.bio);
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

    /*
    const getNewUser = () => {
        getUser()
            .then((res) => {
                setUser(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }
    */

    /* handler helper functions */
    const handleOpenConfirmation = () => {
        setShowConfirmation(true);
    }

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const confirmCanUpdate = () => {
        getCurrUser().then(res => {
            console.log(res)
            const curr = res.curr_user;
            canUpdate(id, curr);
        }).catch(err => console.error(`Error: ${err}`));
    }

    const getUserApi = () => {
        console.log("help")
        
        
        getUser(id)
            .then(res => {
                /*
                const usr = formatUser(res.data);
                setUser(usr);
                console.log(usr);
                */
                console.log(res);
                setUser(res);
            })
            .catch(err => console.error(`Error: ${err}`));


        /*
        axios.get('/api/profile/1')
            .then(res => {
                const usr = formatUser(res.data);
                console.log(usr);
                console.log(formatUser(usr))
                setUser(usr);
            })
        */

    }

    const setUserApi = () => {
        //change testUser to updated user object
        //const updatedUser = unformatUser(testUser);

        console.log("put user----------");
        console.log(tempUser);
        console.log("------------------");
        updateUser(id, tempUser, localStorage.getItem('token')).then(res => {
            const usr = formatUser(res.data);
            setUser(usr);
        })

        /*
        axios.put('/api/profile/1', testUser)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            
            });
        */
    }


    const canUpdate = (usrID, currID) => {
        console.log("viewing id: " + usrID);
        console.log("current id: " + currID);
        if (currID == usrID) {
            setUpdate(true);
        } else {
            setUpdate(false);
        }
    }

    useEffect(() => {
        getNewPosts();
        //getNewUser();
        confirmCanUpdate();
        getUserApi();
    }, []);

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
                            src={user.pfp}
                        />
                    </div>
                    <div className="down">
                        <p></p>
                        {/* <div style="padding-top:5em;"></div> */}
                        <h4>{user.username}</h4>
                        <h7>{user.bio}</h7>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h6>3 posts</h6>
                            <h6>{user.follower_count} followers</h6>
                            <h6>{user.following_count} following</h6>
                        </div>
                    </div>
                </div>

                <div className="file-field input-field" style={{ margin: "0px" }}>
                    <div className="btn #64b5f6 blue darken-1">
                        {update && <span onClick={handleShow}>Update Profile</span>}

                        <UpdateProfileModal 
                            show={show}
                            handleClose={handleClose}
                            handleShowConfirmation={handleOpenConfirmation}
                            handleSubmitUpdate={handleSubmitUpdate}
                            handleUpdateUser={handleUpdateUser}
                            error={error}
                        />
                        <ConfirmationModal 
                            show={showConfirmation} 
                            handleClose={handleCloseConfirmation} 
                        />

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