import { Container, Row, Image } from 'react-bootstrap';
import React from 'react';

import { Button } from '@mui/material';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";

function ErrorPage() {
    const image = "https://i.imgur.com/qhMbkGi.jpg";

    return (
        <Container>
            <Row>
                <h1>ERROR: page not found</h1>
            </Row>

            <Row style={{justifyContent:"center"}}>
                <Image
                    src={image}
                    style={{
                        height:"300px",
                        width:"300px"
                    }}
                />
            </Row>

            <Row>
                <Link to="/">
                    <Button>
                        Home
                    </Button>
                </Link>
            </Row>
        </Container>
    );
}

export default ErrorPage;