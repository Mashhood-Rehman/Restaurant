import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const AddItem = () => {

  const navigate = useNavigate();
  const [data, setData ] =useState({
    name : "",
    amount : "",
    category : "FastFood",
    price : "",
    description : ""
  })
const changeHandler = (e) => {
  const name = e.target.name;
  const value = e.target.value
 setData(data => ({...data , [name] : value}))
}
 
const [image, setImage] = useState(false)
useEffect(()=> {
}, [data])
const onSubmit = async (e) => {
  e.preventDefault();

  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("amount", data.amount);
  formdata.append("price", Number(data.price));
  formdata.append("category", data.category);
  formdata.append("description", data.description);
  if (image) {
    formdata.append("picture", image);
  }

  console.log("Submitting form data:", {
    name: data.name,
    amount: data.amount,
    price: data.price,
    category: data.category,
    description: data.description,
    image: image ? image.name : null, // Just for debugging
  });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/productcreate`, formdata);
    if (response.data.success) {
      setData({
        name: "",
        amount: "",
        category: "FastFood",
        price: "",
        description: ""
      });
      setImage(null); // Reset image state
    } else {
      console.error("Error submitting data:", response.data.message);
    }
  } catch (error) {
    console.error("Error during submission:", error);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit}>

    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
            <img src={image ? URL.createObjectURL(image) : ''} className="h-24 w-24" alt="Uploaded" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="picture"
            name="picture"
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            onChange={changeHandler}
            value={data.name}
            id="name"
            name="name"
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter item name"
            required
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={changeHandler}
            value={data.category}
            className=" appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          >
            <option value="FastFood">FastFood</option>
            <option value="Chinese">Chinese</option>
            <option value="Dessert">Dessert</option>
            <option value="Drinks">Drinks</option>
            <option value="Desi">Desi</option>
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            onChange={changeHandler}
            value={data.amount}
            id="amount"
            name="amount"
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter amount"
            required
          />
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={changeHandler}
            value={data.price}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter price"
            required
          />
        </div>
  
        <div className="mb-6 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={changeHandler}
            value={data.description}
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter item description"
            rows="4"
            required
          />
        </div>
      </div>
  
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Add Item
        </button>
        <button
          type="button"
          onClick={() => navigate('/items')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Back
        </button>
      </div>
    </div>
    </form>
    
    </div>

  
  );
};

export default AddItem;
