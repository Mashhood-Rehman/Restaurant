import CustomTable from "../constants/CustomTable";
import { useGetAllCustomersQuery } from "../../features/api/userApi";

const Customers = () => {

  const { data, isLoading, isError } = useGetAllCustomersQuery()
  const tableData = data?.Customers?.length > 0 ? data?.Customers : [];
  const headers = [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'orders', label: 'Total Orders' },
  ];
  if (isLoading && tableData.length !== 0) {
    return <div>Loading...</div>;
  }
  if (data?.Customers.length === 0) {
    return <div>No customers found.</div>;
  }
  if (isError) {
    return <div>Error fetching customers data.</div>;
  }


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