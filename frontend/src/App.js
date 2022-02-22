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
            <Route path="/profile" element={<Home/>}/>
          </Route>
          
          {/* Put pages without navbar here */}
          <Route path="/signup" element={<SignUp/>}/>
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
