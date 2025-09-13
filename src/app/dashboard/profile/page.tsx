"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function ProfilePage() {
  // Form state
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [stateField, setStateField] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  // ✅ Load user data
  useEffect(() => {
 const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token"); // wherever you store it
    const res = await fetch(`${BASE}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const user = await res.json();
      setUserId(user._id);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setStateField(user.state || "");
      setZip(user.zip || "");
      setCountry(user.country || "Select country");
      setLanguage(user.language || "Select language");
      setAvatar(user.avatar || null);
    }
  } catch (error) {
    console.error("Failed to fetch user profile", error);
  }
};


    fetchUser();
  }, []);

  // ✅ Avatar upload (to backend route that uploads to Cloudinary)
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userId);

    const res = await fetch(`${BASE}/upload-avatar`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setAvatar(data.url); // ✅ Cloudinary URL saved in DB
    } else {
      console.error("Avatar upload failed:", data);
    }
  };

  // ✅ Save updated profile
  const handleSave = async () => {
    const payload = {
      userId,
      firstName,
      lastName,
      email,
      phone,
      address,
      state: stateField,
      zip,
      country,
      language,
      avatar,
    };

    try {
      const res = await fetch(`${BASE}/edituser`, {
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
    <ProtectedRoute>
      <div className="bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">Settings / Profile</h1>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button className="bg-purple-400 text-black px-4 py-2 rounded-lg flex items-center">
              Profile
            </button>
          </div>

          {/* Profile Details Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-black mb-6">Profile Details</h2>


            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your Address"
                />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-black mb-6">Account Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={stateField}
                  onChange={(e) => setStateField(e.target.value)}
                  placeholder="Enter State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Zip Code</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="Enter zip code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                <select
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Select country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                <select
                  className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-black"
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
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
