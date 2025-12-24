import { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomTable from "../constants/CustomTable";
import { headers } from "../../../utils/Data";
import CustomModal from "../constants/CustomModal";
import { useCreateProductMutation, useGetProductsQuery } from '../../features/api/productApi';
import { toast } from 'react-toastify';


const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    amount: '',
    picture: null,
    category: '',
    description: ''
  });

  const categories = [
    'FastFood',
    'Desi',
    'Chinese',
    'Desserts',
    'Drinks',
  ];

  const [createProduct] = useCreateProductMutation();
  const { data: productsData, isLoading, error } = useGetProductsQuery();
  console.log(productsData);
  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData(prev => ({
        ...prev,
        picture: file
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('amount', formData.amount);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      if (formData.picture) {
        formDataToSend.append('picture', formData.picture);
      }

      const result = await createProduct(formDataToSend);
      if (result.data) {
        toast.success("Product added successfully");
        resetForm();
        setShowModal(false);
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      toast.error("Error adding product: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      amount: '',
      picture: null,
      category: '',
      description: ''
    });
    setImagePreview(null);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2"
        >
          <Icon icon="mdi:plus" />
          Add Product
        </button>
      </div>
      <CustomTable tableHeaders={headers} tableData={productsData?.products || []} />

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

          {/* Modal Box */}
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">

              {/* Image Upload */}
              <div className="relative w-full h-32 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="text-center">
                    <Icon icon="mdi:image-outline" className="text-5xl" />
                    <p className="text-sm">Upload Product Image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e.target)}
                className="custom_input"
                placeholder="Product name"
              />

              {/* Category */}
              <select
                name="category"
                value={formData.category}
                onChange={(e) => handleInputChange(e.target)}
                className="custom_input"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange(e.target)}
                  className="custom_input"
                  placeholder="Price"
                />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange(e.target)}
                  className="custom_input"
                  placeholder="Stock"
                />
              </div>

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e.target)}
                className="custom_input"
                rows="3"
                placeholder="Description"
              />
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 border-t">
              <button
                onClick={handleClose}
                className="flex-1 border rounded-lg py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-orange-500 text-white rounded-lg py-2"
              >
                Add Product
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Products;