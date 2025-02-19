import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Recipe from './components/private/Recipe';
import Meal from './components/private/Meal';
import Homepage from './components/private/Homepage';
import Navbar from './components/private/Navbar';
import Footer from './components/private/Footer';
import Login from './components/public/Login';
import Signup from './components/public/Signup';
import AboutUs from './components/private/AboutUs';

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavAndFooter && <Navbar />}  {/* Show Navbar only if not on Login or Signup */}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/:recipeId" element={<Recipe />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      
      {!hideNavAndFooter && <Footer />}  {/* Show Footer only if not on Login or Signup */}
    </div>
  );
}

export default App;
