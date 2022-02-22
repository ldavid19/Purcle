import './App.css';
import React from 'react';
import Home from "../src/components/Home/Home.js";
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';
import NavigationBar from './components/Navbar/NavigationBar';


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

      </Router>
    </div>
  );
}

export default App;
