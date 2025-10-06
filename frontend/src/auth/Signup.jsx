import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../features/api/AuthApi';

const Signup = ({ setModal, setShowLogin }) => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: ""
  });
  const [show, setShow] = useState(false);
  const [signup, { isLoading, error }] = useSignupMutation()
  const passwordShow = () => {
    setShow(!show);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.name || !user.email || !user.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await signup(user).unwrap();
      if (response) {
        toast.success("Account Created! Please Sign in");
        setModal(false);
      }
    } catch (err) {
      console.error(err);

      const message =
        err?.data?.message ||
        err?.error ||
        "Something went wrong";

      toast.error(message);
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
    <div

    >
      <h4 className="text-2xl text-neutral-600 font-bold flex justify-center mb-6">
        Create Account
        <Icon icon="mdi:account-plus" width="30" className="ml-2 text-orange-500" height="26" />
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold">
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            value={user.name}
            onChange={changeHandler}
            className="border rounded-lg w-full p-3 bg-white text-gray-700 focus:outline-none shadow-lg transition-all duration-200 ease-in-out"
            required
          />
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
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-green-600 focus:outline-none transition-all duration-150"
          >
            Create Account
          </button>
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
        Already have an account?
        <span onClick={switchToLogin} className="text-blue-800 font-semibold cursor-pointer">
          Sign In
        </span>
      </p>
    </div>
  );
};

export default Signup;