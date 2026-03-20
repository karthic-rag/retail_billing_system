import React, { useState } from "react";
import { deleteUser } from "../service/UserService";
import toast from "react-hot-toast";

const UsersList = ({ users, setUsers }) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (userId) => {
    try {
      const res = await deleteUser(userId);
      if (res) {
        const updatedUsers = users.filter((user) => user.userId !== userId);
        setUsers(updatedUsers);
        toast.success("user deleted successfully");
      }
    } catch (error) {
      console.log(error.response.data.message || "error while deleting user");
      toast.error("user not deleted....");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="search by eamil"
            className="form-control"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filteredUsers.map((user, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <p className="mb-0 text-white">{user.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.userId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
