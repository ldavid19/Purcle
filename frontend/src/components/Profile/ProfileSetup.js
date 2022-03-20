import React, { Component } from "react";
import { Card } from "react-bootstrap";


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/";
}


export default class ProfileSetup extends Component {

    
    render() {
        return (
            <div className="ProfileSetup">
                <Card className="LoginCard" style={{ width: '18rem' }}>
                    <form onSubmit={handleSubmit}>
                        <h3>Create Profile</h3>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea className="form-control" placeholder="Tell us about yourself!"/>
                        </div>

                        <div className="form-group">
                            <label>Upload a Profile Picture</label>
                            <input type="file"/>
                        </div>
                        

                        <div className="form-group">
                            <label>First Name*:</label>
                            <input refs="email" type="text" required className="form-control" placeholder="Enter First Name" 
                            onChange={this.handleChange.bind(this, "firstname")} value={this.state.fields["firstname"]} />
                        </div>



                        <button className="btn btn-primary btn-block">Create</button>
                    </form>
                </Card>
            </div>
        );
    }
}
