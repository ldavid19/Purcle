import { Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import PostCard from '../Post/PostCard';
import { Modal } from "react-bootstrap";
import { Button } from '@mui/material';

import { getRandPosts, getUser } from '../../api/apiRequest.js';




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

    const placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";

    const nullUser = {
        username: "User not found",
        pfp: placeholder,
        bio: "",
        follower_count: 0,
        following_count: 0,
        private: true,
        first: "",
        last: "",
        email: ""
    }

    const [user, setUser] = useState(nullUser);

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

    useEffect(() => {
        getNewPosts();
        getNewUser();
    }, []);

    const handleUpdateUser = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmitUpdate = (event) => {
        console.log("submit");
        let err = errorMessage(user.bio);
        setError(err);
        if (err == "") {
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
                            src={user.pfp}
                        />

                    </div>
                    <div className="down">
                        <p></p>
                        {/* <div style="padding-top:5em;"></div> */}
                        <h4>{user.profile_name}</h4>
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
    )
}


export default Profile