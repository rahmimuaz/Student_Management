import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Login = () => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrentState] = useState("Login");
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate(); // Initialize useNavigate

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        if (!data.email || !data.password || (currState === "Sign Up" && !data.name)) {
            alert("Please fill in all fields");
            return;
        }

        let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
        try {
            const response = await axios.post(`${url}${endpoint}`, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);

                if (currState === "Sign Up") {
                    localStorage.setItem("name", data.name);
                } else if (response.data.user) {
                    localStorage.setItem("name", response.data.user.name);
                }

                localStorage.setItem("email", data.email);

                // Redirect to Home page on successful login
                navigate("/home"); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={onLogin} className="login-form">
                <div className="login-form-header">
                    <h2>{currState}</h2>
                </div>
                <div className="login-form-body">
                    {currState === "Sign Up" && (
                        <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
                    )}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
                </div>
                <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

                {currState === "Sign Up" && (
                    <div className="login-form-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use and privacy policy</p>
                    </div>
                )}

                {currState === "Login" ? (
                    <p>
                        Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
