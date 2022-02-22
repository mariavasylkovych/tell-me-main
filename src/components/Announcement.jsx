import React from "react";

import "../scss/components/announcement.scss";

import { AnnounBlock, EditAnnoun } from ".";



const Announcement = (announ) => {
  const [usersData, setUsersData] = React.useState([]);
  const [editAnnoun, setEditAnnoun] = React.useState({
    openUptAnnoun: false,
    valueTitle: '',
    valueBody: '',
    id: ''
  });

  React.useEffect(() => {
     fetch(`https://ekreative-json-server.herokuapp.com/users/${announ.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  }, [announ.userId]);

  return editAnnoun.openUptAnnoun ? (
    <EditAnnoun usersData={usersData} editAnnoun={editAnnoun} setEditAnnoun={setEditAnnoun} />
  ) : (
    <AnnounBlock announ={announ} usersData={usersData} setEditAnnoun={setEditAnnoun} />
  );
};

export default Announcement;
