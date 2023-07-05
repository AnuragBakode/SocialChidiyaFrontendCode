import React, { useState } from "react";
import "./UploadPost.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UploadPost = ({
  setUploadPageContainer,
  fetchPostDetails,
  setIsLoading,
}) => {
  const [image, setImage] = useState(null);
  const [imageToBeUploaded, setImageToBeUploaded] = useState("");
  const [description, setDescription] = useState("");

  const convertToBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };

    setImageToBeUploaded(e.target.files[0]);
  };

  const handleUploadPost = () => {
    const formData = new FormData();
    formData.append("image", imageToBeUploaded);
    formData.append("description", description);

    axios
      .post("https://socialchidiyabackendserver.onrender.com/uploadPost", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setIsLoading(true);
        toast.success("Successfully Uploaded", {
          theme: "dark",
        });
        // fetchUserData();
        fetchPostDetails();
        setUploadPageContainer(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="uploadPost">
      <div className="left">
        <h4>Select an Image</h4>
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

        <h4>Enter the Description</h4>
        <textarea
          name="textArea"
          id="textArea"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        ></textarea>
        <div className="upload" onClick={handleUploadPost}>
          Upload Post
        </div>
      </div>
      <div className="right uiPhotoContainer">
        <img src={image} alt="" className="photoToBePosted" />
      </div>
    </div>
  );
};
