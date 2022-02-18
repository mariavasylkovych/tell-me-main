import React from "react";
import { useSelector } from "react-redux";
import { PostBlock, Pagination, Announcement } from "./index";
import "../scss/components/getPosts.scss";
import { Link } from "react-router-dom";
import "../scss/components/announcement.scss";

const GetPosts = () => {
  const posts = useSelector((state) => state.posts.posts)
  const announcements = useSelector((state) => state.announcementsReducer.announcements)
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(10);

  const postsPages = useSelector((state) => state.paginateReducer.posts);

  return (
    <div className="get-posts" id="posts">
        <h3 className="header-posts">all posts</h3>
      <div className="posts-block">
        {postsPages.map((dataPost) => (
          <PostBlock key={dataPost.id}  {...dataPost} />
        )
        )}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage} totalPosts={posts.length} />
      <div className="announcements-home">
        <h3 className="header-announs">announcements</h3>
        <div className="announcements">
          {announcements.map((announ) => (
          <Announcement key={announ.id} {...announ} />
        ))}
        </div>
        {localStorage.getItem("token") ? (
          <div className="block-button-announ">
            <Link to="/create-announ" className="button-add-announ">
              Add new announcement
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default GetPosts;
