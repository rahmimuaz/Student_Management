import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Home.css";

const Home = () => {
    const { setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        setToken(null); // Clear token from context
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="home">
            <p>Hello</p>
            <button onClick={handleSignOut} className="signout-btn">
                Sign Out
            </button>
        </div>
    );
};

export default Home;
