import React, { useState } from 'react'
import CustomModal from '../constants/CustomModal'
import { useCreateUsersMutation, useGetAllUsersQuery } from '../../features/api/userApi'
import { toast } from 'react-toastify'
import { Icons } from '../../assets/Icons'
import MessageLayout from './layout/MessageLayout'
const Users = () => {
  const [openModal, setOpenModal] = useState(false)
  const [user, setUser] = useState(null)
  const [showMessagePanel, setShowMessaegPanel] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  })
  const [createUser] = useCreateUsersMutation()
  const { data: usersData, error } = useGetAllUsersQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await createUser(formData)
      if (response) {
        toast.success("User created successfully")
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        role: ""
      })
      setOpenModal(false)
    } catch (error) {
      toast.error("Error creating user")
      console.error("Error creating user:", error)
    }

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleViewProfile = (userId) => {
    console.log('View profile:', userId);
  };

  const handleMessage = (user) => {
    setShowMessaegPanel(true)
    setUser(user)
  };

  if(error) {
    return <div className="text-red-500"> 
         Error fetching users: {JSON.stringify(error)}
</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Staff Panel</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors md:justify-self-end"
        >
          Add New Staff
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {usersData?.getUsers && usersData?.getUsers?.map(user => (
          <div
            key={user.id}
            className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-400/40 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white group-hover:ring-blue-200 transition-all duration-300">
                  {user.profileImg && user.profileImg !== "dummyImage.webp" ? (
                    <img
                      src={user.profileImg}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icons.User className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {/* Online dot */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 truncate  group-hover:text-blue-600 transition-colors">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 mb-0.5 truncate">{user.email}</p>

                <div
                  className={`inline-block px-2.5 py-0.5 text-xs rounded capitalize mb-2
              ${user.role.toLowerCase() === "admin" || user.role.toLowerCase() === "manager"
                      ? "bg-blue-600 text-white"
                      : user.role.toLowerCase() === "chef" || user.role.toLowerCase() === "cook"
                        ? "bg-gray-200 text-gray-700"
                        : "border border-gray-300 text-gray-600"
                    }
            `}
                >
                  {user.role}
                </div>

              </div>
            </div>

            <div className="flex gap-2.5 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleViewProfile(user.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <span className="hidden sm:inline">View Profile</span>
                <span className="sm:hidden">Profile</span>
              </button>

              <button
                onClick={() => handleMessage(user)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                <span className="hidden sm:inline">Message</span>
                <span className="sm:hidden">Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>


      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        heading="Add New Member"
      >
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-black">Name</label>
            <input
              type="text"
              name='name'
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter Name Here.."
              className="custom-input"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name='email'
              onChange={handleChange}

              value={formData.email}
              placeholder="Enter Email Here.."
              className="custom-input"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-black">Password</label>
            <input
              name='password'
              onChange={handleChange}

              value={formData.password}
              type="password"
              placeholder="Enter Password Here.."
              className="custom-input"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-black">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}

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
      {showMessagePanel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <MessageLayout user={user} onClose={() => setShowMessaegPanel(false)} />
        </div>
      )}

    </div>
  )
}

export default Users
