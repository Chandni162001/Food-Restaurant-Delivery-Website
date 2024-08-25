
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../config/Base_Url';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const validateName = () => {
        if (!name.trim()) {
            setNameError("Name cannot be empty.");
        } else if (name.trimStart().length < name.length) {
            setNameError("Name cannot start with spaces.");
        } else if (name.trim().length < 2) {
            setNameError("Name should be at least 2 characters long");
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            setNameError("Name should only contain letters and spaces");
        } else if (name.length > 20) {
            setNameError("Name should not exceed 20 characters");
        } else {
            setNameError('');
        }
    };

    const validateEmail = () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        if (!emailPattern.test(email)) {
            setEmailError("Valid Email is required.");
        } else if (email.trimStart().length < email.length) {
            setEmailError("Email cannot start with spaces.");
        } else {
            setEmailError('');
        }
    };

    const validatePhone = () => {
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(phone)) {
            setPhoneError("Valid Phone Number is required (10 digits).");
        } else if (phone.length > 10) {
            setPhoneError("Phone number cannot exceed 10 digits.");
        } else if (phone.trimStart().length < phone.length) {
            setPhoneError("Phone cannot start with spaces.");
        } else {
            setPhoneError('');
        }
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
        } else if (password.trimStart().length < password.length) {
            setPasswordError("Password cannot start with spaces.");
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError('');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.length <= 10) {
            setPhone(value);
        }
    };

    const validateForm = () => {
        if (nameError || phoneError || addressError || pincodeError) {
            toast.error('Please fix the errors in the form.');
            return;
        }
        validateName();
        validateEmail();
        validatePhone();
        validatePassword();
        validateConfirmPassword();

        return !(nameError || emailError || phoneError || passwordError || confirmPasswordError);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password: password.trim()
        };

        axios.post(`${BaseUrl}/api/user/register`, formData)
            .then((result) => {
                navigate('/login');
                toast.success("Registered Successfully");
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.message || "Registration failed.");
            });
    };

    const showPassword = () => {
        let passwordField = document.getElementById("pass");
        passwordField.type = passwordField.type === "password" ? "text" : "password";
    };

    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])
    return (
        <>
            <ToastContainer />

            <div className="createPage min-vh-100 px-2 p-md-5 d-flex justify-content-center align-items-center ">
                <div className="mt-md-4 col-12 col-md-6">
                    <div className="detailsBox container rounded bg-transparent p-2 px-md-4 py-md-3 ">
                        <form onSubmit={handleSubmit}>
                            <div className="formHeading mb-4 ">
                                <h1 className=' text-center'>CREATE NEW ACCOUNT</h1>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerName"
                                    placeholder='Full Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={validateName}
                                />
                                {nameError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {nameError}</small></div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="customerEmail"
                                    placeholder='Email address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={validateEmail}
                                />
                                 {emailError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {emailError}</small></div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customerPhone"
                                    placeholder='Phone Number'
                                    maxLength="10"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    onBlur={validatePhone}
                                />
                                {phoneError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {phoneError}</small></div>}
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="pass"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={validatePassword}
                                />
                                {passwordError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {passwordError}</small></div>}
                            </div>

                            <div className="form-check mb-2">
                                <input className="checkPointer form-check-input" type="checkbox" id="checkPassword" onClick={showPassword} />
                                <label className="form-check-label" htmlFor="checkPassword">
                                    Show Password
                                </label>
                            </div>
                            <div className="mb-5">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="repass"
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={validateConfirmPassword}
                                />
                                {confirmPasswordError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {confirmPasswordError}</small></div>}
                            </div>

                            <div className="buttonsDiv mb-2 d-flex">
                                <div className="d-flex gap-3">
                                    <button type="submit" className="btn btn-outline-primary">CREATE</button>
                                    <button type="reset" className="btn btn-secondary text-white" onClick={() => {
                                        setName('');
                                        setEmail('');
                                        setPhone('');
                                        setPassword('');
                                        setConfirmPassword('');
                                        setNameError('');
                                        setEmailError('');
                                        setPhoneError('');
                                        setPasswordError('');
                                        setConfirmPasswordError('');
                                    }}>RESET</button>
                                </div>

                                <div className="link ms-auto">
                                    <NavLink to="/login" className="link-hover">Already Have An Account ?</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAccount;
