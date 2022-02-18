import axios from "axios";
import React from "react";

import "../scss/components/comments.scss";

import { useDispatch } from "react-redux";
import { setDataDeleteComment, setDataUpdateComment } from "../redux/action";

var currentdate = new Date();
var datetime =
  currentdate.getFullYear() +
  "-" +
  currentdate.getMonth() +
  "-" +
  currentdate.getDay() +
  "T" +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

const Comment = (comment) => {
  const [usersData, setUsersData] = React.useState([]);
  const [updateCommentBody, setUpdateCommentBody] = React.useState({
    value: "",
    openUptComm: false,
    id: "",
  });
  let dataAboutUser = JSON.parse(localStorage.user);

  const dispatch = useDispatch()

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${comment.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, [comment.userId]);

 

  const handleChange = (e) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const openUpdateBlock = (id, body) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: body,
      openUptComm: true,
      id,
    }));
  };

  const updateComment = ( id, updateBody) => {
    const data = {
      body: updateBody,
      updatedAt: datetime,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.patch(
      `https://ekreative-json-server.herokuapp.com/664/comments/${id}`,
      data,
      {headers}
    )
      .then(response => dispatch(setDataUpdateComment(response.data)))

    setUpdateCommentBody((prevState) => ({
      ...prevState,
      openUptComm: false,
    }));
  };

  const deleteComment = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };
    axios.delete(
      `https://ekreative-json-server.herokuapp.com/664/comments/${id}`,
      { headers }
    )
    
    dispatch(setDataDeleteComment(id))
  };

  return (
    <div key={comment.id} className="comment-data">
      {updateCommentBody.openUptComm && comment.id === updateCommentBody.id ? (
        <div className="comment-content-for-update">
          <img src={usersData.avatar} alt="" />
          <input
            type="text"
            value={updateCommentBody.value}
            onChange={handleChange}
          />
          <button onClick={() => updateComment(comment.id, updateCommentBody.value)}>
            Update
          </button>
        </div>
      ) : (
            <div key={comment.id + 3 + "li"} className="comment-content">
              <img className="user-avatar" src={usersData.avatar} alt="" />
            <p>{comment.body}</p>
            {localStorage.getItem("token") && dataAboutUser.id === comment.userId ? (
              <div key={comment.id + 1} className="button-block">
                <button onClick={() => openUpdateBlock(comment.id, comment.body)}>
                  Update
                </button>
                <button key={comment.id + 2} onClick={() => deleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
      )}
    </div>
  );
};

export default Comment;
