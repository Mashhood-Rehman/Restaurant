import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Camera, Edit2, Save, X, Shield } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser';

const Profile = () => {
  const rawUser = useCurrentUser();
  const currentUser = rawUser?.userData;
console.log("🌟 Profile.jsx: Current User:", currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@restaurant.com',
    profileImg: null,
    role: 'customer'
  });

  const [formData, setFormData] = useState({ ...userData });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        profileImg: currentUser.profileImg || null,
        role: currentUser.role
      });
      setFormData({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        profileImg: currentUser.profileImg || null,
        role: currentUser.role
      });
    }
  }, [currentUser]);

  const roleColors = {
    superadmin: 'bg-red-500 text-white',
    manager: 'bg-orange-500 text-white',
    chef: 'bg-orange-400 text-white',
    rider: 'bg-orange-300 text-gray-800',
    customer: 'bg-gray-200 text-gray-700'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    // Backend integration will go here
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          
          <div className="relative px-6 pb-6">
            {/* Profile Image */}
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  {formData.profileImg && formData.profileImg !== "dummyImage.webp" ? (
                    <img
                      src={formData.profileImg}
                      alt={formData.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg transition-colors shadow-md"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg transition-colors shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* User Info Header */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${roleColors[userData.role]}`}>
                  {userData.role}
                </span>
              </div>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 text-orange-500" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
                  {userData.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-orange-500" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
                  {userData.email}
                </div>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Shield className="w-4 h-4 text-orange-500" />
                Role
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${roleColors[userData.role]}`}>
                  {userData.role}
                </span>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-orange-500" />
                Password
              </label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-500">••••••••</span>
                <button className="text-orange-500 hover:text-orange-600 text-sm font-semibold transition-colors">
                  Change Password
                </button>
              </div>
            </div>

            {/* User ID */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                User ID: <span className="font-mono font-semibold text-gray-700">#{userData.id}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 mt-6 text-white">
          <h3 className="text-lg font-bold mb-2">🍽️ Welcome to Our Restaurant</h3>
          <p className="text-orange-50">
            Enjoy exclusive benefits and personalized dining experiences as a valued member of our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;