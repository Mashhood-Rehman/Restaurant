import { Route, Routes, useLocation } from "react-router-dom";

import Cancel from "./components/Cancel";
import Dispatch from "./components/Dispatch";
import Success from "./components/Success";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import Orders from "./pages/Orders";
import { AdminOrders, Analytics, Products, Customers, Users, AdminLayout } from "./admin";
import Profile from "./components/Profile";
import ProtectedRoutes from "./auth/ProtectedRoutes";

const App = () => {
  const location = useLocation()
  const hideComponent = location.pathname.startsWith("/admin")
  return (
    <>
      <ToastContainer />
      {!hideComponent && <Navbar />}
      <div className={`min-h-screen ${!hideComponent && "pt-16"}`}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="customers" element={<Customers />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:userId" element={<Users />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<Products />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;