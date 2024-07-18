import React, { useEffect, useState } from "react";
import axios from "axios";

const FastFood = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (item) => {
    const isPresent = cart.some((product) => product.id === item.id);
    if (isPresent) return;
    setCart([...cart, item]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getProducts/FastFood"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Error fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(products);

  return (
    <div id="Chinese">
      <div className="flex flex-col bg-white m-auto p-auto">
        <h1 className="flex py-5 md:px-10 lg:mx-40 md:mx-20 font-bold text-4xl text-gray-800">
          Fast Food
        </h1>
        <div className="flex flex-row overflow-x-scroll lg:overflow-x-hidden pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:flex-wrap space-x-4 lg:space-x-4 lg:space-y-4">
            {Array.isArray(products) &&
              products.map((item) => (
                <div
                  key={item.id}
                  className="border border-grey-100 p-4 w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-72 lg:h-80 flex-shrink-0 lg:flex-shrink-0 space-y-3.5 hover:border-blue-500 hover:border-2 rounded-lg"
                >
                  <img
                    src={item.picture}
                    className="h-40 w-full object-cover mx-auto"
                    alt={item.name}
                  />
                  <p className="font-semibold text-xl">{item.name}</p>
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl">${item.price}</p>
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

export default FastFood;
