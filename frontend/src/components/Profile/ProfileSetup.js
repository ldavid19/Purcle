import React, { Component } from "react";
import { Card } from "react-bootstrap";

const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = "/";
}

export default class ProfileSetup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            windows: {"error":false, "valid":false},
            errormsg: "",
            // users: JSON.parse(localStorage.getItem('users')) || [],
            // emails: JSON.parse(localStorage.getItem('emails')) || [],
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //bio
        if (typeof fields["bio"] !== "undefined") {
            if (fields["bio"].length > 500) {
                formIsValid = false;
                errors["bio"] = "First Name is too long";
            } 
        }


        //first + last name
        if (!fields["firstname"]) {
            formIsValid = false;
            errors["firstname"] = "First Name cannot be empty";
        }

        if (typeof fields["firstname"] !== "undefined") {
            if (fields["firstname"].length < 1) {
                formIsValid = false;
                errors["firstname"] = "First Name is too short";
            } else if (fields["firstname"].length > 30) {
                formIsValid = false;
                errors["firstname"] = "First Name is too long";
            } else if (!/^([A-Za-z0-9\-_.]+)$/.test(fields["firstname"])) {
                formIsValid = false;
                errors["firstname"] = "First Name contains invalid characters";
            }
        }

        if (!fields["lastname"]) {
            formIsValid = false;
            errors["lastname"] = "Last Name cannot be empty";
        }

        if (typeof fields["lastname"] !== "undefined") {
            if (fields["lastname"].length < 1) {
                formIsValid = false;
                errors["lastname"] = "Last Name is too short";
            } else if (fields["lastname"].length > 30) {
                formIsValid = false;
                errors["lastname"] = "Last Name is too long";
            } else if (!/^([A-Za-z0-9\-_.]+)$/.test(fields["firstname"])) {
                formIsValid = false;
                errors["lastname"] = "Last Name contains invalid characters";
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


    render() {
        return (
            <div className="ProfileSetup">
                <Card className="LoginCard" style={{ width: '18rem' }}>
                    <form onSubmit={handleSubmit}>
                        <h3>Create Profile</h3>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea refs="bio" type="text" className="form-control" placeholder="Tell us about yourself!" 
                            onChange={this.handleChange.bind(this, "bio")} value={this.state.fields["bio"]} />
                            {/* <textarea className="form-control" placeholder="Tell us about yourself!"/> */}
                        </div>

                        <div className="form-group">
                            <label>Upload a Profile Picture</label>
                            <input refs="profilepic" type="file" required className="form-control" 
                            onChange={this.handleChange.bind(this, "profilepic")} value={this.state.fields["profilepic"]} />
                            {/* <input type="file"/> */}
                        </div>
                        

                        <div className="form-group">
                            <label>First Name*:</label>
                            <input refs="firstname" type="text" required className="form-control" placeholder="Enter First Name" 
                            onChange={this.handleChange.bind(this, "firstname")} value={this.state.fields["firstname"]} />
                        </div>

                        <div className="form-group">
                            <label>Last Name*:</label>
                            <input refs="lastname" type="text" required className="form-control" placeholder="Enter Last Name" 
                            onChange={this.handleChange.bind(this, "lastname")} value={this.state.fields["lastname"]} />
                        </div>





                        <button className="btn btn-primary btn-block">Create</button>
                    </form>
                </Card>
            </div>
        );
    }
}
