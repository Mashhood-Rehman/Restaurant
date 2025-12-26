import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import CustomTable from "../constants/CustomTable";
import { headers } from "../../../utils/Data";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../features/api/productApi";
import { toast } from "react-toastify";
import { Icons } from "../../assets/Icons";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    amount: "",
    picture: null,
    category: "",
    description: "",
  });

  const categories = ["FastFood", "Desi", "Chinese", "Desserts", "Drinks"];

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: productsData, isLoading, refetch } = useGetProductsQuery();

  /* -------------------- handlers -------------------- */

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setFormData((prev) => ({ ...prev, picture: file }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      amount: "",
      picture: null,
      category: "",
      description: "",
    });
    setImagePreview(null);
    setSelectedId(null);
    setIsEdit(false);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setSelectedId(product._id);
    setShowModal(true);
    setFormData({
      name: product.name,
      price: product.price,
      amount: product.amount,
      picture: product.picture,
      category: product.category,
      description: product.description,
    });

    setImagePreview(product.picture);
  };

  const handleDelete = async (id) => {

    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async () => {
    try {
    const formDataToSend = new FormData();
formDataToSend.append("name", formData.name);
formDataToSend.append("price", formData.price);
formDataToSend.append("amount", formData.amount);
formDataToSend.append("category", formData.category);
formDataToSend.append("description", formData.description);

// Only append picture if it exists
if (formData.picture) {
  formDataToSend.append("picture", formData.picture);
}

      if (isEdit) {
        await updateProduct({
          id: selectedId,
          data: formDataToSend,
        }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(formDataToSend).unwrap();
        toast.success("Product added successfully");
      }
      refetch()
      handleClose();
    } catch (error) {
      console.log("error", error)
      toast.error("Something went wrong");
    }
  };

  /* -------------------- table data -------------------- */

  const tableData =
    productsData?.products?.map((product) => ({
      ...product,
      actions: (
        <div className="flex gap-3">
          <button
            onClick={() => handleEdit(product)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => handleDelete(product._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    })) || [];

  /* -------------------- UI -------------------- */

  return (
    <div>
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Icons.Plus />
          Add Product
        </button>
      </div>

      <CustomTable tableHeaders={headers} tableData={tableData} />

      {/* -------------------- Modal -------------------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl">
            <div className="flex justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Update Product" : "Add New Product"}
              </h2>
              <button onClick={handleClose}>✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image */}
              <div className="relative h-32 border-2 border-dashed rounded-xl flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <Icons.File className="text-5xl text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              <input
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e.target)}
                className="custom_input"
                placeholder="Product name"
              />

              <select
                name="category"
                value={formData.category}
                onChange={(e) => handleInputChange(e.target)}
                className="custom_input"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

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

              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e.target)}
                className="custom_input"
                rows="3"
                placeholder="Description"
              />
            </div>

            <div className="flex gap-3 p-4 border-t">
              <button onClick={handleClose} className="flex-1 border rounded py-2">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-orange-500 text-white rounded py-2"
              >
                {isEdit ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
