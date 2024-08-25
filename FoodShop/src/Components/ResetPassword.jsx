
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../config/Base_Url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    if (!email) {
      setEmailError('Email is required.');
    } else if (!emailPattern.test(email)) {
      setEmailError('Valid Email is required.');
    } else if (email.trimStart().length < email.length) {
      setEmailError('Email cannot start with spaces.');
    } else {
      setEmailError('');
    }
  };

  const validateOtp = () => {
    const otpPattern = /^\d{6}$/;
    if (!otp) {
      setOtpError('OTP is required.');
    } else if (!otpPattern.test(otp)) {
      setOtpError('OTP must be exactly 6 numeric digits.');
    } else {
      setOtpError('');
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
        setOtp(value);
    }
};

  const validatePassword = () => {
    if (!newPassword) {
      setPasswordError('Password is required.');
    } else if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (newPassword.trimStart().length < newPassword.length) {
      setPasswordError('Password cannot start with spaces.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validateOtp();
    validatePassword();

    if (emailError || otpError || passwordError) {
      toast.error('Please fix the errors in the form.');
      return;
    }
    axios.post(`${BaseUrl}/api/user/resetPassword`, { email, otp, newPassword })
      .then(res => {
        if (response.data.Status === 200) {
          toast.success('Password updated successfully!');
          navigate('/login');
      } else if (response.data.Status === 400) {
          toast.error(response.data.Message || 'Invalid OTP or expired OTP');
      } else if (response.data.Status === 404) {
          toast.error(response.data.Message || 'User not found');
      } else {
          toast.error('Unknown error occurred. Please try again.');
      }
  } )
      .catch(err => {
        toast.error('Cannot update password. Please try again.');
      });
  };

  const showPassword = () => {
    let password = document.getElementById("pass");
    let checkbox = document.getElementById("checkPassword");
    if (checkbox.checked === true) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary-subtle vh-100">
      <div className="bg-white shadow p-3 rounded  mt-5">
        <h4 className='text-primary'>Reset Password</h4>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className='mb-2'>
              Email Address :
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
          <div className="mb-3">
            <label htmlFor="otp" className='mb-2'>
              OTP :
            </label>
            <input
              type="number"
              placeholder="Enter OTP"
              autoComplete="off"
              name="otp"
              className="form-control border-dark"
              value={otp}
              onChange={handleOtpChange}
              onBlur={validateOtp}
            />
            {otpError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {otpError}</small></div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className='mb-2'>
              New Password :
            </label>
            <input
              type="password"
              placeholder="Enter new Password"
              autoComplete="off"
              name="password"
              className="form-control border-dark"
              id='pass'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {passwordError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {passwordError}</small></div>}
          </div>

          <small className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="checkPassword" onClick={showPassword} />
            <label className="form-check-label" htmlFor="checkPassword">
              Show Password 
            </label>
          </small>

          <div className="text-center d-flex justify-content-end mb-2">
            <button type="submit" className="btn btn-sm btn-outline-primary rounded">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
