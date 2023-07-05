import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserDetails } from "../Userdetails/UserDetails";
export const UserProfile = () => {
  const { userId } = useParams();

  const [userDetail, setUserDetails] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .post(
        "https://socialchidiyabackendserver.onrender.com/userProfile",
        {
          userId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setUserDetails(response.data.userDetail);
        setCurrentUser(response.data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true)
      })
      .catch((err) => {
        if (err.response.data === "Invalid token") {
          window.localStorage.clear();
        }
        setIsLoggedIn(false);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profilePage">
      {isLoading ? (
        <span className="loader">
          <div className="profile-main-loader">
            <div className="loader">
              <svg className="circular-loader" viewBox="25 25 50 50">
                <circle
                  className="loader-path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#70c542"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </span>
      ) : (

        isLoggedIn ? <UserDetails
          userDetail={userDetail}
          edit={false}
          currentUser={currentUser}
        /> : <div className="LoggedInError">
          <h1>You are not Logged in you have to login first</h1>
          <Link to="/login" className="loginBtn postPageLoginBtn">
            Login
          </Link>
        </div>

      )}
    </div>
  );
};
