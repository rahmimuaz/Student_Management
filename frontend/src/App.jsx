import React, { useState, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import { StoreContext } from "./context/StoreContext";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const { token, setToken } = useContext(StoreContext);

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
      </Routes>
    </div>
  );
};

export default App;
