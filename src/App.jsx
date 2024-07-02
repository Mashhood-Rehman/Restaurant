import React, { useState } from "react";
import Product from "./products/Product";
import "./App.css";
import FastFood from "./products/FastFood";
import Desi from "./products/Desi";
import Chinese from "./products/Chinese";
import Desserts from "./products/Desserts";
import Drinks from "./products/Drinks";
import Contact from "./Contact";
import Reservation from "./Reservation";
import AddtoCart from "./AddtoCart";
// import Slider from "./Slider";
import Sidebar from "./Sidebar";
const App = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  return (
    <div>
      <Sidebar size={cart.length} cart={cart} setCart={setCart} />
      {/* <Slider /> */}
      <AddtoCart />
      <Product />
      <FastFood cart={cart} setCart={setCart} />
      <Desi cart={cart} setCart={setCart} />
      <Chinese cart={cart} setCart={setCart} />
      <Desserts cart={cart} setCart={setCart} />
      <Drinks cart={cart} setCart={setCart} />
      <Reservation />
      <Contact />
    </div>
  );
};

export default App;
