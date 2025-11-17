"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  // Public routes (no auth needed)
  const publicRoutes = ["/login", "/signup", "/forgot-password" , "/logout","/main","/"];

  useEffect(() => {
    if (publicRoutes.includes(pathname)) {
      setIsAllowed(true);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must log in first!");
      router.replace("/");
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

      setIsAllowed(true);
    } catch (err) {
      alert("Invalid session. Please log in.");
      localStorage.removeItem("token");
      router.replace("/login");
      setIsAllowed(false);
    }
  }, [pathname, router]);

  if (isAllowed === null) return null;
  if (!isAllowed) return null;

  return <>{children}</>;
}
