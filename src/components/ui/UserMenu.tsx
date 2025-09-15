// components/ui/UserMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import LogoutButton from "./LogoutButton";
import { ChevronDown } from "lucide-react";
export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Correctly type useRef to hold an HTMLDivElement or null
  const menuRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    // Add event type for a mouse event
    const handleClickOutside = (event: MouseEvent) => {
      // Check if menuRef.current exists before using it
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="relative" ref={menuRef}>
  <button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
>
  {/* User Avatar */}
  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-lg font-bold text-purple-800">
    U
  </div>
  {/* Dropdown Icon */}
  <ChevronDown
    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
      isOpen ? "transform rotate-180" : ""
    }`}
  />
</button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FiUser /> Profile
          </Link>
          <Link href="/logout" onClick={() => setIsOpen(false)}  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
          <FiLogOut/>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}