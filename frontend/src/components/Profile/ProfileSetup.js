import { Card, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import { getRandPosts, getUser, updateUser, getCurrUser } from '../../api/apiRequest.js';
import { formatUser, unformatUser } from '../../api/helper';

// const express = require('express')
// const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload');
// const FileType = require('file-type');

// const app = express()
// const port = 8000


// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())

// app.use(fileUpload());

// app.post('/profilesetup', async (req, res) => {
//     const {name, data} = req.files.pic;
//     if (name && data) {
//         await knex.insert({user_profile_picture: data}).into('img');
//         res.sendStatus(200);
//     } else {
//         res.sendStatus(400);
//     }
// })



//export default class ProfileSetup extends Component {
function ProfileSetup(props) {
    var placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==";
    placeholder = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    //const { id } = useParams()
    placeholder = "/media/images/cat1.png"


    const nullUser = {
        bio: "",
        first: "",
        last: "",
        pfp: placeholder,
        follower_count: 0,
        following_count: 0,
        followers: [],
        following: [],
        topics:[],
        private: false
    }


    /* state hooks */
    const [user, setUser] = useState(nullUser);
    const [tempUser, setTempUser] = useState(nullUser);

    const [image, setImage] = useState(null);
    const handleImageChange = ev => {
        // setImage(URL.createObjectURL(ev.target.files[0]));
        setImage(ev.target.files[0]);
        console.log(image);
        console.log(ev.target.name);
        setTempUser({
            ...tempUser,
            [ev.target.name]: image,
        });
    };

  

    const handleUpdateUser = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setTempUser({
            ...tempUser,
            [event.target.name]: event.target.value,
        });
         console.log(user);
    }


    function errorMessage(bio, firstname, lastname) {
        console.log("errorMessage")
        console.log(bio)
        console.log(firstname)
        console.log(lastname)
        let message = "";

        //bio
        if (bio === null || bio.length == 0) {
            message = message + "Please enter a bio.\n";
        }

        if (bio.length > 500) {
            message = message + "Your bio is too long\n";
        }

        //first + last name
        if (firstname === null || firstname.length == 0) {
            message = message + "Please enter first name.\n";
        }

        if (firstname.length > 30) {
            message = message + "Your first name is too long\n";
        }
        
        if (!/^([A-Za-z0-9\-_.]+)$/.test(firstname)) {
            message = message + "First name contains invalid characters\n";
        }

        if (lastname === null || lastname.length == 0) {
            message = message + "Please enter last name.\n";
        }

        if (lastname.length > 30) {
            message = message + "Your last name is too long\n";
        }
        
        if (!/^([A-Za-z0-9\-_.]+)$/.test(lastname)) {
            message = message + "Last name contains invalid characters\n";
        }

        return message;
    }

    const handleSubmitUpdate = (event) => {
        console.log("submit hit, temp user", tempUser);
        let err = errorMessage(tempUser.bio, tempUser.first, tempUser.last);
        if (err !== "") {
            alert(err);
        }
        else {
            setUserwithId();
            hitSubmit();
        }
    }
    
    const setUserwithId = () => {
        getCurrUser().then(res => {
            console.log("confirm can update" + res)
            const curr = res.curr_user;
            setUserApi(curr);
        }).catch(err => console.error(`Error: ${err}`));
    }

    
    const setUserApi = (id) => {
        //change testUser to updated user object

        console.log("put user----------");
        console.log(tempUser);
        console.log("------------------");
        updateUser(id, tempUser, localStorage.getItem('token')).then(res => {
            console.log("response: " + res)
            const usr = formatUser(res.data);
            setUser(usr);
        })
    }

    const hitSubmit = (e) => {
        alert("Form submitted");
        window.location.href = "/";
        
    }
    
    
    return (
        <div className="ProfileSetup">
            <Card className="LoginCard" style={{ width: '18rem' }}>
                <form >
                    <h3>Create Profile</h3>

                    <div className="form-group">
                        <label>First Name*:</label>
                        <input name="first" type="text" required className="form-control" placeholder="Enter First Name" 
                        onChange={handleUpdateUser} />
                    </div>

                    <div className="form-group">
                        <label>Last Name*:</label>
                        <input name="last" type="text" required className="form-control" placeholder="Enter Last Name" 
                        onChange={handleUpdateUser} />
                    </div>

                    <div className="form-group">
                        <label>Bio</label>
                        <textarea name="bio" type="text" className="form-control" placeholder="Tell us about yourself!" 
                        onChange={handleUpdateUser} />
                        {/* <textarea className="form-control" placeholder="Tell us about yourself!"/> */}
                    </div>

                    <div className="form-group">
                        <label>Upload a Profile Picture</label>
                        <input name="pfp" type="file" 
                        onChange={handleImageChange}  />
                        {/* <input
                        type="file"
                        /> */}
                    </div>
                    
                </form>
                <button className="btn btn-primary btn-block" onClick={handleSubmitUpdate}>Create</button>
            </Card>
        </div>
    );
}
export default ProfileSetup