import React from "react";
import Product from "./products/Product";
import "./App.css";
import FastFood from "./products/FastFood";
import Desi from "./products/Desi";
import Chinese from "./products/Chinese";
import Desserts from "./products/Desserts";
import Drinks from "./products/Drinks";
import Contact from "./Contact";
import Reservation from "./Reservation";
// import Slider from "./Slider";
const App = () => {
  return (
    <div>
      {/* <Slider /> */}
      <Product />
      <FastFood />
      <Desi />
      <Chinese />
      <Desserts />
      <Drinks />
      <Reservation />
      <Contact />
    </div>
  );
};

export default App;
