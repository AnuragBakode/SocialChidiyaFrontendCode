import React, { useState } from "react";
import axios from "axios";
import "./EditProfile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditProfile = ({
  setShowEditProfile,
  userDetail,
  fetchUserData,
}) => {
  console.log(userDetail);
  const [image, setImage] = useState(null);
  const [imageToBeUploaded, setImageToBeUploaded] = useState("");
  const [bio, setBio] = useState(userDetail.bio);

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };

    setImageToBeUploaded(e.target.files[0]);
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();

    formData.append("profilePicture", imageToBeUploaded);

    formData.append("bio", bio);

    axios
      .post(
        "https://socialchidiyabackendserver.onrender.com/updateProfile",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setShowEditProfile(false);
        localStorage.setItem("profilePicture", response.data.picture);
        fetchUserData();
        toast.success("Profile Updated", {
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="uploadPost">
      <div className="left">
        <h4>Select your Profile Picture</h4>
        <div className="file-input">
          <input type="file" id="myFileInput" onChange={convertToBase64} />
          <label htmlFor="myFileInput">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2L3 15h18L12 2zm0 3.5L16.5 9H7.5L12 5.5zm0 12.8l3.8-4.4h-7.6l3.8 4.4zm6.3-1.8c-.4.4-.9.6-1.5.6H7.3c-.6 0-1.1-.2-1.5-.6-.4-.4-.6-.9-.6-1.5v-7c0-.6.2-1.1.6-1.5.4-.4.9-.6 1.5-.6h7.5c.6 0 1.1.2 1.5.6.4.4.6.9.6 1.5v7c0 .6-.2 1.1-.6 1.5z" />
            </svg>
            <span className="button-text">Choose File</span>
          </label>
        </div>

        <h4>Enter Your Bio</h4>
        <textarea
          name="textArea"
          id="textArea"
          onChange={(e) => {
            setBio(e.target.value);
          }}
          value={bio}
        ></textarea>
        <div className="upload" onClick={handleUpdateProfile}>
          {/* {userDetail.profilePicture} */}
          Update Profile
        </div>
      </div>
      <div className="right uiPhotoContainer">
        <img
          src={
            image
              ? image
              : userDetail.profilePicture
              ? `https://socialchidiyabackendserver.onrender.com/${userDetail.profilePicture}`
              : process.env.PUBLIC_URL + "/user.png"
          }
          alt=""
          className="photoToBePosted"
        />
      </div>
    </div>
  );
};
