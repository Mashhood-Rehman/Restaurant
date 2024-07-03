import React, { useState } from 'react';

  const FoodDeliveryForm = ()=> {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    items: [{ itemName: '', quantity: 1 }],
    deliveryOption: 'standard',
    deliveryTime: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'itemName') {
      const updatedItems = [...formData.items];
      updatedItems[index][name] = value;
      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addNewItem = () => {
    const newItems = [...formData.items, { itemName: '', quantity: 1 }];
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: '',
      address: '',
      phone: '',
      items: [{ itemName: '', quantity: 1 }],
      deliveryOption: 'standard',
      deliveryTime: '',
    });
  };

  return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Delivery</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="items">
            Items to Order
          </label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex mb-2 items-center">
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Item Name"
                name="itemName"
                value={item.itemName}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                className="ml-2 w-1/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="1"
                placeholder="Qty"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(e, index)}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => removeItem(index)}
                >
                  &#x2715;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={addNewItem}
          >
            Add Item
          </button>
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryOption">
            Delivery Option
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deliveryOption"
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
          >
            <option value="standard">Standard Delivery</option>
            <option value="express">Express Delivery (+$10)</option>
          </select>
        </div>
        <div className="mb-6">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryTime">
            Preferred Delivery Time
          </label> */}
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deliveryTime"
            type="text"
            placeholder="Preferred Delivery Time"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
          /> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodDeliveryForm;
