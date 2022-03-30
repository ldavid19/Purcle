import './App.css';

import React from 'react';
import Home from "../src/components/Home/Home.js";
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';
import NavigationBar from './components/Navbar/NavigationBar';
import Profile from './components/Profile/Profile.js'
import PostPage from './components/Post/PostPage';
import ProfileSetup from './components/Profile/ProfileSetup';
import ErrorPage from './components/ErrorPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
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
            <Route path="/following" element={<Home/>}/>
            <Route path="/messages" element={<Home/>}/>
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/post/:id" element={<PostPage />}/>
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
