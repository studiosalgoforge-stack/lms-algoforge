"use client";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      removeToken(); // clear from localStorage
      router.push("/login");
      // You can also add a call to a backend endpoint to invalidate the token
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 hover:opacity-80 transition"
    >
      <FiLogOut className="text-white text-lg" />
      Logout
    </button>
  );
}
