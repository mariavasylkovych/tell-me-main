import React from "react";
import { useDispatch } from "react-redux";

import "../scss/app.scss";
import "../scss/components/button.scss";

import { HomeAuthorizations, HomeUnauthorized } from '../components/index'
import { GetPosts } from "../components/index";
import { setPosts, setDataAnnouncements, setGetPostsPage } from "../redux/action";

const Home = () => {

  const token = localStorage.getItem("token")

  const dispatch = useDispatch();
 
  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/664/announcements?_sort=createdAt&_order=desc&_limit=10`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDataAnnouncements(data));
      });
  }, [dispatch]);

  React.useEffect(() => {
    fetch(`https://ekreative-json-server.herokuapp.com/664/posts`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPosts(data));
      });
  }, [dispatch]);

  React.useEffect(() => {
    fetch(
      `https://ekreative-json-server.herokuapp.com/posts?_page=${1}&_limit=${10}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(setGetPostsPage(data));
      });
  }, [dispatch]);


  return (
    <div className="home">
      {token ? (
        <HomeAuthorizations />
      ) : (
       <HomeUnauthorized />
      )}
      <div className="home-content">
        <GetPosts />
      </div>
    </div>
  );
}

export default Home;
