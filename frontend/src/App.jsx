import React, { useState, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import { StudentStoreContext } from "./context/StudentStoreContext";
import "bootstrap/dist/css/bootstrap.css";

import StudentList from "./pages/Student/StudentList";
import AddStudent from "./pages/Student/AddStudent";
import EditStudent from "./pages/Student/EditStudent";

const App = () => {
  const { token, setToken } = useContext(StudentStoreContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <div className="app">
      <Routes>
        {/* Redirect to login if no token */}
        <Route path="/" element={ < Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
};

export default App;
