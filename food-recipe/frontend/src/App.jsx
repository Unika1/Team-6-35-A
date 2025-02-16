import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Recipe from './components/private/Recipe';
import Meal from './components/private/Meal';
import Homepage from './components/private/Homepage';
import Navbar from './components/private/Navbar';
import Footer from './components/private/Footer';
import Login from './components/public/Login';
import Signup from './components/public/Signup';
import AboutUs from './components/private/AboutUs';

function App() {
  return (
    <div>
      <Navbar />  {/* Global Navbar */}
      
      {/* Dynamic content */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/:recipeId" element={<Recipe />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/footer" element={<Contact />} /> */}
      </Routes>
      
      <Footer />  {/* Global Footer */}
    </div>
  );
}

export default App;
