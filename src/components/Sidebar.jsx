import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const SideBar = ( ) => {
  // const [open, setOpen] = useState(false);
  // const [Price, setPrice] = useState(0);

  // var ans = 0;

  // const handleAdd = (item) => {
  //   const addItem = cart.map((cartItem) =>
  //     cartItem.id === item.id
  //       ? { ...cartItem, amount: cartItem.amount + 1 }
  //       : cartItem
  //   );
  //   setCart(addItem);
  // };

  // const handleRemove = (item) => {
  //   const removeItem = cart.map((cartItem) =>
  //     cartItem.id === item.id && cartItem.amount > 0
  //       ? { ...cartItem, amount: Math.max(cartItem.amount - 1, 0) }
  //       : cartItem
  //   );
  //   setCart(removeItem);
  // };

  // const handleRemoveAll = (item) => {
  //   const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
  //   setCart(updatedCart);
  // };

  // const getTotalAmount = () => {
  //   cart.map((item) => {
  //     console.log("here is item", item);
  //     ans += item.amount * item.price;
  //   });
  //   setPrice(ans);
  // };

  // useEffect(() => {
  //   getTotalAmount();
  // }, [cart]);

  // console.log(isopen);

  return (
    <>
      <div className="flex  items-center">
        {/* <div
          className="sidebar  fixed top-0 right-0   mt-16 w-96 md:w-64 sm:w-48 bg-blue-400 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
          style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
        >
          {open && (
            <>
              <div className="flex justify-between  items-center p-4">
                <span className="text-xl font-bold">{size}</span>
              </div>
              <div className="overflow-y-auto p-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <img
                      src={item.img}
                      className="w-16 h-16 rounded-md"
                      alt={item.id}
                    />
                    <div className="flex flex-col mt-4 ml-2">
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
                          className="px-2 py-1 bg-blue-500   font-extrabold  text-white rounded-md"
                          onClick={() => handleAdd(item)}
                        >
                          +
                        </button>
                        <button
                          className="ml-2 px-2 py-1 text-white rounded-md"
                          onClick={() => handleRemoveAll(item)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <button className="font-bold text-lg">
                    Total price:${Price}
                  </button>
                </div>
                <div className="mt-4 text-black">
                  <button
                    type="button"
                    className="w-full py-2 bg-blue-500  ml-4  font-bold rounded-md"
                    onClick={() => setVisible(true)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div> */}
      </div>
    </>
  );
};

export default SideBar;
