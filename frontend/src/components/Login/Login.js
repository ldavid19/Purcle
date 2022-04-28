import React, { Component } from "react";
import { Card, Modal } from "react-bootstrap";
import { login } from '../../api/apiRequest.js';
import { Button } from '@mui/material';

export default class Login extends Component {
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

        //username
        if (!fields["username"]) {
            //formIsValid = false;
            errors["username"] = "Username cannot be empty.";
        }

        //password
        if (!fields["password"]) {
            //formIsValid = false;
            errors["password"] = "Password cannot be empty.";
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
                let token = await login(fields["username"], fields["password"]);

                if (errorArr.length === 0) {
                    for (let error in token) {
                        if (error === "non_field_errors") {
                            errorArr.push("Invalid login credentials.")
                            break;
                        }
                    }

                    console.log("backend verification\n");
                    console.log(token);
                }

                if (errorArr.length !== 0) {
                    //alert(errorStr);
                    this.setState({errorArr: errorArr});
                    this.handleShow();
                    formIsValid = false;
                } else {
                    localStorage.setItem("token", token["token"]);
                    console.log(localStorage.getItem("token"));
                    window.location.href = "/";
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
            <div className="Login">
                <this.AlertModal />
                <Card className="LoginCard" style={{ width: '18rem'}}>
                    <form onSubmit={this.hitSubmit.bind(this)}>
                        <h3>Login</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter username" onChange={this.handleChange.bind(this, "username")} value={this.state.fields["username"]}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>
                        </div>
                        <button className="btn btn-primary btn-block">Log In</button>
                        {/* <div className="forgot-password">
                            <p>
                                <a href="#">Forgot Password?</a>
                            </p>
                        </div> */}

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