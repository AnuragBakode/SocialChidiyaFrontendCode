import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Navbar = () => {
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userDataForWebPage, setUserDataForWebPage] = useState([]);

  useEffect(() => {
    setUsersDataForSearch();
  }, []);

  const setUsersDataForSearch = () => {
    axios
      .get("https://socialchidiyabackendserver.onrender.com/navbarUserData", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserData(response.data.allUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const profilePicture = localStorage.getItem("profilePicture");

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleProfileBtnClick = () => {
    navigate("/profile");
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setUserDataForWebPage([]);
    if (e.target.value === "") { setUserDataForWebPage([]); return; }
    /*eslint array-callback-return: */
    const filterBySearch = userData.filter((item) => {
      if (item.name.toLowerCase()
        .startsWith(e.target.value.toLowerCase())) { return item; }

    })
    setUserDataForWebPage(filterBySearch)
  };

  const handleSearchedUserClick = (userid) => {
    setUserDataForWebPage([]);
    setSearchInput("");
    navigate(`/user/${userid}`);
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="logo"> <img style={{ width: "25px" }} src={process.env.PUBLIC_URL + '/dove.png'} alt="" /> <h5>SocialChidiya</h5></div>
      {isLoggedIn ? (
        <div className="links">
          <div className="searchField">
            <input
              type="text"
              className="userSearch"
              placeholder="Search User"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <div className="userSearchResult">
              {userDataForWebPage.map((data) => {
                return (
                  <div
                    className="searchResultRow"
                    onClick={() => handleSearchedUserClick(data.id)}
                    key={data.name}
                  >
                    <img
                      className="searchProfilePicture"
                      src={
                        data.profilePicture !== "undefined" ? (`${data.profilePicture}`) : process.env.PUBLIC_URL + "/user.png"
                      }
                      alt=""
                    />
                    <p>{data.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ExtremeRight">
            <div className="loginBtn" onClick={logOut}>
              Logout
            </div>
            <img
              src={
                profilePicture !== "undefined" ? (`${profilePicture}`) : process.env.PUBLIC_URL + "/user.png"
              }
              alt=""
              className="profileIcon"
              onClick={handleProfileBtnClick}
            />
          </div>
        </div>
      ) : (
        <div className="links">
          <Link to="/register" className="registerBtn">
            Register
          </Link>
          <Link to="/login" className="loginBtn">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
