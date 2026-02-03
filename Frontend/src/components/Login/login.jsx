// components/Login/login.jsx - UPDATED VERSION
import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import './login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Login = ({ setShowLogin, setShowForgotPassword }) => {
  const {url, setToken} = useContext(StoreContext)
  
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(currState === "Login" ? "Logged In Successfully" : "Account Created");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("Something went wrong. Check your connection.");
    }
  };

  const handleForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
            className="close-icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input 
              name='name' 
              onChange={onChangeHandler} 
              value={data.name} 
              type="text" 
              placeholder="Your name" 
              required 
            />
          )}
          <input 
            name='email' 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder="Your email" 
            required 
          />
          <input 
            name='password' 
            onChange={onChangeHandler} 
            value={data.password} 
            type="password" 
            placeholder="Password" 
            required 
          />
        </div>

        {/* NEW: Forgot Password Link */}
        {currState === "Login" && (
          <div className="forgot-password-link">
            <span onClick={handleForgotPassword}>Forgot Password?</span>
          </div>
        )}

        <button type="submit" className="login-btn">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">By continuing, I agree to the terms of use & privacy policy</label>
        </div>
        <p className="toggle-auth">
          {currState === "Login" 
            ? "Create a new account? " 
            : "Already have an account? "}
          <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
            {currState === "Login" ? "Click here" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;