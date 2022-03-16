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
  const [paginPageWithPost, setPaginPageWithPost] = React.useState({
    arr: []
  })

  const dispatch = useDispatch();

  React.useEffect(() => {
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //  paginPageWithPost.push(i)
        setPaginPageWithPost(propsState => ({
        arr: [...propsState.arr, i]
     }))
  }
  }, [postsPerPage, totalPosts])
  
  const pagFunc = (number) => {
    setCurrentPage(number)
      dispatch(setEditPostsPage(number, postsPerPage));
  };
  
  return (
    <div className="pagination">
      {paginPageWithPost.arr.map((number, index) => (
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
