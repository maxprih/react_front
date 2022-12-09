import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import AdminService from "../services/admin.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    AdminService.getAll()
    .then((response) => {
      setUsers(response.data);
    })
    .catch(e => {
      console.log(e);
    })
  }

  const deleteUser = (id) => {
    AdminService.deleteUser(id);
    getUsers();
  }

  const handleClick = (event, id) => {
    deleteUser(id);
  };


  useEffect(() => {
    AdminService.getAll().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, [users]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!currentUser.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="alert alert-info admin" role="alert" style={{ textAlign: "center" }}>
        Admin panel
      </div>

      <div className="table-responsive">
        <table className="table-hover table-bordered" style={{width: "100%"}}>
          <thead className="thead-light">
            <tr style={{ textAlign: "center" }}>
              <th>User id</th>
              <th>Email</th>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { users
             ? users.map((user, key) => {
              return (
                <tr key={key} className="res-table-column" style={{textAlign: "center"}}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  {user.roles[0].name == 'ROLE_USER' 
                    ? <td><button className="btn btn-danger" onClick={event => handleClick(event, user.id)} onMouseUp={getUsers} style={{width: "100%"}} >Delete person</button></td>
                    : <td>Can't delete admin</td>
                  }
                </tr>
              )
            })
            : 123
          }
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default BoardAdmin;
