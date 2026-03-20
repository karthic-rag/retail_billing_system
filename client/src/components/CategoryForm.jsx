import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { addCategory } from "../service/CategoryService.js";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#2c2c2c",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image) {
      toast.error("Please select image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);

    try {
      const res = await addCategory(formData);

      if (res.status == 201) {
        setCategories([...categories, res.data]);
        toast.success("category added successfully");
      }
      setData({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
      });
      setImage(false);
    } catch (error) {
      console.log(error);
      toast.error("unable to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Picture
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  alt=""
                  width={60}
                  className="my-2"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Category Name"
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  rows="5"
                  name="description"
                  id="description"
                  className="form-control"
                  placeholder="Write content here..."
                  onChange={onChangeHandler}
                  value={data.description}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">
                  Background Color
                </label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  onChange={onChangeHandler}
                  value={data.bgColor}
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
