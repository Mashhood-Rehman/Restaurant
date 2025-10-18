import { Route, Routes } from "react-router-dom";

import Cancel from "./components/Cancel";
import Dispatch from "./components/Dispatch";
import Success from "./components/Success";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import Orders from "./pages/Orders";
import AdminLayout from "./components/adminComponents/AdminLayout";
import { AdminOrders, Analytics, Products, Customers } from "./admin";

const App = () => {
  return (<>
    <ToastContainer />
    <Navbar />
    <div className="pt-24 lg:pt-0">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Customers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<Products />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </div>
  </>
  );
};

export default App;