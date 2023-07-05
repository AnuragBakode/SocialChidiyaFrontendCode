import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { EnterEmail } from "./EnterEmail";
import { VerifyOTP } from "./VerifyOTP";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleOTPFieldChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    axios
      .post("https://socialchidiyabackendserver.onrender.com/register", {
        name: username,
        email,
        password,
        otp,
      })
      .then((response) => {
        // navigate("/login");
        // After registration we need to sent it to set Up your account Page
        // So we logged in the user and then after lohhin in we sent to setup your profile
        // So that we can have user data to set the account
        axios
          .post("/login", {
            email,
            password,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLoggedIn", response.data.isLoggedIn);
            localStorage.setItem(
              "profilePicture",
              response.data.profilePicture
            );
            navigate("/posts", {
              state: { message: "Account Registered Successfully" },
            });
          })
          .catch((err) => console.log(err.response.data));
      })
      .catch((err) => {
        console.log(err);
        function notify(message) {
          toast.error(message, {
            theme: "dark",
          });
        }

        notify(err.response.data);
      });
  };

  return (
    <div className="register">
      {/* <ToastContainer /> */}
      <h1 className="text">
        <img src={process.env.PUBLIC_URL + "/fifth.jpg"} alt="" />
        <img src={process.env.PUBLIC_URL + "/fourth.jpg"} alt="" />
      </h1>
      <div className="form">
        {showVerifyOTP ? (
          <VerifyOTP
            otp={otp}
            handleOTPFieldChange={handleOTPFieldChange}
            handleVerifyOtp={handleVerifyOtp}
          />
        ) : (
          <EnterEmail
            setShowVerifyOTP={setShowVerifyOTP}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )}
      </div>
    </div>
  );
};
