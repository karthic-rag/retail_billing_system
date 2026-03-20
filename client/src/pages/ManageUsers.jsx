import React, { useEffect, useState } from "react";
import "./styles/ManageUsers.css";
import UsersForm from "../components/UsersForm";
import UsersList from "../components/UsersList";
import { getAllUsers } from "../service/UserService";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getAllUsers();
        if (res) {
          setUsers(res.data);
        }
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    }

    fetchUsers();
  }, []);
  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UsersForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UsersList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
