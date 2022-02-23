import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form, FormControl, Button } from "react-bootstrap";
import React from 'react';

import { useState } from "react";
import { Modal } from "react-bootstrap";

import { InputBase, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function NavigationBar() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" sticky="top" style={{padding: "10px 25px"}}>

      <Navbar.Brand as={Link} to={"/"}>Purcle</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to={"/following"}>Following</Nav.Link>
        <Nav.Link as={Link} to={"/messages"}>Messages</Nav.Link>
      </Nav>


      <Paper
        component="form"
        size="small"
        sx={{  display: 'flex', alignItems: 'center'}}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          size="small"
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Paper>


      <NavDropdown align="end" title="Profile" id="collasible-nav-dropdown" >
        <NavDropdown.Item as={Link} to={"/profile"}>Profile</NavDropdown.Item>
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
              <Button variant="primary" as={Link} to={"/login"}>
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