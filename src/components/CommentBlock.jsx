import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDataDeleteComment } from '../redux/action';

const CommentBlock = ({ comment, usersData, setUpdateCommentBody }) => {
    
  let dataAboutUser = JSON.parse(localStorage.user);
  const token = localStorage.getItem("token")

    const dispatch = useDispatch()
    
    const openUpdateBlock = (id, body) => {
    setUpdateCommentBody((prevState) => ({
      ...prevState,
      value: body,
      openUptComm: true,
      id,
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
        <div key={comment.id + 3 + "li"} className="comment-content">
              <img className="user-avatar" src={usersData.avatar} alt="" />
            <p>{comment.body}</p>
            { token && dataAboutUser.id === comment.userId ? (
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
    )
}

export default CommentBlock;