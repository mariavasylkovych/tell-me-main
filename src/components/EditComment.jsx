import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDataUpdateComment } from '../redux/action';

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


const EditComment = ({ usersData, updateCommentBody, setUpdateCommentBody, comment }) => {

    const dispatch = useDispatch()
    
    const handleChange = (e) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: e.target.value,
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

    return (
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
    )
}

export default EditComment;