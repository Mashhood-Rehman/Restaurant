import { Icon } from "@iconify/react/dist/iconify.js";
import CustomTable from "../constants/CustomTable";
import { useGetAllUsersQuery } from "../../features/api/userApi";
import { Link } from "react-router-dom";

const Customers = () => {

  const {data, error} = useGetAllUsersQuery()
const tableData = data?.getUsers
  const headers = [
    { key: 'id', label: 'id'  },
    { key: 'name', label: 'Name'  },
    { key: 'email', label: 'Email' },
    { key: 'orders', label: 'Total Orders' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
      </div>
      <CustomTable tableHeaders={headers} tableData={tableData} />
    </div>
  );
};

 export default Customers;