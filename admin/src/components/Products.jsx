import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/getAllProducts`)
      .then((response) => setProducts(response.data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const removeFood = async (_id) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/deleteProducts/${_id}`);
    try {
      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== _id));
        toast.success("Product Removed");
      }
    } catch (error) {
      toast.error("error", error);
    }
  };

  return (
    <>
      <div className="p-6 relative"> {/* Add relative position */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Products</h2>
        </div>
        <div
          className="overflow-x-auto"
          style={{ maxHeight: '300px', overflowY: 'auto' }} // Add styles for scrolling
        >
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products && Array.isArray(products) && products.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td>
                    <img src={`http://localhost:5000${row.picture}`} className='py-3 px-4 h-24 w-24 rounded-full text-left' alt="product" />
                  </td>
                  <td className="py-3 px-4 text-left font-semibold">{row.name}</td>
                  <td className="py-3 px-4 text-left font-semibold">${row.price}</td>
                  <td className="py-3 px-4 text-left font-semibold">{row.category}</td>
                  <td className="py-3 px-4 text-left">
                    <div className="flex space-x-2">
                      <button onClick={() => removeFood(row._id)} className="text-black px-2 py-2 rounded-full hover:bg-red-500 duration-200 ease-in-out">
                        <Icon icon="tabler:http-delete" width="21" height="21" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/AddItems" className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">
          Add Item
        </Link>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Products;
