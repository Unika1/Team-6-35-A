import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/public/Login';
import Signup from './components/public/Signup';
import Navbar from './components/private/Navbar';
import Content from './components/private/Content';
import Footer from './components/private/Footer';
import AboutUs from './components/private/AboutUs';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/content" element={<Content />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  );
}
export default App;