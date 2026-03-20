import React, { useContext, useState } from "react";
import { addItem } from "../service/ItemService";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const ItemsForm = ({ setItems }) => {
  const { categories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(data);
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
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      const res = await addItem(formData);

      if (res.status == 201) {
        setItems((prev) => [...prev, res.data]);
        toast.success("Item added successfully");
      }
      setData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
      });
      setImage(false);
    } catch (error) {
      console.log(error);
      toast.error("unable to add item");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
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
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-control"
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
                    onChange={onChangeHandler}
                    value={data.name}
                    className="form-control"
                    placeholder="Item Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-control"
                    name="categoryId"
                    id="categoryId"
                    value={data.categoryId}
                    onChange={onChangeHandler}
                    required
                  >
                    <option value="">-----SELECT CATEGORY-----</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    onChange={onChangeHandler}
                    value={data.price}
                    className="form-control"
                    placeholder="₹200.00"
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
                    onChange={onChangeHandler}
                    value={data.description}
                    className="form-control"
                    placeholder="Write content here..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsForm;
