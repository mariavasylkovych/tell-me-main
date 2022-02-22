import React from 'react'
import { Link } from 'react-router-dom';

const HomeUnauthorized = () => {
    return (
         <div className="home-header">
          <h1>
            Tell <span>me</span>
          </h1>
          <p>
            Hi! Here you may write posts about your life, your dreams and share
            your purpose!!! <br /> Also you may read it about other people...
            Have a nice tripe in our world!
          </p>
          <div>
            <Link to="login" className="button-home">
              Login
            </Link>
            <span>or</span>
            <Link to="/signup" className="button-home">
              Register
            </Link>
          </div>
        </div>
    )
}

export default HomeUnauthorized;