import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const isLoggedIn = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/posts");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
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
      ) : (
        <div className="homePage">
          <img
            className="first"
            src={process.env.PUBLIC_URL + "first.jpg"}
            alt="first"
            loading="lazy"
          />
          <img
            className="third"
            src={process.env.PUBLIC_URL + "third.jpg"}
            alt="first"
            loading="lazy"
          />
          <img
            className="second"
            src={process.env.PUBLIC_URL + "second.jpg"}
            alt="first"
            loading="lazy"
          />
          <h1 className="HomeHeader">
            Share Your Best{" "}
            <span className="HomeSpan">
              Exp<b>erie</b>nces
            </span>
          </h1>
        </div>
      )}
    </>
  );
};
