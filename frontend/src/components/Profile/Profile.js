import { Container, Row, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ImageUploader from 'react-images-upload'
import styled from 'styled-components'
import { Button } from '@mui/material';

import PostCard from '../Post/PostCard';
import ProfileInteractions from './ProfileInteractions';

import { getRandPosts, getUser, updateUser, getCurrUser, logout, getInteractions } from '../../api/apiRequest.js';
import { formatUser, unformatUser } from '../../api/helper';
import FollowingItem from './FollowingItem';
import FollowerItem from './FollowerItem';
import TopicItem from './TopicItem';

import ErrorPage from '../ErrorPage';

/*
import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
*/


function ConfirmationModal(props) {
    const handleLogout = async () => {
        await logout(localStorage.getItem("token"));
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));
        window.location.href = "/login";
    }

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
                    <Button variant="primary" onClick={handleLogout} color="error">
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
                    <input type="file"/>
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


function BlockModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Block User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to block this user?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={props.handleBlockUser} color="error">
                        Yes
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}


function UnblockModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Unblock User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to unblock this user?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={props.handleUnblockUser} color="error">
                        Yes
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}


function FollowingModal(props) {

    console.log(props.user.following);

    const listItems = props.user.following.map((following) => (
        <FollowingItem
            key={following}
            user_id={following}
        />
    ));

    return (
        <>
            <Modal show={props.show} onHide={props.handleCloseFollowing}>
                <Modal.Header closeButton>
                    <Modal.Title>Following List</Modal.Title>
                </Modal.Header>
                <Modal.Body user={props.user}>
                    <ul>{listItems}</ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleCloseFollowing}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function FollowerModal(props) {

    console.log("poop");
    console.log(props.user.followers);

    const listItems = props.user.followers.map((follower) => (
        <FollowerItem
            key={follower}
            user_id={follower}
        />
    ));

    return (
        <>
            <Modal show={props.show} onHide={props.handleCloseFollowers}>
                <Modal.Header closeButton>
                    <Modal.Title>Follower List</Modal.Title>
                </Modal.Header>
                <Modal.Body user={props.user}>
                    <ul>{listItems}</ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleCloseFollowers}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function TopicModal(props) {
    const listItems = props.user.topics.map((topic) => (
        <TopicItem
            key={topic}
            topic_id={topic}
        />
    ));

    return (
        <>
            <Modal show={props.show} onHide={props.handleCloseTopics}>
                <Modal.Header closeButton>
                    <Modal.Title>Followed Topics List</Modal.Title>
                </Modal.Header>
                <Modal.Body user={props.user}>
                    <ul>{listItems}</ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleCloseTopics}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


function Profile(props) {
    console.log(props)
    var placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
    placeholder = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    placeholder ="profile_images\cat1.png"


    // const currid = -1;
    const { id } = useParams();
    const navigate = useNavigate();

    const nullUser = {
        username: "User not found",
        pfp: null,
        bio: "",
        follower_count: 0,
        following_count: 0,
        followers: [],
        following: [],
        topics:[],
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
        followers: [],
        following: [],
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
    const [curr, setCurr] = useState(nullUser);
    const [error, setError] = React.useState("");
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showTopics, setShowTopics] = useState(false);
    const [tempUser, setTempUser] = useState(nullUser);
    const [update, setUpdate] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [currId, setCurrId] = useState(null);
    const [uploadedPictures, setUploadedPictures] = useState([]);
    const [buttonText, setButtonText] = React.useState("");

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
    const onDrop = (picture) => {
        setUploadedPictures([...uploadedPictures, picture])
        user.pfp = uploadedPictures;
        console.log("profile pic", uploadedPictures);
        console.log(user)

    }

    const handleFollowUser = (event) => {
        console.log("followed", followed);
        console.log("actually", user.followers.includes(currId));
        setFollowed(true)
        console.log(user.followers)
        var arr = []
        if (user.followers != null) {
            arr = user.followers
        }
        arr.push(currId);
        user.followers = arr
        user.follower_count = arr.length;
        console.log(user)
        updateUser(id, user, localStorage.getItem('token'))

        arr=[]
        if (curr.following != null) {
            arr = curr.following
        }
        if (!curr.following.includes(id)) {
            arr.push(id);
        }
        curr.following = arr
        curr.following_count = arr.length
        updateUser(currId, curr, localStorage.getItem('token'))
        getUserApi()
    }
    const handleUnfollowUser = (event) => {
        console.log("followed", followed);
        console.log("actually", user.followers.includes(currId));
        user.follower_count -= 1;
        setFollowed(false);
        var arr = user.followers
        var index = arr.indexOf(currId);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        user.followers = arr;
        user.follower_count = arr.length;
        console.log(user)
        updateUser(id, user, localStorage.getItem('token'))
        
        arr=[]
        index = arr.indexOf(id);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        curr.following = arr;
        curr.following_count = arr.length;

        updateUser(currId, curr, localStorage.getItem('token'))
        getUserApi()

    }

    const handleBlockUser = (event) => {
        console.log("blocked")
        console.log(user.blocked)

        var arr = []
        if (curr.blocked != null) {
            arr = curr.blocked
        } else {
            curr.blocked = [];
        }
        if (!curr.blocked.includes(id)) {
            arr.push(id);
        }
        curr.blocked = arr
        updateUser(currId, curr, localStorage.getItem('token'))
        getUserApi()
        handleClose()
    }
    const handleUnblockUser = (event) => {
        console.log("unblocked")
        console.log(user.blocked)
        
        var arr = curr.blocked
        var index = arr.indexOf(id);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        curr.blocked = arr;

        updateUser(currId, curr, localStorage.getItem('token'))
        getUserApi()
        handleClose()
    }

    const handleDM = (event) => {

    }

    /* helper functions */
    const handleUpdateUser = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setTempUser({
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
        // getPostsFromUser(id)
        getRandPosts()
            .then((res) => {
                setPosts(res);
            })
            .catch(err => console.error(`Error: ${err}`));
    }

    //redirects user to an error page, then reloads page to ensure that screen is not stuck on nothing 
    const errorHandler = (e) => {
        navigate('/error', { replace: true });
        window.location.reload();
    }

    /* handler helper functions */
    const handleOpenConfirmation = () => {
        setShowConfirmation(true);
    }

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    }
    const handleShow = () => {
        if (getCurrUser() != nullUser) {
            setShow(true);
        } else {
            setShow(false);
        }
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleShowFollowers = () => {
        setShowFollowers(true);
    }
    const handleCloseFollowers = () => {
        setShowFollowers(false);
    }
    const handleShowFollowing = () => {
        setShowFollowing(true);
    }
    const handleCloseFollowing = () => {
        setShowFollowing(false);
    }
    const handleShowTopics = () => {
        setShowTopics(true);
    }
    const handleCloseTopics = () => {
        setShowTopics(false);
    }


    const confirmCanUpdate = () => {
        getCurrUser().then(res => {
            console.log(res)
            const currid = res.curr_user;
            setCurrId(currid);
            canUpdate(id, currid);
        }).catch(err => {
            console.error(`Error: ${err}`);
        });
    }

    const getUserApi = () => {

        getUser(id)
            .then(res => {
                /*
                const usr = formatUser(res.data);
                setUser(usr);
                console.log(usr);
                */
                console.log("get user",res);
                const blockedUsers = res.blocked;
                const tempUser = res;
                
                setUser(res);
                console.log("get user",res);
                console.log("allow", res.private);
                setPrivate(res.private);

                getCurrUser().then(res => {
                    console.log(res)
                    const currid = res.curr_user;
                    setCurrId(currid);
                    console.log("blocked list of user ur tryna view: " + blockedUsers);
                    console.log("currid: " + currid);
                    console.log(blockedUsers.includes(currid));
                    for (const temp of blockedUsers) {
                        if (temp == currid) {
                            errorHandler();
                        }
                    }
                    setUser(tempUser);
                }).catch(err => {
                    console.error(`Error: ${err}`);
                });
            })
            .catch(err => {
                console.error(`Error: ${err}`);
                errorHandler();
            });


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
        console.log(localStorage.getItem('token'));
        console.log("------------------");

        updateUser(id, tempUser, localStorage.getItem('token')).then(res => {
            console.log("response: " + res);
            const usr = formatUser(res.data);
            setUser(usr);
            console.log("make sure user stored in update", user)
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
            setButtonText("Update Profile");
        } else {
            setUpdate(false);
            // setFollowed(user.followers.includes(currId));
            // console.log(user.followers.includes(currId))
            // console.log("user",user)
            getUser(currID)
            .then(res => {
                setCurr(res);
            })
            .catch(err => console.error(`Error: ${err}`));
        }
    }

    useEffect(() => {
        getNewPosts();
        //getNewUser();
        getUserApi();
        confirmCanUpdate();

        console.log("user in useeffect", user)
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
                        <h4>{user.username} </h4>
                        <h7>{user.bio}</h7>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <Button variant="danger" onClick={handleShowFollowers}>
                                {user.follower_count} followers
                            </Button>
                            <FollowerModal
                                show={showFollowers}
                                user={user}
                                handleCloseFollowers={handleCloseFollowers}
                            />
                            <Button variant="danger" onClick={handleShowFollowing}>
                                {user.following_count} following
                            </Button>
                            <FollowingModal
                                show={showFollowing}
                                user={user}
                                handleCloseFollowing={handleCloseFollowing}
                            />
                            <Button variant="danger" onClick={handleShowTopics}>
                                Topics
                            </Button>
                            <TopicModal
                                show={showTopics}
                                user={user}
                                handleCloseTopics={handleCloseTopics}
                            />
                        </div>
                        <div>
                        </div>
                        {!update && (!user.followers.includes(currId)) && <Button onClick={handleFollowUser}> Follow User</Button>}
                        {!update && (user.followers.includes(currId)) && <Button onClick={handleUnfollowUser}> Unfollow User</Button>}
                        {!update && <Button onClick={handleDM}> Message User</Button>}
                    </div>
                </div>

                <div className="file-field input-field" style={{ margin: "0px" }}>
                    <div className="btn #64b5f6 blue darken-1">
                        {update && <span onClick={handleShow}>Update Profile</span>}
                        {!update && (curr.blocked == null || !curr.blocked.includes(id)) && <span onClick={handleShow}>Block</span>}
                        {!update && (curr.blocked != null && curr.blocked.includes(id)) && <span onClick={handleShow}>Unblock</span>}

                        <UpdateProfileModal
                            show={show && update}
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
                        <BlockModal
                            show={show && !update && (curr.blocked == null || !curr.blocked.includes(id))}
                            handleClose={handleClose}
                            handleBlockUser={handleBlockUser}
                        />
                        <UnblockModal
                            show={show && !update && (curr.blocked != null && curr.blocked.includes(id))}
                            handleClose={handleClose}
                            handleUnblockUser={handleUnblockUser}
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
                {/* <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>  
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>  
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>  
                <img className="item" src="https://static01.nyt.com/images/2019/05/31/multimedia/parenting-poop/22110ba6851840dd9e7d6012a4c6ed32-superJumbo.jpg" alt="post picture"/>   */}
            </div>
        </div>

    );
}


export default Profile