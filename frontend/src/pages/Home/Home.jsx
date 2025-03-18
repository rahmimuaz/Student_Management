import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentStoreContext } from "../../context/StudentStoreContext"; // Update the import to your StoreContext location
import "./Home.css";

const Home = () => {
    const { setToken } = useContext(StoreContext); // Make sure StoreContext is the correct one
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
