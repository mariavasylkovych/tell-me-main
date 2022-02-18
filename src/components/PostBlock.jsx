import React from "react";

import "../scss/components/postBlock.scss";

import { Link } from "react-router-dom";
import { setDataOfPost, setUserData } from "../redux/action";
import { useDispatch } from "react-redux";

const PostBlock = (dataPost) => {
  const [usersData, setUsersData] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/users/${dataPost.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, [dataPost.userId]);

  

  return (
    <div className="post-block" key={dataPost.id} id={`post-${dataPost.id}`}>
      <div className="content">
        <Link
          to={`/post/${dataPost.id}`}
          className="post-title"
          onClick={() => {
            localStorage.idPost = JSON.stringify(dataPost.id);
            dispatch(setDataOfPost(dataPost))
            dispatch(setUserData(dataPost))
          }}
        >
          {dataPost.title}
        </Link>
        <p className="post-user">
          {usersData.firstname} {usersData.lastname}
        </p>
      </div>
    </div>
  );
};

export default PostBlock;
