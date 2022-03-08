import axios from "axios";
import React from "react";

import { Input } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserSignup } from "../redux/action";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formValid = (userError, user) => {
  let valid = true;

  Object.values(userError).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(user).forEach((val) => {
    val !== null && (valid = false);
  });

  return valid;
};

function Signup() {
  const [formErrors, setFormError] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirPass: "",
    age: "",
  });

  const user = useSelector((state) => state.userSignUp.userSignup);
  // const dispatch = useDispatch()

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   if (formValid(formErrors, user)) {
  //     console.log('evrething valid');
  //   } else {
  //     console.log('error');
  //     // setUser((prevState) => ({
  //     //   ...prevState,
  //     //   error: true
  //     // }))
  //  }
  // }

  // const handleChange = e => {
  //   e.preventDefault()
  //   const {value, name} = e.target;
  //   dispatch(setUserSignup(
  //     [e.target.name]= value,
  //   ))

  //   switch (name) {
  //     case 'firstname':
  //       formErrors.firstname =
  //         value === ''
  //         ? 'this field cant be empty'
  //         : ''
  //       break;
  //     case 'lastname':
  //       formErrors.lastname =
  //         value === ''
  //         ? 'this field cant be empty'
  //         : ''
  //       break;
  //     case 'email':
  //       formErrors.email =
  //       emailRegex.test(value) && value.length !== ''
  //         ? ''
  //         : 'invalid email address'
  //       break;
  //     case 'password':
  //       formErrors.password =
  //         value.length < 12
  //         ? 'this field must have least 12 signs'
  //         : ''
  //       break;
  //     case 'confirPass':
  //       formErrors.confirPass =
  //         value === user.password
  //         ? ''
  //         : 'passwords not match'
  //       break;
  //     case 'age':
  //       formErrors.age =
  //         value === ''
  //         ? 'this field cant be empty'
  //         : ''
  //       break;
  //     default:
  //       break;
  //   }

  // }

  //  const [user, setUser] = React.useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   password: '',
  //   confirPass: '',
  //   age: '',
  //   avatar: '',
  //   formErrors: {
  //     firstname: '',
  //     lastname: '',
  //     email: '',
  //     password: '',
  //     confirPass: '',
  //     age: '',
  //     avatar: ''
  //   },
  // });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(user)) {
      console.log("evrething valid");
    } else {
      console.log("error");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserSignup({
      [name]: value,
    });

    switch (name) {
      case "firstname":
        value === ""
          ? setFormError((prevState) => ({
              ...prevState,
              firstname: "this field cant be empty",
            }))
          : setFormError((prevState) => ({
              ...prevState,
              firstname: "",
            }));
        // formErrors.firstname=
        //   value === ''
        //   ? 'this field cant be empty'
        //   : ''
        break;
      case "lastname":
        value === ""
          ?
          setFormError((prevState) => ({
              ...prevState,
              lastname: "this field cant be empty",
            }))
           :setFormError((prevState) => ({
              ...prevState,
              lastname: "",
            }));
        break;
      case "email":
          emailRegex.test(value) && value.length !== ""
            ? setFormError((prevState) => ({
              ...prevState,
              email: "",
            }))
            :
            setFormError((prevState) => ({
              ...prevState,
              email: "invalid email address",
            }))
            ;
        break;
      case "password":
        value.length < 12 ?
          setFormError((prevState) => ({
              ...prevState,
              password: "this field must have least 12 signs",
            }))
          : setFormError((prevState) => ({
              ...prevState,
              password: "",
            }));
        break;
      case "confirPass":
        value === user.password ?
          setFormError((prevState) => ({
              ...prevState,
              confirPass: "",
          })) :
          setFormError((prevState) => ({
              ...prevState,
              confirPass:  "passwords not match",
          }))
        ;
        break;
      case "age":
        value === "" ?
           setFormError((prevState) => ({
              ...prevState,
              age:  "this field cant be empty",
          }))
           : setFormError((prevState) => ({
              ...prevState,
              age:  "",
          }));
        break;
      default:
        break;
    }
  };

  const getSingup = (e) => {
    const authData = {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      avatar: user.avatar,
    };
    axios
      .post("https://ekreative-json-server.herokuapp.com/register", authData)
      .then((response) => {
        console.log(response);
        localStorage.user = JSON.stringify(response.data.user);
        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );
        if (formValid) {
          window.location.href = "/";
        }
      });
  };

  return (
    <div className="authorization">
      <h2>Sign Up</h2>
      <div className="form">
        <form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            value={user.firstname}
            onChange={handleChange}
            placeholder="first name"
            name="firstname"
            formErrors={formErrors.firstname}
            error={user.error}
          />
          <Input
            type="text"
            value={user.lastname}
            onChange={handleChange}
            placeholder="last name"
            name="lastname"
            formErrors={formErrors.lastname}
            error={user.error}
          />
          <Input
            type="email"
            value={user.email}
            onChange={handleChange}
            formErrors={formErrors.email}
            placeholder="email"
            name="email"
            error={user.error}
          />
          <Input
            type="password"
            value={user.password}
            onChange={handleChange}
            formErrors={formErrors.password}
            placeholder="password"
            name="password"
          />
          <Input
            type="password"
            value={user.confirPass}
            onChange={handleChange}
            formErrors={formErrors.confirPass}
            placeholder="cofirmation password"
            name="confirPass"
          />
          <Input
            type="number"
            value={user.age}
            onChange={handleChange}
            formErrors={formErrors.age}
            placeholder="age"
            name="age"
          />
          <Input
            type="text"
            value={user.avatar}
            onChange={handleChange}
            formErrors={formErrors.avatar}
            placeholder="avatar"
            name="avatar"
          />
          <button
            className="button"
            type="submit"
            onClick={formValid ? getSingup : null}
          >
            Signup
          </button>
          <br />
          <p> maybe you already have an account</p>
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
