import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDataEditAnnoun } from '../redux/action';

var currentdate = new Date();
var datetime =
  currentdate.getFullYear() +
  "-" +
  currentdate.getMonth() +
  "-" +
  currentdate.getDay() +
  "T" +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

const EditAnnoun = ({usersData, editAnnoun, setEditAnnoun}) => {

    const dispatch = useDispatch()
    
    const changeHandler = (e) => {
    const { name, value } = e.target;
    setEditAnnoun((prevState) => ({ ...prevState, [name]: value }));
    };

    const editAnnounFunction = async (title, body, id) => {
    const data = {
      title,
      body,
      updateAt: datetime,
    };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

     axios.patch(
      `https://ekreative-json-server.herokuapp.com/664/announcements/${id}`,
      data,
      { headers }
    ).then(response => dispatch(setDataEditAnnoun(response.data)))

    setEditAnnoun((prevState) => ({
      ...prevState,
      openUptAnnoun: false
    }))
  };

    return (
         <div className="announ">
      <input
        value={editAnnoun.valueTitle}
        className="input-title"
        name="valueTitle"
        onChange={changeHandler}
        type="text"
      />
      <textarea
        value={editAnnoun.valueBody}
        className="input-body"
        onChange={changeHandler}
        name="valueBody"
      />
      <div className="buttom-announ">
        <p className='name-user'>
          {usersData.firstname} {usersData.lastname}
        </p>
      <button
        className="button-edit-announ"
        onClick={() => editAnnounFunction(editAnnoun.valueTitle, editAnnoun.valueBody, editAnnoun.id)}
      >
        Edit
        </button>
        </div>
    </div>
    )
}

export default EditAnnoun;