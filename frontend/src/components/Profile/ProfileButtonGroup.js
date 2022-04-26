import { Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

import { Button, ButtonGroup } from '@mui/material';

function ProfileButtonGroup(props) {
    return (
        <Col>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                <Button variant={props.type == "Posts" ? "contained" : "outlined"}
                    onClick={() => {
                        props.setType("Posts");
                    }}
                >
                    Posts
                </Button>
                
                <Button variant={props.type == "Comments" ? "contained" : "outlined"}
                    onClick={() => {
                        props.setType("Comments");
                    }}
                >
                    Comments
                </Button>

                <Button variant={props.type == "Reactions" ? "contained" : "outlined"}
                    onClick={() => {
                        props.setType("Reactions");
                    }}
                >
                    Reactions
                </Button>

            </ButtonGroup>
        </Col> 
    )
}

export default ProfileButtonGroup;