import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

import Sidebar from "./Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import FoodDeliveryForm from "./FoodDeliveryForm";

const Navbar = ({ cart, setCart, size , }) => {
  const [open, setOpen] = useState(true);
  const [Price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  var ans = 0;

  const handleAdd = (item) => {
    const addItem = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, amount: cartItem.amount + 1 }
        : cartItem
    );
    setCart(addItem);
  };

  const handleRemove = (item) => {
    const removeItem = cart.map((cartItem) =>
      cartItem.id === item.id && cartItem.amount > 0
        ? { ...cartItem, amount: Math.max(cartItem.amount - 1, 0) }
        : cartItem
    );
    setCart(removeItem);
  };

  const handleRemoveAll = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };
  const getTotalAmount = () => {
    cart.map((item) => {
      ans += item.amount * item.price + 5;
    });
    setPrice(ans);
  };

  useEffect(() => {
    getTotalAmount();
  }, [cart]);
  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 "
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="sidebar mt-6 fixed top-20 overflow-auto   right-0 h-3/4 w-96   bg-blue-400 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {open && (
          <>
            <div className="flex-none px-10">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                ></div>
              </div>
            </div>

            {isOpen && <FoodDeliveryForm/>}

            <div className="overflow-y-auto p-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.img}
                    className="w-32 h-32 rounded-full object-cover"
                    alt={item.id}
                  />
                  <div className="flex flex-col ml-2">
                    <p className="font-semibold">{item.id}</p>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-1">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => handleRemove(item)}
                      >
                        -
                      </button>
                      <p className="px-2">{item.amount}</p>
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => handleAdd(item)}
                      >
                        +
                      </button>
                      <button
                        className="ml-2 px-2 py-1 text-white rounded-md"
                        onClick={() => handleRemoveAll(item)}
                      >
                        <Icon icon="fluent-mdl2:delete" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col mb-10">
              <div className="">
                <button
                  className="font-semibold  text-black text-xl "
                  onClick={() => getTotalAmount()}
                >
                  Delivery Fee:$5
                </button>
                <button
                  className="font-bold  text-xl  text-black "
                  onClick={() => getTotalAmount()}
                >
                  Total price:${Price}{" "}
                  <span className=" font-light text-black">
                    (Including Delivery Fee)
                  </span>
                </button>
              </div>
              <div className="flex justify-center">
                <button className=" w-3/4 py-2 absolute  bg-blue-500 text-white hover:bg-blue-800 duration-300  font-bold rounded-md" onClick={() => setIsOpen(!isopen)}>
                  Checkout
                </button>
              </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Sidebar size={cart.length} cart={cart} setCart={setCart} />
      <div className="navbar bg-base-100 fixed z-20">
        <div className="navbar">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="Product" smooth={true} duration={1000}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="Product" smooth={true} duration={1000}>
                  Menu
                </Link>
              </li>
              <li>
                <Link to="Reservation" smooth={true} duration={1000}>
                  Reservation
                </Link>
              </li>
              <li>
                <Link>Delivery</Link>
              </li>
            </ul>
          </div>
          <Link
            to="Product"
            smooth={true}
            duration={1000}
            className="btn hover:text-black-800 hover:bg-blue-800 duration-500 ease-in-out text-xl"
          >
            Nachoo Daddy
          </Link>
        </div>
        <div className="navbar hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="Product"
                smooth={true}
                duration={1000}
                className="hover:text-blue-700 text-xl"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="Product"
                smooth={true}
                duration={1000}
                className="hover:text-blue-700 text-xl"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="Reservation"
                smooth={true}
                duration={500}
                className="hover:text-blue-700  text-xl"
              >
                Reservation
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-700 text-xl">Delivery</Link>
            </li>
          </ul>
        </div>

        <div className="flex-none px-10">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <span className="text-xl font-bold ">{size}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{size}</span>
                <span className="text-info">Subtotal: ${Price}</span>
                <div className={`card-actions `}>
                  <button
                    onClick={() => setOpen(!open)}
                    className={`btn btn-primary btn-block  `}
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;