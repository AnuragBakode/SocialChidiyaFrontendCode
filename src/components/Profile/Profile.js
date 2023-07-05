import React, { useState, useEffect } from "react";
import "./Profile.css";
import { UserDetails } from "../Userdetails/UserDetails";
import { Link } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import axios from "axios";

export const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [userDetail, setUserDetail] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [render, setRender] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEditrofileCloseButton = () => {
    setShowEditProfile(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get("https://socialchidiyabackendserver.onrender.com/profile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserDetail(response.data.profileUser);
        setCurrentUser(response.data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        if (err.response.data === "Invalid token") {
          window.localStorage.clear();
        }
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  };

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
      ) : isLoggedIn ? (
        <UserDetails
          setShowEditProfile={setShowEditProfile}
          userDetail={userDetail}
          edit={true}
          currentUser={currentUser}
          fetchUserData={fetchUserData}
          render={render}
          setRender={setRender}
        />
      ) : (
        <div className="LoggedInError">
          <h1>You are not Logged in you have to login first</h1>
          <Link to="/login" className="loginBtn postPageLoginBtn">
            Login
          </Link>
        </div>
      )}
      {showEditProfile ? (
        <>
          <div className="backdrop"></div>
          <h1
            className="EditProfileCloseButton"
            onClick={handleEditrofileCloseButton}
          >
            X
          </h1>
          <EditProfile
            setShowEditProfile={setShowEditProfile}
            userDetail={userDetail}
            fetchUserData={fetchUserData}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};
