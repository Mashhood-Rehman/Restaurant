import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Signup from "./Signup";
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/api/AuthApi";
import { useGetMeQuery } from "../features/api/userApi";

const Login = ({ setFormClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [loginData] = useLoginMutation()
  const passwordShow = () => setShow(!show);
const { refetch } = useGetMeQuery();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await loginData(user).unwrap();
      if (response) {
        toast.success("User logged in");
        await refetch()
        handleCloseForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  const handleCloseForm = () => {
    setFormClose(false);
    document.body.style.overflow = "auto";
  };

  const toggleSignup = () => {
    setShowLogin(false);
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/google";
  };

  if (!showLogin) {
    return (
      <Signup
        setModal={setFormClose}
        setShowLogin={setShowLogin}
      />
    );
  }

  return (
    <div>

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            className="border rounded-lg w-full p-3 bg-white text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
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
            className="border rounded-lg w-full bg-white p-3 focus:outline-none shadow-lg transition-all duration-200 ease-in-out pr-12"
            type={show ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={changeHandler}
            required
          />
          <Icon
            icon={show ? "mdi:eye-off-outline" : "ph:eye"}
            className="absolute top-2/3 right-3 cursor-pointer transform -translate-y-1/2 transition duration-150 ease-in-out text-gray-500 hover:text-gray-700"
            onClick={passwordShow}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-600 focus:outline-none transition-all duration-150"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleCloseForm}
            className="text-white bg-black py-2 px-3 rounded-md hover:bg-gray-800 transition duration-150"
          >
            Order as Guest
          </button>
        </div>
        <div className="border-t my-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-50 focus:outline-none transition-all duration-150"
          >
            Sign in with Google
          </button>      </div>
      </form>
      <p className="text-center mt-4 text-gray-600">
        New here?
        <span onClick={toggleSignup} className="text-blue-800 ml-1 font-semibold cursor-pointer">
          Create Account
        </span>
      </p>

    </div>
  );
};

export default Login;