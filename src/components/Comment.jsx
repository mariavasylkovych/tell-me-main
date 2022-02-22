import React from "react";

import "../scss/components/comments.scss";

import { CommentBlock, EditComment } from ".";


const Comment = (comment) => {
  const [usersData, setUsersData] = React.useState([]);
  const [updateCommentBody, setUpdateCommentBody] = React.useState({
    value: "",
    openUptComm: false,
    id: "",
  });

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/users/${comment.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, [comment.userId]);

  return (
    <div key={comment.id} className="comment-data">
      {updateCommentBody.openUptComm && comment.id === updateCommentBody.id ? (
       <EditComment usersData={usersData} updateCommentBody={updateCommentBody} setUpdateCommentBody={setUpdateCommentBody} comment={comment} />
      ) : (
          <CommentBlock comment={comment} usersData={usersData} setUpdateCommentBody={setUpdateCommentBody} />
      )}
    </div>
  );
};

export default Comment;
