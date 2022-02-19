import { Container, Row } from 'react-bootstrap';
import React, { Component }  from 'react';
import NavigationBar from "../Navbar/NavigationBar.js";
import Body from "./Body.js";

import PostCardItem from "../Post/PostCardItem.js";

function Home() {
  return (
    <Container fluid>
        <Row>
          <NavigationBar />
        </Row>
        <Row>
          <Body/>
        </Row>
      </Container>
    );
}

export default Home;
