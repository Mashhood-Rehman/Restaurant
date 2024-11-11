import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Users = () => {
  const [users, setUsers] = useState([]);

const delUser = async (_id) => {
  const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/delUser/${_id}`)
  try {
    if(response.data.success){
      setUsers(users.filter((users)=>users._id !== _id))
      toast.success("User Deleted Successfully");
    } else {
      toast.error("Failed to delete user. Please try again.");

    } 
    
  } 
  
  catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error("Error deleting user:", error);
  }
  
}
  useEffect(() => {
    axios
      .get("http://localhost:5000/getUser")
      .then((response) => setUsers(response.data.AllUsers))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
console.log("user",users)
  return (
    <>
      <div className="overflow-x-auto lg:mt-[5%]">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && Array.isArray(users) && users.map((row, index) => {
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border text-center ">{row.firstname}</td>
                  <td className="py-2 px-4 border text-center">{row.lastname}</td>
                  <td className="py-2 px-4 border text-center">{row.email}</td>
                  <td className="py-2 px-4 border flex   space-x-2">
                  
                    <button
                    onClick={() => delUser(row._id)}
                      className="hover:bg-red-500 rounded-full  text-black duration-200 ease-in-out px-2 py-2  "
                    >
                      <Icon icon="material-symbols:person-remove-rounded" width="21" height="21" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Users;
