import React, { useEffect, useState } from "react";

import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import pointService from '../services/point.service';
import '../styles/Profile.css'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [points, setPoints] = useState([])

  useEffect( () => {
    getPoints();
  }, []);

  const getPoints = () => {
    pointService.getAll()
      .then(response => {
        setPoints(response.data)
      })
      .catch(e => {
        console.log(e)
      });
  }

  const deletePoints = () => {
    pointService.deleteAll();
    setPoints([]);
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="alert alert-success admin" role="alert" style={{ textAlign: "center" }}>
        <strong>{currentUser.username}</strong> Profile
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ul className="list-group" style={{ width: "fitContent"}}>
            <li className="list-group-item d-flex align-items-center">
              <strong>Your id:</strong>
              <span className="badge badge-primary badge-pill">{currentUser.id}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <strong>Your email:</strong>
              <span className="badge badge-primary badge-pill">{currentUser.email}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <strong>Your authorities:</strong>
              <span className="badge badge-info badge-pill">{currentUser.roles[0]}</span>
            </li>
            <li className="list-group-item d-flex align-items-center">
              <strong>Number of your points:</strong>
              <span className="badge badge-success badge-pill">{points.length}</span>
              <button type="button" className="btn btn-outline-danger" onClick={deletePoints}> Delete <strong>all </strong> your points</button>
            </li>
          </ul>
        </div>
        <div className="card" style={{width: "40%"}}>
          <img className="card-img-top prof_image" alt="cat" style={{width: "100%", height:"100px"}}></img>
            <div className="card-body">
              <p className="card-text">Modern responsive layout React Senior Developer</p>
            </div>
        </div>
      </div>
    </div >
  );
};

export default Profile;
