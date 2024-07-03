import React from "react";
import { DesiData } from "../../data";

const Desi = ({ cart, setCart }) => {
  const [showcart, setShowCart] = [""];
  const handleClick = (item) => {
    const isPresent = cart.some((product) => product.id === item.id);
    if (isPresent) return;
    setCart([...cart, item]);
    setShowCart(cart);
  };
  return (
    <div>
      <div class="flex flex-col bg-white m-auto p-auto">
        <h1 class="flex py-5 md:px-10 lg:mx-40 md:mx-20 font-bold text-4xl text-gray-800">
          Our Desi Cuisine
        </h1>
        <div class="flex flex-row overflow-x-scroll lg:overflow-x-hidden pb-10 hide-scroll-bar">
          <div class="flex flex-nowrap lg:flex-wrap space-x-4 lg:space-x-4 lg:space-y-4">
            {DesiData.map((item) => (
              <div
                className="border border-grey-100 p-4 w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-72 lg:h-80 flex-shrink-0 lg:flex-shrink-0 space-y-3.5 hover:border-blue-500 hover:border-2 rounded-lg"
                key={item.id}
              >
                <img
                  src={item.img}
                  class="h-40 w-40 object-cover mx-auto"
                  alt={item.id}
                />
                <p className="font-semibold text-xl">{item.id}</p>
                <div className="flex justify-between">
                  <p className="font-bold text-2xl"> ${item.price}</p>
                  <button
                    className="bg-blue-500 text-white rounded-2xl p-2"
                    onClick={() => handleClick(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desi;
