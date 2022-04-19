import './App.css';

import React from 'react';
import Home from "../src/components/Home/Home.js";
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';
import NavigationBar from './components/Navbar/NavigationBar';
import Profile from './components/Profile/Profile.js'
import Topic from './components/Home/Topic';
import PostPage from './components/Post/PostPage';
import ProfileSetup from './components/Profile/ProfileSetup';
import ErrorPage from './components/ErrorPage';


import Inbox from './components/Messaging/Inbox';
import ThreadView from './components/Messaging/ThreadView'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          {/* Put pages with navbar here */}
          <Route path="/" element={<LayoutsWithNavbar />}>
            <Route path="/" element={<Home/>}/>
            <Route path="/topic" element={<Topic />}/>
            <Route path="/messages" element={<Home/>}/>
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/topic/:id" element={<Topic />}/>
            <Route path="/post/:id" element={<PostPage />}/>
            <Route path="/inbox" element={<Inbox />}/>
            <Route path="/inbox/:id" element={<ThreadView />}/>
            <Route path="*" element={<ErrorPage />}/>
            <Route path="/*/*" element={<ErrorPage />}/>
          </Route>
          
          {/* Put pages without navbar here */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profilesetup" element={<ProfileSetup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

function LayoutsWithNavbar() {
  return (
    <>
      <NavigationBar />
      <Outlet /> 
    </>
  );
}

export default App;
