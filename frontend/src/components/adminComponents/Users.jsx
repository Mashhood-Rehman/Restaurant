import React, { useState } from 'react'
import CustomModal from '../constants/CustomModal'

const Users = () => {
  const [openModal, setOpenModal] = useState(false)
  
  // Sample data - replace with actual data
  const users = [
    { id: 1, name: 'John Doe', role: 'Chef' },
    { id: 2, name: 'Jane Smith', role: 'Rider' },
    { id: 3, name: 'Mike Johnson', role: 'Chef' },
    { id: 4, name: 'Sarah Williams', role: 'Rider' }
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Staff Panel</h1>
        <button 
          onClick={() => setOpenModal(true)} 
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors md:justify-self-end"
        >
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 relative">
            <div className="grid grid-cols-[80px_1fr] gap-4 mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="pt-2">
                <h2 className="font-semibold text-lg text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm hover:underline">
              Message
            </button>
          </div>
        ))}
      </div>

      <CustomModal 
        isOpen={openModal} 
        onClose={() => setOpenModal(false)} 
        heading="Add New Member"
      >
        <form className="grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              placeholder="Enter Name Here.." 
              className="custom-input"
            />
          </div>
          
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="Enter Email Here.." 
              className="custom-input"
            />
          </div>
          
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="Enter Password Here.." 
              className="custom-input"
            />
          </div>
          
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select 
              name="role"
              className="px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="chef">Chef</option>
              <option value="rider">Rider</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <button 
            type="submit"
            className="bg-gray-900  text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors mt-2"
          >
            Add Member
          </button>
        </form>
      </CustomModal>
    </div>
  )
}

export default Users
