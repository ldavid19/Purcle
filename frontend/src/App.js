import './App.css';
import React from 'react';
import Home from "../src/components/Home/Home.js";
import SignUp from './components/Signup/SignUp';
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
<<<<<<< HEAD
      <SignUp/>
=======
      <Router>
        <NavigationBar />

        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>

      </Router>
>>>>>>> main
    </div>
  );
}

export default App;
