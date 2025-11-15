import React, { useState } from "react";
import avatar from "../assets/avatar.jpg";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminProfile,
  updateAdminPassword,
} from "../store/slices/authSlice";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [updatingSection, setUpdatingSection] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setAvatar(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleProfileChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const updateProfile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", editData.name);
    data.append("email", editData.email);
    if (avatarFile) {
      data.append("avatar", avatarFile);
    }
    setUpdatingSection("Profile");
    // Dispatch update profile action
    dispatch(updateAdminProfile(data));
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("currentPassword", passwordData.currentPassword);
    data.append("newPassword", passwordData.newPassword);
    data.append("confirmNewPassword", passwordData.confirmNewPassword);
    setUpdatingSection("Password");
    dispatch(updateAdminPassword(data));
  };

  return (
    <>
      <main className="p-[10px] pl-[10px md:pl-[17rem] w-full">
        {/* HEADER  */}
        <div className="flex-1 md:p-6 mb:pb-0">
          <Header />
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-gray-600 mb-6">
            Manage your profile settings
          </p>
        </div>

        {/* CONTENT  */}
        <div className="max-w-4xl md:px-4 py-8">
          {/* PROFILE CARD  */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-10">
            <img
              src={(user && user?.avatar?.url) || avatar}
              alt={user?.name || avatar}
              className="w-20 h-20 rounded-full object-cover border"
              loading="lazy"
            />
            <div>
              <p className="text-xl font-medium">Name: {user?.name}</p>
              <p className="text-md text-gray-600">Email: {user?.email}</p>
              <p className="text-sm text-blue-500">Role: {user?.role}</p>
            </div>
          </div>

          {/* UPDATE PROFILE SECTION  */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md mb-10">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleProfileChange}
                className="border p-2 rounded-md"
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleProfileChange}
                placeholder="Your Email"
                className="border p-2 rounded-md"
              />
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="border p-2 rounded-md border-radius-10 col-span-1 md:col-span-2"
              />
            </div>

            <button
              onClick={updateProfile}
              className="flex justify-center items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 mt-4 transition-all"
              // className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              disabled={loading}
            >
              {loading && updatingSection === "Profile" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating Profile...</span>
                </>
              ) : (
                <span>Update Profile</span>
              )}
            </button>
          </div>

          {/* UPDATE PASSWORD SECTION  */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Update Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-md"
                placeholder="Current Password"
              />
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-md"
                placeholder="New Password"
              />
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-md"
                placeholder="Confirm New Password"
              />
            </div>

            <button
              onClick={updatePassword}
              className="flex justify-center items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 mt-4 transition-all"
              disabled={loading}
            >
              {loading && updatingSection === "Password" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
