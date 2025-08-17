"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [stateField, setStateField] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
const [avatar, setAvatar] = useState<string | null>(null);

  // Load user data from localStorage
useEffect(() => {
  const user = localStorage.getItem("user");
  if (!user) return;
  const data = JSON.parse(user);
  const userId = data.id;

  fetch(`http://localhost:5000/api/edituser/${userId}`)
    .then(res => res.json())
    .then(profile => {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
      setOfficialEmail(profile.officialEmail || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
      setStateField(profile.state || "");
      setZip(profile.zip || "");
      setCountry(profile.country || "Select country");
      setLanguage(profile.language || "Select language");
      setAvatar(profile.avatar || null);
    })
    .catch(err => console.error(err));
}, []);

const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;
  const file = e.target.files[0];
  
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch("http://localhost:5000/api/upload-avatar", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  setAvatar(data.url); // set uploaded avatar URL
};

const handleSave = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  const payload = {
    userId,
    firstName,
    lastName,
    email,
    officialEmail,
    phone,
    address,
    state: stateField,
    zip,
    country,
    language,
    avatar,
  };

  try {
    const res = await fetch("http://localhost:5000/api/edituser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Profile updated successfully!");
    } else {
      console.error(data);
      alert("Failed to update profile");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  return (
    <div className="bg-white">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Settings / Profile</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button className="bg-purple-600 text-black px-4 py-2 rounded-lg flex items-center">
            Profile
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg flex items-center">
            Notification
          </button>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-700 mb-6">
          <h2 className="text-xl font-semibold text-black mb-6">Profile Details</h2>

         {/* Profile Picture */}
<div className="flex items-center mb-6">
  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mr-4">
    {avatar ? (
      <img
        src={avatar}
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover"
      />
    ) : (
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    )}
  </div>

  <div className="flex space-x-4 items-center">
    {/* Hidden file input */}
    <input
      type="file"
      accept="image/*"
      id="avatarUpload"
      className="hidden"
      onChange={handleAvatarChange}
    />
    {/* Styled button triggers hidden input */}
    <label
      htmlFor="avatarUpload"
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer"
    >
      Upload new photo
    </label>

    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
      Reset
    </button>
  </div>
</div>

          <p className="text-sm text-gray-400 mb-6">Allowed JPG, GIF or PNG. Max size of 8 MB.</p>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Official Mail</label>
              <input
                type="email"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={officialEmail}
                onChange={(e) => setOfficialEmail(e.target.value)}
                placeholder="Enter official email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-700 mb-6">
          <h2 className="text-xl font-semibold text-black mb-6">Account Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={stateField}
                onChange={(e) => setStateField(e.target.value)}
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Zip Code</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter zip code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
              <select
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Select country</option>
                <option>USA</option>
                <option>UK</option>
                <option>Canada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
              <select
                className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>Select language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
            type="button"
             onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Save Changes
            </button>
            <button className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Reset
            </button>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-black mb-6">Delete Account</h2>

          <div className="bg-red-200 border border-red-700 rounded-lg p-4 mb-4">
            <p className="text-black mb-2">Are you sure you want to delete your account?</p>
            <p className="text-black text-sm">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
              checked={confirmDelete}
              onChange={() => setConfirmDelete(!confirmDelete)}
            />
            <label className="ml-2 text-black">I confirm my account deactivation</label>
          </div>

          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
