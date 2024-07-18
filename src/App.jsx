import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
// import UserLocation from "./components/UserLocation";
import Slider from "./components/Slider";
import Reservation from "./components/Reservation";
import PreLoader from "./components/PreLoader";
import Product from "../src/components/products/Product";
import Contact from "./Contact";
import FastFood from "./components/products/FastFood";
import Desi from "./components/products/Desi";
import Chinese from "./components/products/Chinese";
import Desserts from "./components/products/Desserts";
import Drinks from "./components/products/Drinks";
import FoodDeliveryForm from "./components/products/FoodDeliveryForm";
import Landingpage from "./components/products/Landingpage";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Navbar
        cart={cart}
        setCart={setCart}
        size={cart.length}
        visible={visible}
        setVisible={setVisible}
      />
      <Landingpage />
      <Product />
      <Slider />
      <FastFood cart={cart} setCart={setCart} />
      <Desi cart={cart} setCart={setCart} />
      <Chinese cart={cart} setCart={setCart} />
      <Desserts cart={cart} setCart={setCart} />
      <Drinks cart={cart} setCart={setCart} />
      {/* <UserLocation loading={loading} setLoading={setLoading} />   */}
      <PreLoader loading={loading} setLoading={setLoading} />
      <Reservation />
      <Contact />
      <div>
        <FoodDeliveryForm visible={visible} setVisible={setVisible} />
      </div>
    </div>
  );
};

export default App;
