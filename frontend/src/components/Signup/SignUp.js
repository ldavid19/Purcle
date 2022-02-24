import React, { Component } from "react";
import { Card } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


export default class SignUp extends Component {
    render() {
        return (
            <div className="SignUp">
                <Card className="SignUpCard" style={{ width: '18rem'}}>
                    <form>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Re-enter password" />
                        </div>
                        <button className="btn btn-primary btn-block">Sign Up</button>

                        <div>
                            <a href="/profilesetup">omggg</a>
                        </div>

                        <div className="forgot-password">
                            <p>
                                Already registered <a href="/">sign in?</a>
                            </p>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}