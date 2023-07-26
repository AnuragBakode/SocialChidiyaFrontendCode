import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Post = ({ post, currentUser, isLiked, edit, fetchUserData }) => {
  const [comment, setComment] = useState("");
  const [postComment, setPostComment] = useState([]);
  const [liked, setLiked] = useState(isLiked);

  const [localLikeCount, setLocalLikeCount] = useState(post.likes.length);

  const handleCommentSubmit = () => {
    setPostComment([...postComment, { description: comment }]);
    axios
      .post(
        "https://socialchidiyabackendserver.onrender.com/uploadComment",
        {
          description: comment,
          postId: post._id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
      })
      .catch((err) => {
        console.log(err)
      });

    setComment("");
  };

  const handleLikeButtonClick = () => {
    if (liked) {
      // call Dislike in the backend
      axios
        .post("https://socialchidiyabackendserver.onrender.com/dislikePost", {
          headers: {
            token: localStorage.getItem("token"),
          },

          postId: post._id,
        })
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        });

      setLiked(false);
      setLocalLikeCount((pre) => pre - 1);
    } else {
      //call Like in the backend
      axios
        .post("https://socialchidiyabackendserver.onrender.com/likePost", {
          headers: {
            token: localStorage.getItem("token"),
          },

          postId: post._id,
        })
        .then((response) => {

        })
        .catch((err) => {
          console.log(err);
        });

      setLiked(true);
      setLocalLikeCount((pre) => pre + 1);
    }
  };

  const handleDeleteButtonClick = (postId) => {
    axios
      .post(`https://socialchidiyabackendserver.onrender.com/deletePost/${postId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        toast.success("Post Deleted Successfully", {
          theme: "dark",
        });
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentDeleteButton = (postId, commentId) => {
    axios
      .post(`https://socialchidiyabackendserver.onrender.com/deleteComment/${postId}/${commentId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        toast.success("Comment Deleted Successfully", {
          theme: "dark",
        });
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div key={post._id} className="singlePost">
      <div className="image">
        <div className="ownerDetails">
          <img
            src={
              post.owner.profilePicture !== "undefined" ? (`${post.owner.profilePicture}`) : process.env.PUBLIC_URL + "/user.png"
            }
            alt=""
          />
          <h5>{post.owner.name}</h5>
        </div>
        <img
          className="postImage"
          src={`${post.imgUrl}`}
          alt=""
        />
      </div>
      <div className="content">
        <div className="description">
          <p>{post.description}</p>
          <div className="comments">
            <h6>Comments</h6>
            {post.comments.map((c) => {
              return (
                <div className="allcomments" key={post._id}>
                  <div key={c._id}>
                    <p>{c.description}</p>
                  </div>
                  <div className="commentOwnerDetails">
                    <img
                      src={`${c.owner.profilePicture}`}
                      alt=""
                      className="commentOwnerImg"
                    />
                    <p>{c.owner.name}</p>
                    <div className="deleteCommentContainer">
                      {edit ? (
                        <img
                          className="deleteIcon"
                          src={process.env.PUBLIC_URL + "delete.png"}
                          alt=""
                          onClick={() =>
                            handleCommentDeleteButton(post._id, c._id)
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {postComment.map((pc) => {
              return (
                <div className="allcomments" key={pc}>
                  <div key={pc._id}>
                    <p>{pc.description}</p>
                  </div>
                  <div className="commentOwnerDetails">
                    <img
                      src={`https://socialchidiyabackendserver.onrender.com/${localStorage.getItem(
                        "profilePicture"
                      )}`}
                      alt=""
                      className="commentOwnerImg"
                    />

                    <p>- {currentUser.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="commentInput">
          <input
            type="text"
            className="commentInputField"
            placeholder="Type your Comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div className="sendButton" onClick={handleCommentSubmit}>
            Send
          </div>
          {/* <h1></h1> */}
          <div
            className={`heart ${liked ? "heartActive" : ""}`}
            onClick={handleLikeButtonClick}
          ></div>
          <p className="likeCount">{localLikeCount}</p>
        </div>
      </div>
      <div className="deleteButton">
        {edit ? (
          <img
            src={process.env.PUBLIC_URL + "/delete.png"}
            alt=""
            onClick={() => handleDeleteButtonClick(post._id)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
