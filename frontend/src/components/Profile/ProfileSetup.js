import React, { Component } from "react";
import { Card } from "react-bootstrap";


export default class ProfileSetup extends Component {
    render() {
        return (
            <div className="ProfileSetup">
                <Card className="LoginCard" style={{ width: '18rem' }}>
                    <form>
                        <h3>Create Profile</h3>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea className="form-control" placeholder="Tell us about yourself!"/>
                        </div>

                        <div className="form-group">
                            <label>Upload a Profile Picture</label>
                            <input type="file"/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Create</button>
                    </form>
                </Card>
            </div>
        );
    }
}
