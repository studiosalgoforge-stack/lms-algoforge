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
            <h1 className="text-3xl font-bold text-black text-purple-900">Profile</h1>
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
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); // only digits
      setPhone(value);
    }}
    onBlur={() => {
      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits!");
      }
    }}
    placeholder="Enter 10-digit phone number"
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
                  <option>Afghanistan</option>
  <option>Albania</option>
  <option>Algeria</option>
  <option>Andorra</option>
  <option>Angola</option>
  <option>Antigua and Barbuda</option>
  <option>Argentina</option>
  <option>Armenia</option>
  <option>Australia</option>
  <option>Austria</option>
  <option>Azerbaijan</option>
  <option>Bahamas</option>
  <option>Bahrain</option>
  <option>Bangladesh</option>
  <option>Barbados</option>
  <option>Belarus</option>
  <option>Belgium</option>
  <option>Belize</option>
  <option>Benin</option>
  <option>Bhutan</option>
  <option>Bolivia</option>
  <option>Bosnia and Herzegovina</option>
  <option>Botswana</option>
  <option>Brazil</option>
  <option>Brunei</option>
  <option>Bulgaria</option>
  <option>Burkina Faso</option>
  <option>Burundi</option>
  <option>Cabo Verde</option>
  <option>Cambodia</option>
  <option>Cameroon</option>
  <option>Canada</option>
  <option>Central African Republic</option>
  <option>Chad</option>
  <option>Chile</option>
  <option>China</option>
  <option>Colombia</option>
  <option>Comoros</option>
  <option>Congo (Congo-Brazzaville)</option>
  <option>Costa Rica</option>
  <option>Croatia</option>
  <option>Cuba</option>
  <option>Cyprus</option>
  <option>Czech Republic</option>
  <option>Democratic Republic of the Congo</option>
  <option>Denmark</option>
  <option>Djibouti</option>
  <option>Dominica</option>
  <option>Dominican Republic</option>
  <option>Ecuador</option>
  <option>Egypt</option>
  <option>El Salvador</option>
  <option>Equatorial Guinea</option>
  <option>Eritrea</option>
  <option>Estonia</option>
  <option>Eswatini</option>
  <option>Ethiopia</option>
  <option>Fiji</option>
  <option>Finland</option>
  <option>France</option>
  <option>Gabon</option>
  <option>Gambia</option>
  <option>Georgia</option>
  <option>Germany</option>
  <option>Ghana</option>
  <option>Greece</option>
  <option>Grenada</option>
  <option>Guatemala</option>
  <option>Guinea</option>
  <option>Guinea-Bissau</option>
  <option>Guyana</option>
  <option>Haiti</option>
  <option>Honduras</option>
  <option>Hungary</option>
  <option>Iceland</option>
  <option>India</option>
  <option>Indonesia</option>
  <option>Iran</option>
  <option>Iraq</option>
  <option>Ireland</option>
  <option>Israel</option>
  <option>Italy</option>
  <option>Jamaica</option>
  <option>Japan</option>
  <option>Jordan</option>
  <option>Kazakhstan</option>
  <option>Kenya</option>
  <option>Kiribati</option>
  <option>Kuwait</option>
  <option>Kyrgyzstan</option>
  <option>Laos</option>
  <option>Latvia</option>
  <option>Lebanon</option>
  <option>Lesotho</option>
  <option>Liberia</option>
  <option>Libya</option>
  <option>Liechtenstein</option>
  <option>Lithuania</option>
  <option>Luxembourg</option>
  <option>Madagascar</option>
  <option>Malawi</option>
  <option>Malaysia</option>
  <option>Maldives</option>
  <option>Mali</option>
  <option>Malta</option>
  <option>Marshall Islands</option>
  <option>Mauritania</option>
  <option>Mauritius</option>
  <option>Mexico</option>
  <option>Micronesia</option>
  <option>Moldova</option>
  <option>Monaco</option>
  <option>Mongolia</option>
  <option>Montenegro</option>
  <option>Morocco</option>
  <option>Mozambique</option>
  <option>Myanmar</option>
  <option>Namibia</option>
  <option>Nauru</option>
  <option>Nepal</option>
  <option>Netherlands</option>
  <option>New Zealand</option>
  <option>Nicaragua</option>
  <option>Niger</option>
  <option>Nigeria</option>
  <option>North Korea</option>
  <option>North Macedonia</option>
  <option>Norway</option>
  <option>Oman</option>
  <option>Pakistan</option>
  <option>Palau</option>
  <option>Palestine State</option>
  <option>Panama</option>
  <option>Papua New Guinea</option>
  <option>Paraguay</option>
  <option>Peru</option>
  <option>Philippines</option>
  <option>Poland</option>
  <option>Portugal</option>
  <option>Qatar</option>
  <option>Romania</option>
  <option>Russia</option>
  <option>Rwanda</option>
  <option>Saint Kitts and Nevis</option>
  <option>Saint Lucia</option>
  <option>Saint Vincent and the Grenadines</option>
  <option>Samoa</option>
  <option>San Marino</option>
  <option>Sao Tome and Principe</option>
  <option>Saudi Arabia</option>
  <option>Senegal</option>
  <option>Serbia</option>
  <option>Seychelles</option>
  <option>Sierra Leone</option>
  <option>Singapore</option>
  <option>Slovakia</option>
  <option>Slovenia</option>
  <option>Solomon Islands</option>
  <option>Somalia</option>
  <option>South Africa</option>
  <option>South Korea</option>
  <option>South Sudan</option>
  <option>Spain</option>
  <option>Sri Lanka</option>
  <option>Sudan</option>
  <option>Suriname</option>
  <option>Sweden</option>
  <option>Switzerland</option>
  <option>Syria</option>
  <option>Tajikistan</option>
  <option>Tanzania</option>
  <option>Thailand</option>
  <option>Timor-Leste</option>
  <option>Togo</option>
  <option>Tonga</option>
  <option>Trinidad and Tobago</option>
  <option>Tunisia</option>
  <option>Turkey</option>
  <option>Turkmenistan</option>
  <option>Tuvalu</option>
  <option>Uganda</option>
  <option>Ukraine</option>
  <option>United Arab Emirates</option>
  <option>United Kingdom</option>
  <option>United States of America</option>
  <option>Uruguay</option>
  <option>Uzbekistan</option>
  <option>Vanuatu</option>
  <option>Vatican City</option>
  <option>Venezuela</option>
  <option>Vietnam</option>
  <option>Yemen</option>
  <option>Zambia</option>
  <option>Zimbabwe</option>
                
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
                  <option>Hindi</option>
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
