import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


// Pages
import Homepage from './components/pages/private/Homepage';
import AboutUs from './components/pages/private/AboutUs';
import Recipe from './components/pages/private/RecipePage';
import AdminPanel from '../src/admin/AdminPanel';
import RecipeForm from '../src/admin/RecipeForm';  // Import RecipeForm
import Login from './components/pages/public/Login';
import Signup from './components/pages/public/Signup';


function App() {

  return (
    <div className="App">

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/add" element={<RecipeForm isEditMode={false} />} />
        <Route path="/admin/edit/:id" element={<RecipeForm isEditMode={true} />} />
      </Routes>

    </div>
  );
}

export default App;
