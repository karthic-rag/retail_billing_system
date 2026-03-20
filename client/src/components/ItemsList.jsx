import React, { useState } from "react";
import { deleteItem } from "../service/ItemService";
import toast from "react-hot-toast";
import "./styles/ItemList.css";

const ItemsList = ({ items, setItems }) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (itemId) => {
    try {
      const res = await deleteItem(itemId);
      if (res) {
        const updatedItems = items.filter((item) => item.itemId !== itemId);
        setItems(updatedItems);
        toast.success(res.data);
      }
    } catch (error) {
      console.log(
        error.response.data.message || "error while deleting category",
      );
      toast.error("item not deleted....");
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
            name="keyword"
            id="keyword"
            placeholder="search by keyword"
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
        {filteredItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{item.name}</h5>
                  <p className="mb-0 text-white">
                    Category : {item.categoryName}
                  </p>
                  <div style={{ marginTop: "8px" }}>
                    <span className="price-back">₹ {item.price}</span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.itemId)}
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

export default ItemsList;
