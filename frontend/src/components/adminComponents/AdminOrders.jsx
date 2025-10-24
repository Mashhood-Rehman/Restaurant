import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../features/api/orderApi";
import CustomTable from "../constants/CustomTable";

const AdminOrders = () => {
    const {data, isLoading, isError} = useGetOrdersQuery();
    const  [updateOrderStatus] = useUpdateOrderStatusMutation()
    const statusOptions = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"]
 
 const handleStatusChange = async  (orderId, newStatus) => {
 try {
await updateOrderStatus({ orderId, status: newStatus }).unwrap();
    } catch (error) {
        console.error("Error updating order status:", error);
    } }
    const tableData = data?.orders?.map(order => ({
  orderId: order.orderId,
  customer: order.customerName,
  items: order.items.map(i => i.name).join(", "),
  total: order.amount,
  status: (
    <select value={order.status} onChange={(e) => handleStatusChange(order.orderId, e.target.value)} className="p-1.5 focus:outline-none border rounded-md bg-white" >
            {statusOptions.map((s)=> (
        <option key={s} value={s}>
            {s}
        </option>
        ))}
    </select>
  ),
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
            </div>
            <CustomTable tableHeaders={headers} tableData={tableData} />
        </div>
    );
};
export default AdminOrders;