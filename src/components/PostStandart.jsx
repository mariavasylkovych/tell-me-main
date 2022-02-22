import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Comment } from ".";
import { setDataCreateComment, setDataDeletePost } from "../redux/action";

const PostStandart = ({ setUpdPost, datetime }) => {
  const [newComment, setNewComment] = React.useState("");

  const token = localStorage.getItem("token");
  let dataAboutUser = JSON.parse(localStorage.user);

  const dataPost = useSelector((state) => state.posts.dataPost);
  const usersData = useSelector((state) => state.userData.userData);
  const comments = useSelector((state) => state.commentsReducer.comments);
  const dispatch = useDispatch();

  const handleChangeUserComment = (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  const addComment = (postId) => {
    setNewComment("");
    const data = {
      postId,
      body: newComment,
      createdAt: datetime,
      updatedAt: "",
      userId: dataAboutUser.id,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios
      .post(`https://ekreative-json-server.herokuapp.com/664/comments`, data, {
        headers,
      })
      .then((response) => dispatch(setDataCreateComment(response.data)));
  };

  const openEditPost = (body, title) => {
    setUpdPost({
      body,
      title,
      openEdit: true,
    });
  };

  const deletePost = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.delete(
      `https://ekreative-json-server.herokuapp.com/664/posts/${id}`,
      { headers }
    );
    dispatch(setDataDeletePost(id));
  };

  return (
    <div className="content-post">
      <div className="">
        <div className="content">
          <h3>{dataPost.title}</h3>
          <p className="post-body">{dataPost.body}</p>
        </div>
        <div className="bottom-content">
          <p className="post-user">
            {usersData.firstname} {usersData.lastname}
          </p>
          {token && usersData.id === dataAboutUser.id ? (
            <div className="content-button">
              <button
                className={classNames("button-post", "button")}
                onClick={() => openEditPost(dataPost.body, dataPost.title)}
              >
                Edit
              </button>
              <Link to="/">
                <button
                  to={"/"}
                  className={classNames("button-post", "button")}
                  onClick={() => deletePost(dataPost.id)}
                >
                  Delete
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="comments-of-post">
        <h3>comments</h3>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
        {localStorage.getItem("token") ? (
          <div className="comment-input-block">
            <img src={dataAboutUser.avatar} alt="" />
            <input
              type="text"
              value={newComment}
              onChange={handleChangeUserComment}
            />
            <button
              onClick={() => {
                addComment(dataPost.id);
              }}
            >
              &#43;
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostStandart;
