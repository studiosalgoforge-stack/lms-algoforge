"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null); // null = checking

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must log in first!");
      router.replace("/login");
      setIsAllowed(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        alert("Session expired. Please log in.");
        localStorage.removeItem("token");
        router.replace("/login");
        setIsAllowed(false);
        return;
      }

      setIsAllowed(true); // token is valid
    } catch (err) {
      alert("Invalid session. Please log in.");
      localStorage.removeItem("token");
      router.replace("/login");
      setIsAllowed(false);
    }
  }, [router]);

  // ✅ while checking, render nothing
  if (isAllowed === null) return null;
  if (!isAllowed) return null;

  return <>{children}</>;
}
