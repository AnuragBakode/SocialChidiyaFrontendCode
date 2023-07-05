import React from "react";
import "./UserDetails.css";
import { Link } from "react-router-dom";
import { Post } from "../Posts/Post";

export const UserDetails = ({
  setShowEditProfile,
  userDetail,
  edit,
  currentUser,
  fetchUserData,
  render,
  setRender,
}) => {
  const handleEditProfileButton = () => {
    setShowEditProfile(true);
  };

  let isLiked = false;

  return (
    <>
      <div className="sidebar">
        <Link to="/posts" className="home">
          <img
            className="icon"
            src={process.env.PUBLIC_URL + "home.png"}
            alt=""
          />
          <h3>Home</h3>
        </Link>
      </div>
      <div className="userDetailsPage">
        <div className="aboutSection">
          <div className="profilePicture">
            <img
              className="userProfile"
              src={
                userDetail.profilePicture
                  ? `https://socialchidiyabackendserver.onrender.com/${userDetail.profilePicture}`
                  : process.env.PUBLIC_URL + "home.png"
              }
              alt=""
            />
          </div>
          <div className="aboutContent">
            <div className="profileNameHeader">
              <h2 className="userName">{userDetail.name}</h2>
              {edit ? (
                <button
                  className="editProfileBtn"
                  onClick={handleEditProfileButton}
                >
                  Edit Profile
                </button>
              ) : (
                ""
              )}
            </div>
            <p className="userBio">{userDetail.bio ? userDetail.bio : ""}</p>
            <div className="userCount">
              <div className="postsCount">
                <h5>{userDetail.posts ? userDetail.posts.length : 0}</h5>
                <h5 className="countTitle">Posts</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="postsSection">
          {userDetail.posts
            ? userDetail.posts.map((p) => {
              isLiked = false;
              p.likes.forEach((like) => {
                if (like._id === currentUser.id) {
                  isLiked = true;
                }
              });

              return (
                <Post
                  post={p}
                  currentUser={currentUser}
                  isLiked={isLiked}
                  edit={edit}
                  render={render}
                  setRender={setRender}
                  fetchUserData={fetchUserData}
                  key={p._id}
                />
              );
            })
            : ""}
        </div>
      </div>
    </>
  );
};
