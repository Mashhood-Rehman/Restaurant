import { useState } from "react";
import { motion } from "framer-motion";
import FastFood from "./FastFood";
import Drinks from "./Drinks";
import Desserts from "./Desserts";
import Chinese from "./Chinese";
import Desi from "./Desi";
import CategoryProducts from "./CategoryProducts";

const Product = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderContent = () => {
    switch (activeTab) {
      case "All":
        return (
          <>
            <CategoryProducts category="FastFood" />
            <CategoryProducts category="Desi" />
            <CategoryProducts category="Desserts" />
            <CategoryProducts category="Chinese" />
            <CategoryProducts category="Drinks" />
          </>
        );
      case "Fast Food":
        return <CategoryProducts category="FastFood" />;
      case"Desi":
        return   <CategoryProducts  category="Desi" />;
      case "Chinese":
        return <CategoryProducts category="Chinese" />;
      case "Desserts":
        return <CategoryProducts category="Desserts" />;
      case "Drinks":
        return <CategoryProducts category="Drinks" />;
      default:
        return null;
    }
  };

  return (
    <div id="Product" className="bg-white m-auto p-5 lg:px-20">
      <h2 style={{
        fontFamily: 'Dancing Script, cursive',
        fontSize: '2rem',
        fontWeight: '4rem',
      }} className="text-3xl font-bold text-center text-orange-500 mb-8">
        <span> -</span>Food Menu<span> -</span>
      </h2>
      <h1 className=" flex justify-center text-xl items-center font-bold  lg:text-4xl text-black font-sans tracking-wide mb-4">Most Popular Items</h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["All", "Fast Food", "Desi", "Chinese", "Desserts", "Drinks"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-300`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="  p-5 rounded-lg ">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2"
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
