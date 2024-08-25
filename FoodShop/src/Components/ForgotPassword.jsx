
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateEmail();

        if (emailError) {
            toast.error(emailError);
            return;
        }

        try {
            const res = await axios.post(`${BaseUrl}/api/user/forgotPassword`, { email });

            if (res.data.Status === 'Success') {
                toast.success('OTP has been sent to your email address');
                navigate('/resetPassword');
            } else if (res.data.Status === 404) {
                toast.error('User not found.');
            } else {
                toast.error('Failed to send reset email.');
            }
        } catch (err) {
            toast.error('Forgot-Password request failed.');
            console.error('Forgot-Password request failed.', err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary-subtle vh-100">
            <div className="bg-white shadow p-3 rounded">
                <h4 className="text-primary">Forgot Password</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            autoComplete="off"
                            name="email"
                            className="form-control border-dark"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                        />
                        {emailError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {emailError}</small></div>}
                    </div>
                    <div className="text-center d-flex justify-content-end mb-3">
                        <button type="submit" className="btn btn-sm btn-outline-primary rounded">
                            Get OTP
                        </button>
                    </div>
                    <div className="link">
                        <NavLink to="/login" className="link-hover">
                            <i className="bi bi-box-arrow-in-left"> </i> Login
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
