import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import Homepage from "./components/pages/private/Homepage";
import AboutUs from "./components/pages/private/AboutUs";
import Recipe from "./components/pages/private/RecipePage";
import AdminPanel from "../src/admin/AdminPanel";
import RecipeForm from "../src/admin/RecipeForm";
import Login from "./components/pages/public/Login";
import Signup from "./components/pages/public/Signup";

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />; 
  if (roleRequired && userRole !== roleRequired) return <Navigate to="/home" replace />;

  return children;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<PrivateRoute><Homepage /></PrivateRoute>} />
        <Route path="/recipe/:id" element={<PrivateRoute><Recipe /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><AboutUs /></PrivateRoute>} />

        <Route path="/admin" element={<PrivateRoute roleRequired="admin"><AdminPanel /></PrivateRoute>} />
        <Route path="/admin/add" element={<PrivateRoute roleRequired="admin"><RecipeForm isEditMode={false} /></PrivateRoute>} />
        <Route path="/admin/edit/:id" element={<PrivateRoute roleRequired="admin"><RecipeForm isEditMode={true} /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
