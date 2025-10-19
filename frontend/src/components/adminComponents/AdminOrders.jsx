import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetOrdersQuery } from "../../features/api/orderApi";
import CustomTable from "../constants/CustomTable";

const AdminOrders = () => {
    const {data, isLoading, isError} = useGetOrdersQuery();
    console.log("Orders Data:", data);
 const tableData = data?.orders?.map(order => ({
  orderId: order.orderId,
  customer: order.customerName,
  items: order.items.map(i => i.name).join(", "),
  total: order.amount,
  status: order.status,
  date: new Date(order.createdAt).toLocaleDateString()
}));
    const headers = [
        { key: 'orderId', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'items', label: 'Items' },
        { key: 'total', label: 'Total' },
        { key: 'status', label: 'Status' },
        { key: 'date', label: 'Date' },
    ];
if(isLoading) {
    return <div>Loading...</div>;
}
if(isError) {
    return <div>Error loading orders.</div>;
}
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2">
                    <Icon icon="mdi:plus" />
                    New Order
                </button>
            </div>
            <CustomTable tableHeaders={headers} tableData={tableData} />
        </div>
    );
};
export default AdminOrders;