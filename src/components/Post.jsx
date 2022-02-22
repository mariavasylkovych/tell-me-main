import React from "react";

import "../scss/components/post.scss";
import "../scss/components/comments.scss";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setComments,
  setDataOfPost,
  setUserData,
} from "../redux/action";
import EditPost from "./EditPost";
import PostStandart from "./PostStandart";

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

const Post = () => {
  const [updPost, setUpdPost] = React.useState({
    body: "",
    title: "",
    openEdit: false,
    response: {},
  });

  const dataPost = useSelector((state) => state.posts.dataPost);

  let idPost = JSON.parse(localStorage.idPost);

  const dispatch = useDispatch();


  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/comments?postId=${idPost}&_sort=createdAt&_order=asc`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setComments(data)));
  }, [idPost, dispatch]);


  const isEmptyObject = (obj) => {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }
    return true;
  };


  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/posts`)
      .then((response) => response.json())
      .then((data) => {
        if (isEmptyObject(dataPost)) {
             dispatch(setDataOfPost(data.find(obj => obj.id === idPost)));
             dispatch(setUserData(data.find(obj => obj.id === idPost)));
        }
      });
  });

  return (
    <div className="post" id={`post-${dataPost.id}`}>
      <Link to="/" className="logo">
        <h2 className="logo">
          Tell <span>me</span>
        </h2>
      </Link>
      {updPost.openEdit ? (
        <EditPost updPost={updPost} setUpdPost={setUpdPost} datetime={datetime}/>
      ) : (
       <PostStandart setUpdPost={setUpdPost} datetime={datetime} />
      )}
    </div>
  );
};

export default Post;
