"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Camera, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

// ----------------------------------------------------
// Reusable Input Component
// ----------------------------------------------------
const InputField = ({ label, name, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

// ----------------------------------------------------
// Reusable Select Component
// ----------------------------------------------------
const SelectField = ({ label, value, onChange, options }: any) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
    >
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);




const countryOptions = [
  "Select country", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
  "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];
const languageOptions = [
  "Select language", "English", "Spanish", "French", "Hindi"
];

export default function ProfilePage() {
  const router = useRouter();
  // Form state
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [stateField, setStateField] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("Select country");
  const [language, setLanguage] = useState("Select language");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState({ text: "", isError: false });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Load user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
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
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchUser();
  }, []);



  // Save updated profile

const handleSave = async () => {
  setIsSaving(true);
  setStatusMessage({ text: "", isError: false });

  // CRITICAL FIX: Check if the token exists before making the API call.
  const token = localStorage.getItem("token");
  if (!token) {
    setStatusMessage({ text: "Session expired. Please log in again.", isError: true });
    setIsSaving(false);
    // Redirect to login page after a short delay
    setTimeout(() => window.location.href = "/login", 1500);
    return;
  }

  const payload = {
    firstName, lastName, email, phone, address, state: stateField, zip, country, language, avatar,
  };
  try {
    const res = await fetch(`${BASE}/users/edituser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the validated token
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      setStatusMessage({ text: "Profile updated successfully!", isError: false });
    } else {
      setStatusMessage({ text: data.message || "Failed to update profile", isError: true });
    }
  } catch (err) {
    setStatusMessage({ text: "Something went wrong. Please try again.", isError: true });
  } finally {
    setIsSaving(false);
  }
};

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  };
  
  const handlePhoneBlur = () => {
    if (phone && phone.length !== 10) {
      setStatusMessage({ text: "Phone number must be exactly 10 digits.", isError: true });
    } else {
      setStatusMessage({ text: "", isError: false });
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen p-6 md:p-12 font-sans">
        {/* Header with Back button */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-2xl md:text-3xl text-gray-900">
            Edit Profile
          </h1>
        </div>

        {/* Status Message */}
        {statusMessage.text && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              statusMessage.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Profile Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Profile Information
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              {avatar ? (
                <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-purple-100 text-purple-700 flex items-center justify-center text-5xl">
                  {firstName.charAt(0).toUpperCase()}
                </div>
              )}
  
            </div>

            {/* Basic Info */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} placeholder="Enter first name" />
              <InputField label="Last Name" name="lastName" value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} placeholder="Enter last name" />
              <InputField label="Email" name="email" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter your email" />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${statusMessage.isError && statusMessage.text.includes("Phone") ? "border-red-500" : "border-gray-300"}`}
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  placeholder="Enter 10-digit phone number"
                />
              </div>
            </div>
          </div>

          {/* Location & Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InputField label="Address" name="address" value={address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} placeholder="Enter your address" />
            <InputField label="State" name="stateField" value={stateField} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStateField(e.target.value)} placeholder="Enter state" />
            <InputField label="Zip Code" name="zip" value={zip} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZip(e.target.value)} placeholder="Enter zip code" />
            <SelectField
              label="Country"
              value={country}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}
               options={countryOptions}
            />
            <SelectField
              label="Language"
              value={language}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
              options={languageOptions}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 font-semibold text-white rounded-lg transition-colors duration-200
                ${isSaving ? "bg-green-400 cursor-not-allowed" : "bg-green-400 hover:bg-green-500"}`}
            >
              {isSaving && <Loader2 size={20} className="animate-spin" />}
              Save Changes
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 px-6 font-semibold text-red-600 bg-white border border-red-600 rounded-lg transition-colors duration-200 hover:bg-red-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}