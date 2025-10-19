import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ResponsiveContainer,
  LineChart, BarChart, PieChart,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  Line, Bar, Pie, Cell
} from 'recharts';
const Analytics = ({ period }) => {
  const salesData = [
    { name: 'Week 1', sales: 4200, orders: 45 },
    { name: 'Week 2', sales: 5100, orders: 58 },
    { name: 'Week 3', sales: 4800, orders: 52 },
    { name: 'Week 4', sales: 6300, orders: 67 },
  ];

  const categoryData = [
    { name: 'Pizza', value: 35 },
    { name: 'Burgers', value: 28 },
    { name: 'Pasta', value: 20 },
    { name: 'Drinks', value: 17 },
  ];

  const COLORS = ['#f97316', '#2563eb', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">$20,400</p>
              <p className="text-green-500 text-xs mt-1">+12% from last period</p>
            </div>
            <Icon icon="mdi:currency-usd" className="text-orange-500 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">222</p>
              <p className="text-green-500 text-xs mt-1">+8% from last period</p>
            </div>
            <Icon icon="mdi:cart" className="text-blue-700 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">48</p>
              <p className="text-gray-400 text-xs mt-1">Active items</p>
            </div>
            <Icon icon="mdi:food" className="text-orange-500 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
              <p className="text-green-500 text-xs mt-1">+15 new users</p>
            </div>
            <Icon icon="mdi:account-group" className="text-blue-700 text-4xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} outerRadius={100} fill="#8884d8" dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Revenue by Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default Analytics;