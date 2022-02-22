import React from 'react'
import { Link } from 'react-router-dom';

const HomeAuthorizations = () => {

  let dataUser = JSON.parse(localStorage.user);

     const openMenu = () => {
    document.getElementById("menu").classList.toggle("show");
     };
    
    const deletToken = () => {
    localStorage.removeItem("token");
    document.location.reload(true);
  };

    return (
        <div className="for-autho-user">
          <div className="menu-block">
            <div className="data-of-user">
              <img className="avatar" src={dataUser.avatar} alt="" />
              <Link to="user-page">
                <p>
                  {dataUser.firstname} {dataUser.lastname}
                </p>
              </Link>
            </div>
            <img
              src="https://img.icons8.com/ios-glyphs/30/ffffff/menu--v1.png"
              onClick={openMenu}
              className="menu-icon"
              alt=''
            />
            <ul id="menu">
              <Link to="create">
                <li>
                  Cre<span>a</span>te
                </li>
              </Link>
              <Link to="/">
                <li onClick={deletToken}>
                  Log<span>o</span>ut
                </li>
              </Link>
            </ul>
          </div>

          <div className="content-header">
            <h1>
              Tell <span>me</span>
            </h1>
            <p>
              Welcome to home! <br />
              May be you want write post about new dream or little history...{" "}
              <br /> You may do it here:
            </p>
            <Link to="create" className="button-home">
              Create new post
            </Link>
          </div>
        </div>
    )
}

export default HomeAuthorizations;