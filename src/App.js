import React from "react";
import BlogPlatform from "./components/Blog/BlogPlatform";
import Register from "./components/Auth/Register/RegisterForm";
import Login from "./components/Auth/Login/LoginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<BlogPlatform />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
