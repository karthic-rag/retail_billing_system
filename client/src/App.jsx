import React from "react";
import MenuBar from "./components/menubar/MenuBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageCategories from "./pages/ManageCategories";
import ManageUsers from "./pages/ManageUsers";
import ManageItems from "./pages/ManageItems";
import Explore from "./pages/Explore";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const LoginRoute = ({ element }) => {
    if (role) {
      return <Navigate to={"/"} replace />;
    }

    return element;
  };

  const ProtectedRoute = ({ element, allowedRoles }) => {
    // If not logged in, redirect to login
    if (!role) {
      return <Navigate to={"/login"} replace />;
    }

    // If role is not allowed, redirect to home
    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to={"/"} replace />;
    }

    return element;
  };
  return (
    <div>
      {location.pathname !== "/login" && <MenuBar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/orders" element={<OrderHistory />} />

        <Route
          path="/category"
          element={
            <ProtectedRoute
              element={<ManageCategories />}
              allowedRoles={["ADMIN"]}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={<ManageUsers />}
              allowedRoles={["ADMIN"]}
            />
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute
              element={<ManageItems />}
              allowedRoles={["ADMIN"]}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
