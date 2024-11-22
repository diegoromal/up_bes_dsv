import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
    </Router>
  );
}
