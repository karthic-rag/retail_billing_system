import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../service/CategoryService";
import { getAllItems } from "../service/ItemService";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  async function loadData() {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(
        error.response.data.message ||
          "error occured while fecthing categories",
      );
      setCategories([]);
    }
  }
  async function fetchItems() {
    try {
      const res = await getAllItems();
      if (res) {
        setItems(res.data);
      }
    } catch (error) {
      console.log(error);
      setItems([]);
    }
  }

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      // Avoid calling protected APIs when user is not authenticated
      if (!token) {
        return;
      }

      await loadData();
      await fetchItems();
    };

    fetchData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
    loadData,
    fetchItems,
    items,
    setItems,
    addToCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadData,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
