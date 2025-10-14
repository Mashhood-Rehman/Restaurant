import { Route, Routes } from "react-router-dom";

import Cancel from "./components/Cancel";
import Dispatch from "./components/Dispatch";
import Success from "./components/Success";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import Orders from "./pages/Orders";
import AdminRoutes from "./admin/AdminRoutes";
import AdminLayout from "./components/adminComponents/AdminLayout";
import { AdminOrders, Analytics, Products, Users } from "./admin";

const App = () => {
  return (<>
    <ToastContainer />
    <Navbar />
    <div className="pt-24">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<Products />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </div>
  </>
  );
};

export default App;


// import React, { useState } from "react";

// const App = () => {
//   const perPage = 5
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedRole, setSelectedRole] = useState("All");
//   const [selectedColumns, setSelectedColumns] = useState({
//     name: true,
//     email: true,
//     role: true,
//     id: true
//   })
//   const users = [
//     { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Admin" },
//     { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "User" },
//     { id: 3, name: "Bilal Rehman", email: "bilal@example.com", role: "Editor" },
//     { id: 4, name: "Ayesha Malik", email: "ayesha@example.com", role: "User" },
//     { id: 5, name: "Usman Tariq", email: "usman@example.com", role: "Admin" },
//     { id: 6, name: "Fatima Noor", email: "fatima@example.com", role: "User" },
//     { id: 7, name: "Hamza Rafiq", email: "hamza@example.com", role: "Editor" },
//     { id: 8, name: "Mariam Zafar", email: "mariam@example.com", role: "User" },
//     { id: 9, name: "Zain Iqbal", email: "zain@example.com", role: "User" },
//   ];

// const toggleColumn = (col) => {
//   setSelectedColumns({
//     ...selectedColumns,
//     [col] : !selectedColumns[col]
//   })
// }
//   const filteredUsers =
//     selectedRole === "All"
//       ? users
//       : users.filter((u) => u.role === selectedRole);

//   const indexOfLastUser = currentPage * perPage;
//   const indexOfFirstUser = indexOfLastUser - perPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / perPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//     setCurrentPage(1);
//   };



//   return (
//     <div className="p-4">
//       <div className="flex items-center space-x-5 mb-4">
//         <label>
//           <input
//             type="checkbox"
//             checked={selectedColumns.name}
//             onChange={() => toggleColumn("name")}
//           />
//           <span className="mx-2">Name</span>
//         </label>
//         <label>
//           <input
//             type="checkbox"
//         checked={selectedColumns.id}
//         onChange={()=> toggleColumn("id")}
//           />
//           <span className="mx-2">ID</span>
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={selectedColumns.email}
//             onChange={() => toggleColumn("email")}
//           />
//           <span className="mx-2">Email</span>
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             checked={selectedColumns.role}
//             onChange={() => toggleColumn("role")}
//           />
//           <span className="mx-2">Role</span>
//         </label>
//       </div>
//       <h2 className="text-xl font-semibold mb-4">Users Table</h2>
//       <div className=" flex justify-between items-center">

//         <div className=" flex place-items-center space-x-2 m-4">
//           <button onClick={() => handlePrev()} className="bg-white text-black p-4 ">Back</button>
//           <button onClick={() => handleNext()} className="bg-white text-black p-4 ">Forward</button>
//         </div>
//         <div>
//           <select value={selectedRole} onChange={handleRoleChange} >
//             <option value="All">All</option>
//             <option value="Admin">Admin</option>
//             <option value="User">User</option>
//             <option value="Editor">Editor</option>
//           </select>
//         </div>
//         <div className=" flex place-items-center space-x-2 m-4">
//           <span>Showing page {currentPage} of {totalPages}</span>
//         </div>
//       </div>
//       <table className="w-full border border-gray-300 rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>

//             {selectedColumns.id && <th className="border p-2 text-left">ID</th>}
//             <th className="border p-2 text-left">Name</th>
//             <th className="border p-2 text-left">Email</th>
//             <th className="border p-2 text-left">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.map((user) => (
//             <tr key={user.id} className="hover:bg-gray-50">
//               {selectedColumns.id && <td className="border p-2">{user.id}</td>}
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2">{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;
