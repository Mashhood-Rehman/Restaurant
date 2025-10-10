const Orders = () => {
    const orders = [
        { _id: '1', orderId: '#ORD-001', customer: 'John Doe', items: 'Pizza, Burger', total: '$27.98', status: 'Delivered', date: '2024-10-01' },
        { _id: '2', orderId: '#ORD-002', customer: 'Jane Smith', items: 'Pasta, Salad', total: '$19.98', status: 'Pending', date: '2024-10-05' },
        { _id: '3', orderId: '#ORD-003', customer: 'Mike Johnson', items: 'Burger, Drink', total: '$12.99', status: 'Processing', date: '2024-10-06' },
        { _id: '4', orderId: '#ORD-004', customer: 'Sarah Williams', items: 'Pizza x2', total: '$25.98', status: 'Delivered', date: '2024-10-07' },
        { _id: '5', orderId: '#ORD-005', customer: 'David Brown', items: 'Pasta, Pizza, Salad', total: '$34.97', status: 'Cancelled', date: '2024-10-08' },
        { _id: '6', orderId: '#ORD-006', customer: 'Emily Davis', items: 'Burger x3', total: '$29.97', status: 'Processing', date: '2024-10-09' },
    ];

    const headers = [
        { key: 'orderId', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'items', label: 'Items' },
        { key: 'total', label: 'Total' },
        { key: 'status', label: 'Status' },
        { key: 'date', label: 'Date' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center gap-2">
                    <Icon icon="mdi:plus" />
                    New Order
                </button>
            </div>
            <CustomTable tableHeaders={headers} tableData={orders} />
        </div>
    );
};
export default Orders;