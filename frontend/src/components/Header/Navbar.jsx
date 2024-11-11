import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Modal, ModalTrigger } from "../OK";
import Login from "../../auth/Login";
import Sidebar from "../Sidebar";
import { navbarSections } from "../Data";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = () => {
  const [BGColor, SetBGColor] = useState("bg-transparent");
  const [open, setOpen] = useState(false);
  const [formclose, setFormClose] = useState(false); 
  const [userIn, setUserIn] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserIn(token); 

    const handleScroll = () => {
      SetBGColor(window.scrollY > 30 ? "bg-white" : "bg-transparent");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleForm = () => {
    setFormClose(!formclose);
    localStorage.setItem("formclose", !formclose); 
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setUserIn(""); 
  };

  return (
    <div className="flex z-50 bg-white items-center">
      <div>
        <Sidebar open={open} setOpen={setOpen} />
        <Modal>
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`navbar ${BGColor} duration-300 ease-in-out fixed z-20`}
          >
            <div className="navbar-start">
            <div className="dropdown">
  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 text-black w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
    </svg>
  </div>
  <ul className="menu menu-sm dropdown-content bg-white z-50 mt-3 w-52 p-2">
    {navbarSections.map((section, index) => (
      <li key={index} className="relative">
        <button
          onClick={() => scrollToSection(section.id)}
          className="hover:text-orange-500 text-xl"
        >
          {section.name}
        </button>
      </li>
    ))}
    {userIn ? (
      <div>
        <li>
          <button className="w-full text-left" onClick={() => scrollToSection("orders")}>
            Orders
          </button>
        </li>
        <li>
          <button
            className="w-full text-left text-red-500 hover:text-white hover:bg-red-500 transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </div>
    ) : (
      <div>
        <ModalTrigger className="dark:bg-white dark:text-black text-black flex justify-center group/modal-btn">
          <span onClick={toggleForm} className="text-center cursor-pointer">
            Login
          </span>
        </ModalTrigger>
      </div>
    )}
  </ul>
</div>

              <img
                src={"logoo.jpeg.png"}
                alt="Logo"
                className="w-32 h-32 ml-8 cursor-pointer"
                onClick={() => scrollToSection("landingpage")}
              />
            </div>
            <div className="navbar-center hidden lg:flex items-center jc">
              <ul className="menu menu-horizontal px-1">
                {navbarSections.map((section, index) => (
                  <li key={index}>
                    <button onClick={() => scrollToSection(section.id)} className="hover:text-orange-500 text-xl">
                      {section.name}
                    </button>
                  </li>
                ))}
                <li>
                  {userIn ? (
                    <div className="relative group">
                    {/* Profile Icon */}
                    <div className="cursor-pointer p-2">
                      <Icon
                        icon="mdi:account-circle"
                        className="text-4xl text-gray-700 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-110"
                      />
                    </div>
    
                    {/* Dropdown on hover with Framer Motion animation */}
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 top-14 mt-2 hidden group-hover:block bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <li className="p-3 hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out cursor-pointer">
                        Orders
                      </li>
                      <li
                        className="p-3 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </motion.ul>
                  </div>
                  ) : (
                    <ModalTrigger className="bg-black dark:bg-orange-500 dark:text-black text-white flex justify-center group/modal-btn">
                      <span onClick={toggleForm} className="text-center cursor-pointer">
                        Login
                      </span>
                    </ModalTrigger>
                  )}
                </li>
              </ul>
            </div>
            <Login setFormClose={setFormClose} formclose={formclose} setUserIn={setUserIn} />
            <div className="flex-none px-10">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <span className="text-xl font-bold">{totalQuantity}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="card card-compact dropdown-content z-[1] mt-3 w-52 shadow">
                  <div className="card-body bg-white">
                    <span className="text-lg font-bold">{totalQuantity}</span>
                    <span className="text-info">Subtotal: ${totalAmount}</span>
                    <div className="card-actions">
                      <button onClick={() => setOpen(!open)} className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
