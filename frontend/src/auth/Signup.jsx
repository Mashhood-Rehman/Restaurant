import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Signup = ({ setModal, setShowLogin }) => {
  const [user, setUser] = useState({ 
    firstname: "", 
    lastname: "", 
    password: "", 
    email: "" 
  });
  const [show, setShow] = useState(false);

  const passwordShow = () => {
    setShow(!show);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/usercreate`, user);
      if (response.data.success) {
        toast.success("Account Created! Please Sign in");
        // Switch back to login after successful signup
        setShowLogin(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCloseForm = () => {
    setModal(false);
    document.body.style.overflow = "auto";
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      className="transform-gpu"
    >
      <h4 className="text-2xl text-neutral-600 font-bold flex justify-center mb-6">
        Create Account
        <Icon icon="mdi:account-plus" width="30" className="ml-2 text-orange-500" height="26" />
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstname" className="block text-gray-700 font-semibold">
              First Name
            </label>
            <input
              name="firstname"
              type="text"
              id="firstname"
              value={user.firstname}
              onChange={changeHandler}
              className="border rounded-lg w-full p-3 bg-white text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
              required
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-gray-700 font-semibold">
              Last Name
            </label>
            <input
              name="lastname"
              type="text"
              id="lastname"
              value={user.lastname}
              onChange={changeHandler}
              className="border rounded-lg w-full p-3 bg-white text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={changeHandler}
            id="signup-email"
            className="border rounded-lg w-full p-3 bg-white text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold">
            Password
          </label>
          <input
            name="password"
            type={show ? "text" : "password"}
            value={user.password}
            onChange={changeHandler}
            id="password"
            className="border rounded-lg w-full p-3 bg-white text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out pr-12"
            required
          />
          <Icon
            icon={show ? "mdi:eye-off-outline" : "ph:eye"}
            className="absolute top-2/3 right-3 cursor-pointer transform -translate-y-1/2 transition duration-150 ease-in-out text-gray-500 hover:text-gray-700"
            onClick={passwordShow}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-green-600 focus:outline-none transition-all duration-150"
          >
            Create Account
          </motion.button>
          <button 
            type="button"
            onClick={handleCloseForm} 
            className="text-white bg-gray-500 py-2 px-3 rounded-md hover:bg-gray-600 transition duration-150"
          >
            Cancel
          </button>
        </div>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <span onClick={switchToLogin} className="text-blue-800 font-semibold cursor-pointer">
          Sign In
        </span>
      </p>
    </motion.div>
  );
};

export default Signup;