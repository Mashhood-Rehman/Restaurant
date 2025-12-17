import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Login from "../../auth/Login";
import Sidebar from "../Sidebar";
import { carouselImages, navbarSections } from '../../../utils/Data'
import { Icon } from "@iconify/react/dist/iconify.js";
import { IMAGES } from "../../assets/Images";
import CustomModal from "../constants/CustomModal";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../features/api/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const Navbar = () => {
  const [BGColor, SetBGColor] = useState("bg-white");
  const currentUser = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [formclose, setFormClose] = useState(false);
  const [logoutUser] = useLogoutMutation();
  const [userIn, setUserIn] = useState(null);
  const navigate = useNavigate(

  )

  useEffect(() => {
    if (currentUser) {
      setUserIn(currentUser);
    } else {
      setUserIn(null);
    }
  }, [currentUser, userIn]);

  useEffect(() => {
    const pressedEscapeKey = (e) => {
      const key = e?.key?.toLowerCase();
      if (key === 'escape') {
        setFormClose(false);
      }
    };
    window.addEventListener("keydown", pressedEscapeKey);
    return () => {
      window.removeEventListener("keydown", pressedEscapeKey);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      SetBGColor(window.scrollY > 30 ? "bg-white/30 backdrop-blur-lg" : "bg-white");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleForm = () => {
    setFormClose(!formclose);
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

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      setUserIn(null);
      await refetch()
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };
  const handleNavlinkScroll = (id) => {
    if (location.pathname === "/") {
      // Smooth scroll if already on home page
      scrollToSection(id);
    } else {
      navigate(`/#${id}`);
    }
  };
  return (
    <div className="flex z-[999] bg-white justify-between items-center">
      <div>
        <Sidebar open={open} setOpen={setOpen} />
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`navbar ${BGColor} duration-300 ease-in-out fixed z-20 flex justify-between items-center w-full px-4`}
        >
          {/* Mobile Layout */}
          <div className="lg:hidden flex justify-between items-center w-full">
            <MobileSidebar
              navbarSections={navbarSections}
              userIn={userIn}
              toggleForm={toggleForm}
              handleLogout={handleLogout}
              scrollToSection={scrollToSection}
              handleNavlinkScroll={handleNavlinkScroll}
            />


            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img
                src={IMAGES.LOGO}
                alt="Logo"
                height={70}
                width={80}
                className="cursor-pointer"
                onClick={() => scrollToSection("hero")}
              />
            </div>

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
                    <button onClick={() => setOpen(!open)} className="btn text-white btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center w-full">
            <div className="flex-shrink-0">
              <img
                src={IMAGES.LOGO}
                alt="Logo"
                height={70}
                width={80}
                className="ml-4 cursor-pointer"
                onClick={() => scrollToSection("hero")}
              />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <ul className="menu menu-horizontal px-1 flex items-center gap-2">
                {navbarSections.map((section, index) => (
                  <li key={index}>
                    <button onClick={() => handleNavlinkScroll(section.id)} className="hover:text-orange-500 text-black text-xl">
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-shrink-0 flex items-center gap-4 mr-4">
              {currentUser ? (
                <div className="relative group">
                  <div className="cursor-pointer p-2">
                    {currentUser?.profileImg ? (
                      <img
                        src={currentUser.profileImg || IMAGES.DUMMYIMG}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 hover:border-orange-500 transition duration-300 ease-in-out transform hover:scale-110"
                      />
                    ) : (
                      <Icon
                        icon="mdi:account-circle"
                        className="text-4xl text-gray-700 hover:text-orange-500 transition duration-300 ease-in-out transform hover:scale-110"
                      />
                    )}
                  </div>
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-12 hidden group-hover:block bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[200px]"
                  >
                    <li className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        {currentUser.profileImg ? (
                          <img
                            src={currentUser.profileImg}
                            alt={currentUser.name || "User"}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                            {currentUser.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="flex flex-col ">
                          <span className="font-semibold overflow-hidden truncate whitespace-nowrap max-w-[120px] text-sm">{currentUser?.userData?.name || "User"}</span>
                          <span className="text-xs overflow-hidden truncate whitespace-nowrap max-w-[120px]  text-gray-500">{currentUser?.userData?.email}</span>
                        </div>
                      </div>
                    </li>
                    <li className="p-3 ps-5 hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out cursor-pointer whitespace-nowrap">
                      <Link to='/orders' className="w-full text-left ">
                        Orders
                      </Link>
                    </li>
                    <li
                      className="p-3 ps-5 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out cursor-pointer whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </motion.ul>
                </div>
              ) : (
                <button onClick={toggleForm} className="bg-orange-500 hover:bg-orange-600 text-white flex justify-center px-6 py-2 rounded-lg">
                  Login
                </button>
              )}

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="text-black">
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
                      <button onClick={() => setOpen(!open)} className="btn text-white btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <CustomModal isOpen={formclose} heading='Login' onClose={() => setFormClose(false)}>
          <Login setFormClose={setFormClose} />
        </CustomModal>
      </div>
    </div>
  );
};

export default Navbar;