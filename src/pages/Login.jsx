import axios from "axios";
import React from "react";

import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const user = localStorage.getItem("user");

  const getLogin = () => {
    if (email === "" || password === "") {
      setError("Fields are required");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("https://ekreative-json-server.herokuapp.com/login", data)
      .then((response) => {
        localStorage.user = JSON.stringify(response.data.user);
        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        if (setError) {
          window.location.href = "/";
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="authorization">
      <h2>Log In</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="button"
            onClick={() => getLogin(user)}
          >
            Login
          </button>
          <br />
          <p>if you dont have an account you may register</p>

          <Link to="/signup">
            <button type="button" className="button">
              Signup
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
