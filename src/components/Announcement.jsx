import axios from "axios";
import React from "react";

import "../scss/components/announcement.scss";

import { useDispatch } from "react-redux";
import { setDataDeleteAnnoun, setDataEditAnnoun } from "../redux/action";

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

const Announcement = ({ id, title, body, userId }) => {
  const [usersData, setUsersData] = React.useState([]);
  const [editAnnoun, setEditAnnoun] = React.useState({
    valueTitle: "",
    valueBody: "",
    openUptAnnoun: false,
    id: "",
  });

  let dataAboutUser = JSON.parse(localStorage.user);

  const dispatch = useDispatch()

  React.useEffect(() => {
     fetch(`https://ekreative-json-server.herokuapp.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, [userId]);

  

  

  const openEditBlock = (title, body, id) => {
    setEditAnnoun({
      valueTitle: title,
      valueBody: body,
      openUptAnnoun: true,
      id,
    });
  };

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

  const deleteAnnoun = (id) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token").slice(1, -1)}`,
    };

    axios.delete(
      `https://ekreative-json-server.herokuapp.com/664/announcements/${id}`,
      { headers }
    )
     dispatch(setDataDeleteAnnoun(id))
    
  };

  return editAnnoun.openUptAnnoun ? (
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
  ) : (
    <div key={id} className="announ">
      <div>
        <h3>{title}</h3>
        <p className="body-announ">{body}</p>
      </div>
      <div className="buttom-announ">
        <p className='name-user'>
          {usersData.firstname} {usersData.lastname}
        </p>
        {localStorage.getItem("token") && dataAboutUser.id === userId ? (
          <div>
            <button
              onClick={() => openEditBlock(title, body, id)}
              className="button-edit-announ"
            >
              Edit
            </button>
            <button
              onClick={() => deleteAnnoun(id)}
              className="button-edit-announ"
            >
              Delete
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Announcement;
