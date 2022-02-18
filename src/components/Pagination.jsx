import React from "react";

import "../scss/components/pagination.scss";

import { useDispatch } from "react-redux";
import { setEditPostsPage } from "../redux/action";

const Pagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  setCurrentPage,
}) => {
  const paginPageWithPosts = [];


  const dispatch = useDispatch();

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    paginPageWithPosts.push(i);
  }

  const pagFunc = (number) => {
    setCurrentPage(number)
    
      dispatch(setEditPostsPage(number, postsPerPage));
  };
  
  return (
    <div className="pagination">
      {paginPageWithPosts.map((number, index) => (
        <button
          id={`${index + 1}`}
          key={number}
          onClick={() => {
            pagFunc(number)
           }}
          className={index + 1 === currentPage ? "active" : "button-pag"}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
