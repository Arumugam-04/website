import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from '../src/components/login';
import SignUp from '../src/components/signup';
import Home from './components/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;

