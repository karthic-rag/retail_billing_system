import React, { useState } from "react";
import { addUser } from "../service/UserService";
import toast from "react-hot-toast";

const UsersForm = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addUser(data);
      if (res) {
        setUsers((prev) => [...prev, res.data]);
        setData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Registered successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to register user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  className="form-control"
                  placeholder="Jhon doe"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  className="form-control"
                  placeholder="yourname@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  className="form-control"
                  placeholder="*******"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "loading..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersForm;
