import './App.css';
import React from 'react';
import Home from "../src/components/Home/Home.js";
import SignUp from './components/Signup/SignUp';
import NavigationBar from './components/Navbar/NavigationBar';
import Profile from './components/Profile/Profile.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />

        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>

        <Routes>
          <Route exact path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
