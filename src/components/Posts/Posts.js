import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Posts.css";
import { UploadPost } from "./UploadPost/UploadPost";
import { Link } from "react-router-dom";
import { Post } from "./Post";

export const Posts = () => {
  const [uploadPostContainer, setUploadPageContainer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  let isLiked = false;

  const handlePrevBtnClick = () => {
    // setIsLoading(true);
    setPage((prevState) => {
      if (prevState === 1) return prevState;
      return prevState - 1;
    });
  };

  const handleNxtBtnClick = () => {
    // setIsLoading(true);
    setPage((prevState) => {
      if (prevState === pageCount) return prevState;
      return prevState + 1;
    });
  };

  useEffect(() => {
    fetchPostDetails();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchPostDetails = () => {
    axios
      .get(`https://socialchidiyabackendserver.onrender.com/posts?page=${page}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPostsData(response.data.allPosts);
        setPageCount(response.data.pageCount);
        setCurrentUser(response.data.CurrentUser);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.data === "Invalid token") {
          window.localStorage.clear();
        }
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  };

  const handleUploadPostButtonClick = () => {
    setUploadPageContainer(!uploadPostContainer);
  };

  return (
    <>
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
        <div className="postsPage">
          {uploadPostContainer ? (
            <>
              <div className="backdrop"></div>
              <UploadPost
                setUploadPageContainer={setUploadPageContainer}
                fetchPostDetails={fetchPostDetails}
                setIsLoading={setIsLoading}
              />
            </>
          ) : (
            ""
          )}
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
          <div className="postContainer">
            {postsData.map((post) => {
              isLiked = false;
              post.likes.forEach((like) => {
                if (like._id === currentUser.id) {
                  isLiked = true;
                }
              });
              return (
                <Post
                  post={post}
                  currentUser={currentUser}
                  isLiked={isLiked}
                  edit={false} key={post._id}
                />
              );
            })}
            {pageCount > 0 ? (
              <div className="paginationButtons">
                <div
                  className="prevBtn"
                  onClick={handlePrevBtnClick}
                  style={
                    page === 1 ? { opacity: ".5", userSelect: "none" } : {}
                  }
                >
                  <img
                    className="paginationButton"
                    src={process.env.PUBLIC_URL + "left.png"}
                    alt=""
                  />
                </div>
                <div
                  className="nextBtn"
                  onClick={handleNxtBtnClick}
                  style={
                    page === pageCount
                      ? { opacity: ".5", userSelect: "none" }
                      : {}
                  }
                >
                  <img
                    className="paginationButton"
                    src={process.env.PUBLIC_URL + "right.png"}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <h1>No posts to show</h1>
            )}
          </div>
          <div className="postFooter"></div>
          <div className="postButton">
            <div className="addButton" onClick={handleUploadPostButtonClick}>
              +
            </div>
          </div>
        </div>
      ) : (
        <div className="LoggedInError">
          <h1>You are not Logged in you have to login first</h1>
          <Link to="/login" className="loginBtn postPageLoginBtn">
            Login
          </Link>
        </div>
      )}
    </>
  );
};
