import React, { Component } from "react";
import { Card, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { postUser } from '../../api/apiRequest.js';

import { Button } from '@mui/material';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            windows: { "error": false, "valid": false },
            errorArr: [],
            showModal: false
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //email
        if (!fields["email"]) {
            //formIsValid = false;
            errors["email"] = "Email cannot be empty.";
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
                //formIsValid = false;
                errors["email"] = "Email is not valid.";
            } //TODO: check for uniqueness
        }

        //username
        if (!fields["username"]) {
            //formIsValid = false;
            errors["username"] = "Username cannot be empty.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (fields["username"].length < 1) {
                //formIsValid = false;
                errors["username"] = "Username is too short.";
            } else if (fields["username"].length > 20) {
                //formIsValid = false;
                errors["username"] = "Username is too long.";
            } else if (!/^([A-Za-z0-9\-_.]+)$/.test(fields["username"])) {
                //formIsValid = false;
                errors["username"] = "Username contains invalid characters.";
            } //TODO: check for uniqueness
        }

        //password
        if (!fields["password"]) {
            //formIsValid = false;
            errors["password"] = "Password cannot be empty.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (fields["password"].length < 8) {
                //formIsValid = false;
                errors["password"] = "Password is too short.";
            } else if (fields["password"].length > 50) {
                //formIsValid = false;
                errors["password"] = "Password is too long.";
            } //TODO: handling special characters in passwords like escaped chars
        }

        if (!fields["confirm"]) {
            //formIsValid = false;
            errors["comfirm"] = "Confirm password cannot be empty."
        }

        if (typeof fields["password"] !== "undefined" && typeof fields["confirm"] !== "undefined") {
            if (fields["password"] !== fields["confirm"]) {
                //formIsValid = false;
                errors["confirm"] = "Passwords do not match.";
            }
        }

        this.setState({ errors: errors },
            async function () {
                let errors = this.state.errors;
                let fields = this.state.fields;
                let errorArr = [];

                for (let error in errors) {
                    errorArr.push(errors[error]);
                }

                console.log("frontend verification\n");

                if (errorArr.length === 0) {
                    const data = {
                        email: fields["email"],
                        username: fields["username"],
                        password1: fields["password"],
                        password2: fields["confirm"]
                    }
                    const ret = await postUser(data);

                    console.log(ret);

                    for (let error in ret) {
                        if (ret[error] !== "This field may not be blank.") {
                            errorArr.push(ret[error]);
                        }
                    }
                    console.log("backend verification\n")
                    console.log(ret);
                }

                if (errorArr.length !== 0) {
                    //alert(errorStr);
                    this.setState({errorArr: errorArr});
                    this.handleShow();
                    formIsValid = false;
                } else {
                    //alert("Form submitted");
                    window.location.href = "/profilesetup";
                }
            }
        );

        console.log(formIsValid + "\n");
        return formIsValid;
    }

    hitSubmit(e) {
        //let fields = this.state.fields;
        e.preventDefault();

        this.handleValidation();
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    /* modal helper functions */
    handleShow = () => {
        /*this.setState({ errormsg: errorMsg });*/
        this.setState({ showModal: true });
    }

    handleClose = () => {
        this.setState({ showModal: false });
    }


    AlertModal = () => {
        let errorList = this.state.errorArr;

        console.log(errorList);

        return (
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {errorList.map((error) => (
                        <p>{error}</p>
                    ))}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={this.handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return (
            <div className="SignUp">
                <this.AlertModal />
                <Card className="SignUpCard" style={{ width: '18rem' }}>
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