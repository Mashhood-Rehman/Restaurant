import React from "react";
import { motion } from "framer-motion";

const Landingpage = () => {
  return (
    <div
      id="landingpage"
      className="flex flex-col  lg:flex-row justify-center items-center lg:mt-[10%] mt-[20%]  px-4"
    >
      <div className="text-center  lg:w-1/2">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className=" text-4xl font-serif font-extrabold lg:text-6xl"
        >
          Nacho Daddy
        </motion.h1>
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-bold  text-xl bg-gradient-to-r from-blue-400 via-blue-600 to-blue-950 text-transparent bg-clip-text"
        >
          Baray araam se
        </motion.h2>
      </div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center lg:w-1/2"
      >
        <img
          src="girlpic.png"
          alt="Intro pic"
          className="h-auto max-w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Landingpage;
