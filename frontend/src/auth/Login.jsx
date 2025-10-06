  import React, { useState } from "react";
  import axios from "axios";
  import { Icon } from "@iconify/react";
  import Signup from "./Signup";
  import { toast } from "react-toastify";

  const Login = ({ setFormClose }) => {
    const [showLogin, setShowLogin] = useState(true);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" });

    const passwordShow = () => setShow(!show);

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
        const response = await axios.post(`${import.meta.env.VITE_API_GATEWAY_BASE_URL}/auth/login`, user);
        if (response.data) {
          localStorage.setItem("token", response.data.token);
          toast.success("User logged in");
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
        <h4 className="text-2xl text-neutral-600 font-bold flex justify-center mb-6">
          Keep it
          <Icon icon="mdi:food-halal" width="30" className="ml-2 text-blue-700" height="26" />
        </h4>
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
        </form>
        <p className="text-center mt-4 text-gray-600">
          New here?
          <span onClick={toggleSignup} className="text-blue-800 font-semibold cursor-pointer">
            Create Account
          </span>
        </p>
      </div>
    );
  };

  export default Login;