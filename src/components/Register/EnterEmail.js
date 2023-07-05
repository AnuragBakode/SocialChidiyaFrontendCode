import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EnterEmail = ({
  setShowVerifyOTP,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const requestForOtp = () => {
    axios
      .post("https://socialchidiyabackendserver.onrender.com/sendOTP", {
        name: username,
        email,
        password,
      })
      .then((response) => {
        toast.success("OTP has been sent !", {
          theme: "dark",
        });
        setShowVerifyOTP(true);
      })
      .catch((err) => {
        function notify(message) {
          toast.error(message, {
            theme: "dark",
          });
        }

        console.log(err.response.data);
        notify(err.response.data);
      });
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <h3 className="formHeader">Enter the following details</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        name="username"
        placeholder="Enter your username"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        name="email"
        placeholder="Enter your email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name="password"
        placeholder="Enter your password"
      />
      <p>
        Already have an account ? <Link to="/login">Login</Link>
      </p>
      <button onClick={requestForOtp}>Register</button>
    </>
  );
};
