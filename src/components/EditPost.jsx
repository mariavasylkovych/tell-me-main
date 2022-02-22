import axios from 'axios';
import classNames from 'classnames';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDataOfPost } from '../redux/action';

const EditPost = ({ updPost, setUpdPost, datetime }) => {
    
    const dataPost = useSelector((state) => state.posts.dataPost);
    const dispatch = useDispatch()

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    const updatePost = async (title, body) => {
    const data = {
      title,
      body,
      updateAt: datetime,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios
      .patch(
        `https://ekreative-json-server.herokuapp.com/664/posts/${dataPost.id}`,
        data,
        { headers }
      )
      .then((response) => dispatch(setDataOfPost(response.data)));

    setUpdPost((prevState) => ({
      ...prevState,
      openEdit: false,
    }));
  };

    return (
         <div className="content-post-edit">
          <input
            className="input-title"
            value={updPost.title}
            onChange={handleChange}
            name="title"
            type="text"
          />
          <textarea
            className="input-body"
            value={updPost.body}
            onChange={handleChange}
            name="body"
          />
          <button
            className={classNames("button-post", "button")}
            onClick={() => updatePost(updPost.title, updPost.body, dataPost.id)}
          >
            Edit
          </button>
        </div>
    )
}

export default EditPost;