import { Icon } from "@iconify/react/dist/iconify.js";
import CustomTable from "../constants/CustomTable";

const Products = () => {
  const products = [
    { _id: '1', name: 'Margherita Pizza', category: 'Pizza', price: '$12.99', quantity: 25, status: 'In Stock' },
    { _id: '2', name: 'Pepperoni Pizza', category: 'Pizza', price: '$14.99', quantity: 18, status: 'In Stock' },
    { _id: '3', name: 'Cheese Burger', category: 'Burgers', price: '$9.99', quantity: 32, status: 'In Stock' },
    { _id: '4', name: 'Veggie Burger', category: 'Burgers', price: '$8.99', quantity: 15, status: 'In Stock' },
    { _id: '5', name: 'Spaghetti Carbonara', category: 'Pasta', price: '$11.99', quantity: 8, status: 'Low Stock' },
    { _id: '6', name: 'Penne Arrabbiata', category: 'Pasta', price: '$10.99', quantity: 20, status: 'In Stock' },
    { _id: '7', name: 'Caesar Salad', category: 'Salads', price: '$7.99', quantity: 12, status: 'In Stock' },
    { _id: '8', name: 'Greek Salad', category: 'Salads', price: '$8.49', quantity: 0, status: 'Out of Stock' },
  ];

  const headers = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2">
          <Icon icon="mdi:plus" />
          Add Product
        </button>
      </div>
      <CustomTable tableHeaders={headers} tableData={products} />
    </div>
  );
};
export default Products;