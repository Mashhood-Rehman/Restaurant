import { Icon } from "@iconify/react/dist/iconify.js";
import CustomTable from "../constants/CustomTable";

const Users = () => {
  const users = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', joinDate: '2024-01-15', orders: 12 },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', joinDate: '2024-02-20', orders: 8 },
    { _id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', joinDate: '2024-03-10', orders: 15 },
    { _id: '4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1234567893', joinDate: '2024-04-05', orders: 6 },
    { _id: '5', name: 'David Brown', email: 'david@example.com', phone: '+1234567894', joinDate: '2024-05-12', orders: 20 },
    { _id: '6', name: 'Emily Davis', email: 'emily@example.com', phone: '+1234567895', joinDate: '2024-06-18', orders: 4 },
  ];

  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'joinDate', label: 'Join Date' },
    { key: 'orders', label: 'Total Orders' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2">
          <Icon  icon="mdi:account-plus" />
          Add User
        </button>
      </div>
      <CustomTable tableHeaders={headers} tableData={users} />
    </div>
  );
};

 export default Users;