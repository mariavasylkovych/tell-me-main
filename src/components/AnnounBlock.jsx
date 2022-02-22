import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDataDeleteAnnoun } from '../redux/action';

const AnnounBlock = ({announ, usersData, setEditAnnoun}) => {
    
    
    let dataAboutUser = JSON.parse(localStorage.user);

    const dispatch = useDispatch()
    
     const openEditBlock = (title, body, id) => {
         setEditAnnoun({
      valueTitle: title,
      valueBody: body,
      openUptAnnoun: true,
      id,
    });
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
    

    return (
        <div key={announ.id} className="announ">
      <div>
        <h3>{announ.title}</h3>
        <p className="body-announ">{announ.body}</p>
      </div>
      <div className="buttom-announ">
        <p className='name-user'>
          {usersData.firstname} {usersData.lastname}
        </p>
        {localStorage.getItem("token") && dataAboutUser.id === announ.userId ? (
          <div>
            <button
              onClick={() => openEditBlock(announ.title, announ.body, announ.id)}
              className="button-edit-announ"
            >
              Edit
            </button>
            <button
              onClick={() => deleteAnnoun(announ.id)}
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
    )
}

export default AnnounBlock