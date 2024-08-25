import React, { useState } from "react";
import table from "../assets/dishes-removebg.png";
import { BaseUrl } from "../config/Base_Url";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function BookTable() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');

    const validateForm = () => {
        const phonePattern = /^[6-9]\d{9}$/;

        if (!name || !numberOfPersons || !phone || !date || !time || !message) {
            toast.error("All fields are required.");
            return false;
        }

        if (!name.trim()) {
            toast.error("Name cannot be empty.");
            return false;
        } else if (name.trimStart().length < name.length) {
            toast.error("Name cannot start with spaces.");
            return false;
        } else if (name.trim().length < 2) {
            toast.error("Name should be at least 2 characters long");
            return false;
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            toast.error("Name should only contain letters and spaces");
            return false;
        } else if (name.length > 20) {
            toast.error("Name should not exceed 20 characters");
            return false;
        }

        if (!phonePattern.test(phone)) {
            toast.error("Valid Phone Number is required (10 digits) & phone number should start with 6,7,8 or 9");
            return false;
        } else if (phone.trimStart().length < phone.length) {
            toast.error("Phone cannot start with spaces.");
            return false;
        }

        if (!numberOfPersons || numberOfPersons === "0") {
            toast.error("Please select the number of persons.");
            return false;
        }

        return true;
    };

    const resetForm = () => {
        setName('');
        setPhone('');
        setNumberOfPersons('');
        setDate('');
        setTime('');
        setMessage('');
    }

    const handleBookTableForm = async (event) => {
        event.preventDefault(); // Prevent page reload on form submission

        if (!validateForm()) return;

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const formData = {userId, name, phone, numberOfPersons, date, time, message };

        try {
            await axios.post(`${BaseUrl}/api/user/bookTableForm`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            resetForm();
            toast.success('Thank you, your table is successfully booked!');
        } catch (err) {
            toast.error("Table booking failed!");
        }
    }

    return (
        <>
            <div className="booktablePage min-vh-100 d-flex justify-content-center align-items-center p-5">
                <div className="container booktable-form d-flex p-4 mt-5" style={{ width: '790px' }}>
                    <form className="ms-auto" onSubmit={handleBookTableForm}>
                        <div className="booktable-heading text-center text-white mb-4">
                            <h1 className="p-1">BOOK A TABLE</h1>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="full-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput"><small>Your Name</small></label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingContact"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <label htmlFor="floatingContact"><small>Phone </small></label>
                                </div>
                            </div>
                        </div>

                        <div className="row gx-3 gy-2 mb-3 align-items-center">
                            <div className="col-sm-4">
                                <label className="visually-hidden" htmlFor="specificSizeSelect">Preference</label>
                                <select
                                    className="form-select"
                                    id="specificSizeSelect"
                                    value={numberOfPersons}
                                    onChange={(e) => setNumberOfPersons(e.target.value)}
                                >
                                    <option value="0">Number Of Persons</option>
                                    <option value="1">1 Person</option>
                                    <option value="2">2 Persons</option>
                                    <option value="3">3 Persons</option>
                                    <option value="4">4 Persons</option>
                                    <option value="5">5 Persons</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <div>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-floating mb-4">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: "100px" }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <label htmlFor="floatingTextarea2"><small>Message</small></label>
                        </div>
                        <div className="d-flex gap-5 justify-content-between">
                            <button className="btn btn-sm btn-info text-white fw-bold" type="submit">
                                Confirm Your Reservation
                            </button>

                            <NavLink to='/contact'>
                            <button className="btn btn-outline-info text-white fw-bold" type="button">
                                Contact Us
                            </button>
                            </NavLink>
                        </div>
                    </form>

                    <img
                        src={table}
                        alt="table"
                        className="tableImg img-fluid rounded-5 z-5 position-absolute top-50 mt-4 p-1 translate-middle"
                    />
                </div>
            </div>
        </>
    );
}

export default BookTable;
