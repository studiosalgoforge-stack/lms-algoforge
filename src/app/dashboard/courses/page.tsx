"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function CoursesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/courses"); 
  }, [router]);

  return (
       <ProtectedRoute> null</ProtectedRoute>
   );
}
