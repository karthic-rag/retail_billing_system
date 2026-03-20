import React, { useContext, useEffect } from "react";
import "./styles/ManageCategories.css";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import { AppContext } from "../context/AppContext";

const ManageCategories = () => {
  const { loadData } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };

    fetchData();
  }, []);

  return (
    <div className="category-container text-light">
      <div className="left-column">
        <CategoryForm />
      </div>
      <div className="right-column">
        <CategoryList />
      </div>
    </div>
  );
};

export default ManageCategories;
