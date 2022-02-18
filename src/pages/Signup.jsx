import axios from "axios";
import React from "react";

import { Input } from "../components/index";
import { Link } from "react-router-dom";

const emailRegex = RegExp(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({formErrors, ...rest}) => {
  let valid = true

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  });

  Object.values(rest).forEach(val => {
    val !== null && (valid = false)
  })

  return valid
}

function Signup() {
  const [user, setUser] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirPass: '',
    age: '',
    avatar: '',
    formErrors: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirPass: '',
      age: '',
      avatar: ''
    },
  });

  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formValid(user)) {
      console.log('evrething valid');
    } else {
      console.log('error');
   }
  }

  const handleChange = e => {
    e.preventDefault()
    const { name,  value } = e.target;
    let formErrors = user.formErrors;
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: value,
      formErrors
    }))
    

    switch (name) {
      case 'firstname':
        formErrors.firstname =
          value === ''
          ? 'this field cant be empty'
          : ''
        break;
      case 'lastname':
        formErrors.lastname =
          value === ''
          ? 'this field cant be empty'
          : ''
        break;
      case 'email':
        formErrors.email =
        emailRegex.test(value) && value.length !== ''
          ? ''
          : 'invalid email address'
        break;
      case 'password':
        formErrors.password =
          value.length < 12
          ? 'this field must have least 12 signs'
          : ''
        break;
      case 'confirPass':
        formErrors.confirPass =
          value === user.password
          ? ''
          : 'passwords not match'
        break;
      case 'age':
        formErrors.age =
          value === ''
          ? 'this field cant be empty'
          : ''
        break;
      default:
        break;
    }
  }

  const getSingup = () => {
    const authData = {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      avatar: user.avatar
    };
    axios.post("https://ekreative-json-server.herokuapp.com/register", authData)
      .then((response) => {
        console.log(response);
        localStorage.user = JSON.stringify(response.data.user);
        window.localStorage.setItem("token", JSON.stringify(response.data.accessToken))
        if (formValid) {
          window.location.href = '/'
        }
      })
    
    // setUser((preventDefault) => ({
    //   ...preventDefault,
    //   firstname: '',
    //   lastname: '',
    //   email: '',
    //   password: '',
    //   firstname: '',
    //   configPass: '',
    //   age: '',
    //   avatar: '',
    // }))
    
  }
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
            formErrors={user.formErrors.firstname}
          />
          <Input
            type="text"
            value={user.lastname}
            onChange={handleChange}
            placeholder="last name"
            name="lastname"
            formErrors={user.formErrors.lastname}
          />
          <Input
            type="email"
            value={user.email}
            onChange={handleChange}
            formErrors={user.formErrors.email}
            placeholder="email"
            name="email"
          />
          <Input
            type="password"
            value={user.password}
            onChange={handleChange}
            formErrors={user.formErrors.password}
            placeholder="password"
            name="password"
          />
          <Input
            type="password"
            value={user.confirPass}
            onChange={handleChange}
            formErrors={user.formErrors.confirPass}
            placeholder="cofirmation password"
            name="confirPass"
          />
          <Input
            type="number"
            value={user.age}
            onChange={handleChange}
            formErrors={user.formErrors.age}
            placeholder="age"
            name="age"
          />
          <Input
            type="text"
            value={user.avatar}
            onChange={handleChange}
            formErrors={user.formErrors.avatar}
            placeholder="avatar"
            name="avatar"
          />
          <button className='button' type="submit" onClick={formValid ? getSingup : null}>
            Signup
          </button>
          <br />
          <p> maybe you already have an account</p>
          <Link to='/login'><button className='button'>
            Login
          </button></Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
