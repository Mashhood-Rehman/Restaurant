import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react"; // optional, if you’re already using it

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 ">
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="p-4 text-2xl font-bold text-white border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            <Icon icon="mdi:account-group-outline" className="mr-2" />
            Customers
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            <Icon icon="mdi:account-group-outline" className="mr-2" />
            Staff
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            <Icon icon="mdi:cart-outline" className="mr-2" />
            Orders
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            <Icon icon="mdi:food-outline" className="mr-2" />
            Products
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg transition ${
                isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
              }`
            }
          >
            <Icon icon="mdi:chart-line" className="mr-2" />
            Analytics
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © {new Date().getFullYear()} Restaurant Admin
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
