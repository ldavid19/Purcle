import React, { Component } from "react";
import { Card } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

export default class Login extends Component {
    render() {
        return (
            <div className="Login">
                <Card className="LoginCard" style={{ width: '18rem'}}>
                    <form>
                        <h3>Login</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <form action="/">
                            <input type="submit" className="btn btn-primary btn-block" value="Login"/>
                        </form>
                        <div className="forgot-password">
                            <p>
                                <a href="#">Forgot Password?</a>
                            </p>
                        </div>

                        <div className="signup">
                            <p>
                                No account? <a href="/signup">Sign Up here</a>
                            </p>
                        </div>
                        
                    </form>
                </Card>
            </div>
        );
    }
}