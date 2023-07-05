import React, { useState } from "react";
import { axios } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const isLoggedIn = localStorage.getItem("isLoggedIn") || null;

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    axios
      .post("https://socialchidiyabackendserver.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", response.data.isLoggedIn);
        localStorage.setItem("profilePicture", response.data.profilePicture);
        navigate("/posts", { state: { message: "LoggedIn Successfully" } });
      })
      .catch((err) => {
        function notify(message) {
          toast.error(message, {
            theme: "dark",
          });
        }

        notify(err.response.data);
      });
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="login">
          <div className="text">
            <img
              src={process.env.PUBLIC_URL + "/fifth.jpg"}
              alt="fifth"
              loading="lazy"
            />
            <img
              src={process.env.PUBLIC_URL + "/fourth.jpg"}
              alt="fourth"
              loading="lazy"
            />
          </div>

          <div className="form">
            <h3 className="formHeader">Enter your credentials</h3>

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
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <button onClick={handleRegisterClick}>Login</button>
          </div>
        </div>
      ) : (
        <div className="LoggedInError">
          <h1>A user is Already Logged In</h1>
          <h1>You still want to login with a different Account </h1>
          <h1>You have to logout first</h1>
        </div>
      )}
    </>
  );
};
