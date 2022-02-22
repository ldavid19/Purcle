import { Container, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import NavigationBar from "../Navbar/NavigationBar.js";
import Body from "./Body.js";

import PostCardItem from "../Post/PostCardItem.js";



function Home() {
  return (
    <div className='Home'>
      <Body/>
    </div>
  );
}

export default Home;
