import React, { Component } from "react";
import { Card } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            windows: {"error":false, "valid":false},
            errormsg: "",
            users: JSON.parse(localStorage.getItem('users')) || [],
            emails: JSON.parse(localStorage.getItem('emails')) || [],
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtInd = fields["email"].lastIndexOf("@");
            let lastDotInd = fields["email"].lastIndexOf(".");

            if (
                !(
                    lastAtInd < lastDotInd &&
                    lastAtInd > 0 &&
                    fields["email"].indexOf("@@") == -1 &&
                    lastDotInd > 2 &&
                    fields["email"].length - lastDotInd > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            } //TODO: check for uniqueness
            //else if (this.state.emails.findIndex(fields["email"]) !== -1) {
                //formIsValid = false;
                //errors["email"] = "Email is already in use"
            //}
        }

        //username
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Username cannot be empty";
        }

        if (typeof fields["username"] !== "undefined") {
            if (fields["username"].length < 1) {
                formIsValid = false;
                errors["username"] = "Username is too short";
            } else if (fields["username"].length > 20) {
                formIsValid = false;
                errors["username"] = "Username is too long";
            } else if (!/^([A-Za-z0-9\-_.]+)$/.test(fields["username"])) {
                formIsValid = false;
                errors["username"] = "Username contains invalid characters";
            } //TODO: check for uniqueness
            //else if (this.state.users.findIndex(fields["username"]) !== -1) {
                //formIsValid = false;
                //errors["username"] = "Username is already in use";
            //}
        }

        //password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
        }

        if (typeof fields["password"] !== "undefined") {
            if (fields["password"].length < 8) {
                formIsValid = false;
                errors["password"] = "Password is too short";
            } else if (fields["password"].length > 50) {
                formIsValid = false;
                errors["password"] = "Password is too long";
            } //TODO: handling special characters in passwords like escaped chars
        }

        if (!fields["confirm"]) {
            formIsValid = false;
            errors["comfirm"] = "Confirm password cannot be empty"
        }

        if (typeof fields["password"] !== "undefined" && typeof fields["confirm"] !== "undefined") {
            if (fields["password"] !== fields["confirm"]) {
                formIsValid = false;
                errors["confirm"] = "Passwords do not match";
            }
        }
        
        this.setState({ errors: errors }, 
            function() {
                let errors = this.state.errors;
                let errorStr = "";
                for (let error in errors) {
                    errorStr = errorStr + errors[error] + "\n";
                }

                if (errorStr !== "") {
                    alert(errorStr);
                }
            }
        );
        return formIsValid;
    }

    hitSubmit(e) {
        let errors = this.state.errors;
        e.preventDefault();

        if (this.handleValidation()) {
            alert("Form submitted");
            /*let emails = this.state.emails;
            let users = this.state.users;
            emails.push(this.state.fields["email"]);
            users.push(this.state.fields["username"]);
            this.setState({ emails: emails, users: users}, 
                function() {
                    localStorage.setItem('emails', JSON.stringify(this.state.emails));
                    localStorage.setItem('users', JSON.stringify(this.state.users));
                }
            );*/
            
            window.location.href = "/profilesetup";
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div className="SignUp">
                {/*<Modal show={this.state.windows["error"]} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body> this.state.errormsg </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>*/}
                <Card className="SignUpCard" style={{ width: '18rem'}}>
                    <form onSubmit={this.hitSubmit.bind(this)}>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input refs="email" type="email" className="form-control" placeholder="Enter email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input refs="username" type="text" className="form-control" placeholder="Enter username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input refs="password" type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input refs="confirm" type="password" className="form-control" placeholder="Re-enter password" onChange={this.handleChange.bind(this, "confirm")} value={this.state.fields["confirm"]} />
                        </div>
                        <button className="btn btn-primary btn-block">Sign Up</button>

                        <div className="forgot-password">
                            <p>
                                Already registered? <a href="/login">sign in</a>
                            </p>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}