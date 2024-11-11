import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Signup from "./Signup";
import { toast } from "react-toastify";

const Login = ({ setFormClose, formclose }) => {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const passwordShow = () => setShow(!show);
  const toggleSignup = () => setModal(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email && !password) {
      alert("All fields are required");
    }
    if (!email) {
      toast.error("Incorrect email");
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, user);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("User logged in");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setFormClose(false);
    localStorage.setItem("formclose", "false"); // Update local storage
    document.body.style.overflow = "auto";
  };

  if (formclose) {
    document.body.style.overflow = "hidden"; // Disable background scroll
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {formclose && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            className="bg-white p-8 rounded-lg shadow-2xl w-11/12 max-w-md transform-gpu"
          >
            <h4 className="text-2xl text-neutral-600 font-bold flex justify-center mb-6">
              Keep it
              <Icon icon="mdi:food-halal" width="30" className="ml-2 text-blue-700" height="26" />
            </h4>
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  className="border rounded-lg w-full p-3 text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="relative">
                <label className="block text-gray-700 font-semibold">Password</label>
                <input
                  className="border rounded-lg w-full p-3 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
                  type={show ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={changeHandler}
                  required
                />
                <Icon
                  icon={show ? "mdi:eye-off-outline" : "ph:eye"}
                  className="absolute top-2/3 right-3 cursor-pointer transform -translate-y-1/2 transition duration-150 ease-in-out"
                  onClick={passwordShow}
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-150"
                >
                  Sign In
                </motion.button>
                <button onClick={handleCloseForm} className="text-white bg-black py-2 px-3 rounded-md">
                  Order as Guest
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-gray-600">
              New here?{" "}
              <span onClick={toggleSignup} className="text-blue-800 font-semibold cursor-pointer">
                Create Account
              </span>
            </p>
          </motion.div>
        </div>
      )}
      {modal && <Signup modal={modal} setModal={setModal} />}
    </>
  );
};

export default Login;
