
import React, { useState } from "react";
import forgotPassword from "../assets/forgot-password (1).png";
import { NavLink, useNavigate } from "react-router-dom";
import { BaseUrl } from "../config/Base_Url";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailPattern.test(email)) {
      setEmailError("Valid Email is required.");
    } else if (email.trimStart().length < email.length) {
      setEmailError("Email cannot start with spaces.");
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (password.trimStart().length < password.length) {
      setPasswordError("Password cannot start with spaces.");
    } else {
      setPasswordError('');
    }
  };

  const validateForm = () => {
    validateEmail();
    validatePassword();

    return !(emailError || passwordError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios.post(`${BaseUrl}/api/user/login`, { email, password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userId", decodedToken.userId);

        if (decodedToken.role === "admin") {
          navigate("/*");
          window.location.reload();
          toast.success("You are successfully logged-in.");
        } else if (decodedToken.role === "user") {
          navigate("/");
          window.location.reload();
          toast.success("You are successfully logged-in.");
        } else {
          console.error("Invalid role received from server");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setPasswordError("Wrong password. Please try again.");
          toast.error("Invalid credentials");
        } else {
          toast.error("Error during login: " + error.message);
        }
      });
  };

  const showPassword = () => {
    let password = document.getElementById("customerPassword");
    let checkbox = document.getElementById("checkPassword");
    if (checkbox.checked === true) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <>
      <div className="loginPage min-vh-100 p-3 p-md-5 d-flex justify-content-center align-items-center">
        <div className="mb-5 col-12 col-md-6">
          <div className="detailsBox border border rounded bg-transparent p-md-4 p-2">
            <form onSubmit={handleSubmit}>
              <div className="formHeading mb-4">
                <h1 className="text-center">LOGIN</h1>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="customerEmail"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {emailError}</small></div>}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="customerPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
                {passwordError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {passwordError}</small></div>}
              </div>

              <div className="d-flex justify-content-between mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkPassword"
                    onClick={showPassword}
                  />
                  <label className="form-check-label" htmlFor="checkPassword">
                    Show Password
                  </label>
                </div>

                <div className="forgotDetail">
                  <NavLink className="forgot text-dark" to="/forgotPassword">
                    Forgot Password
                    <img
                      src={forgotPassword}
                      alt="forgot-password"
                      height="30px"
                      width="30px"
                      className="text-dark"
                    />
                  </NavLink>
                </div>
              </div>

              <div className="buttonsDiv d-flex">
                <div className="d-flex gap-3">
                  <button type="submit" className="btn btn-info">
                    LOGIN
                  </button>

                  <button type="reset" className="btn btn-secondary" onClick={() => {
                    setEmail('');
                    setPassword('');
                    setEmailError('');
                    setPasswordError('');
                  }}>
                    RESET
                  </button>
                </div>

                <div className="link ms-auto">
                  <NavLink to="/register" className="link-hover text-dark">
                    Don't Have An Account?
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

