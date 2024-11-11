import { Icon } from '@iconify/react';

import axios from 'axios';
import React , {useState } from 'react';
import { toast } from 'react-toastify';
const Signup = ({ setModal }) => {
  const [user, setUser] = useState({ firstname: "",lastname: "", password: "" , email : "" });
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
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/usercreate`, user);
      if (response.data.success) {
        toast.success(`Account Created,Please Sign in`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred", error.message);
    }
    handleCloseForm()
  };

  const handleCloseForm = () => {
    setModal(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={() => setModal(false)}
          className="absolute top-2 right-2 h-8 w-8 text-gray-600 hover:text-gray-900"
        >
          <Icon icon="icon-park:close" width="21" height="21" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700">First Name:</label>
            <input
              name="firstname"
              type="text"
              id="firstname"
              value={user.firstname}
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700">Last Name:</label>
            <input
              name="lastname"
              type="text"
              id="lastname"
              value={user.lastname}
              onChange={changeHandler}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={changeHandler}
              id="signup-email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <div>

            <input
              name="password"
              type={show ? "text" : "password"}
              value={user.password}
              onChange={changeHandler}
              id="password"
              className="w-full relative  px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              />
               <p
                  onClick={passwordShow}
                  className="absolute top-[100%] right-2 md:right-3 lg:top-[76%] lg:right-8 hover:text-red-600 cursor-pointer duration-200 ease-in-out transform  transition-all -translate-y-1/2"
                >
                  {show ? (
                    <Icon icon="mdi:eye-off-outline" className="w-6 h-6" />
                  ) : (
                    <Icon icon="ph:eye" className="w-6 h-6" />
                  )}
                </p>
              </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 mb-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
