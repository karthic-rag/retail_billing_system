import React, { useContext, useEffect, useState } from "react";
import "./styles/ManageItems.css";
import ItemsForm from "../components/ItemsForm";
import ItemsList from "../components/ItemsList";
import { AppContext } from "../context/AppContext";

const ManageItems = () => {
  const { items, setItems, fetchItems } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchItems();
    };

    fetchData();
  }, []);

  return (
    <div className="items-container text-light">
      <div className="left-column">
        <ItemsForm setItems={setItems} />
      </div>
      <div className="right-column">
        <ItemsList items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default ManageItems;
