import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form, FormControl, Button } from "react-bootstrap";

import React, { useState, useEffect } from 'react';

import { getRandPosts, getUser, updateUser, getCurrUser } from '../../api/apiRequest.js';
import { formatUser, unformatUser } from '../../api/helper';

import { Modal } from "react-bootstrap";

import { logout } from '../../api/apiRequest.js';

import { InputBase, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

import Search from "./Search";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const defaultOptions = [];
for (let i = 0; i < 10; i++) {
  defaultOptions.push(`option ${i}`);
  defaultOptions.push(`suggesstion ${i}`);
  defaultOptions.push(`advice ${i}`);
}

function NavigationBar() {

  const [show, setShow] = useState(false);
  const [uid, setUID] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    await logout(localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    window.location.href = "/login";
  }

  const getLink = () => {
    return "profile/" + uid;
  }

  useEffect(() => {
    getCurrUser().then(res => {
      console.log(res)
      const curr = res.curr_user;
      setUID(curr);
    }).catch(err => console.error(`Error: ${err}`));
}, []);

  const [options, setOptions] = useState([]);
  const onInputChange = (event) => {
    setOptions(
      defaultOptions.filter((option) => option.includes(event.target.value))
    );
  };


  return (
    <Navbar bg="dark" variant="dark" sticky="top" style={{padding: "10px 25px", overflow: "visible", maxHeight:"60px"}}>

      <Navbar.Brand as={Link} to={"/"}>Purcle</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to={"/topic"}>Following</Nav.Link>
        <Nav.Link as={Link} to={"/messages"}>Messages</Nav.Link>
      </Nav>


      <Search options={options} onInputChange={onInputChange}/>


      <NavDropdown align="end" title="Profile" id="collasible-nav-dropdown" >
        <NavDropdown.Item as={Link} to={getLink()}>Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">Followed Users</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Followed Topics</NavDropdown.Item>

        <NavDropdown.Divider />
        <>
          <Button variant="danger" onClick={handleShow}>
            Logout
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="primary" onClick={handleLogout}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </NavDropdown>

    </Navbar>

  );
}

export default NavigationBar;