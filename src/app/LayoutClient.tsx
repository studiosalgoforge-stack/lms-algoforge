"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiBook, FiMessageSquare, FiMail, FiUser, FiLogOut , FiArrowLeft } from "react-icons/fi";
import LogoutButton from "@/components/ui/LogoutButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserMenu from "@/components/ui/UserMenu";
import { FiBell } from "react-icons/fi";
import Footer from "@/components/Footer";
export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const hiddenLayoutRoutes = ["/login", "/signup" , "/forgot-password"];
const isCourseDetailPage = pathname.startsWith("/courses/") && pathname.split("/").length > 2;
const shouldUseMinimalHeader = isCourseDetailPage && !isDesktop;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { href: "/courses", label: "My Courses", icon: <FiBook /> },
    { href: "/forum", label: "Discussion Forum", icon: <FiMessageSquare /> },
    { href: "/support", label: "Support", icon: <FiMail /> },
    // { href: "/dashboard", label: "Dashboard", icon: <FiUser /> },
  ];
   // No layout for login/forgot-password
 if (hiddenLayoutRoutes.includes(pathname)) {
    return <main className="flex-1">{children}</main>;
  }
 // 2️⃣ Minimal header only for course detail page on mobile/tablet
  if (shouldUseMinimalHeader) {
    return (
     
      <div className="flex flex-col min-h-screen ">
        <header className="bg-gradient-to-r from-[#9B4DFF] via-[#B55CFF] to-[#E09EFF] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/courses"
                className="flex items-center gap-2 hover:underline underline-offset-2 transition"
              >
                <FiArrowLeft className="text-lg" />
                Back to Courses
              </Link>

              {/* Hamburger */}
              <button
                className="text-2xl focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <nav className="bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/courses"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiBook className="text-lg text-white" />
                    Back to Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiLogOut className="text-lg text-white" />
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>

        <main className="flex-1">{children}</main>
      </div>
    );
  }


  return (
     <ProtectedRoute>
    <div className="flex flex-col min-h-screen ">
      {/* Top Navbar */}
      <header className="top-0 bg-gradient-to-r from-[#9B4DFF] via-[#B55CFF] to-[#E09EFF] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
             <Link href= "/courses"><img src="/algo1_logo.jpg" alt="Logo" width={40} height={40}  className="rounded-full"/></Link>
              <h1 className="font-bold text-xl">Algoforge Studios</h1>
            </div>

            {/* Desktop Menu */}
            {isDesktop && (
              <nav>
                <ul className="flex items-center gap-6">
                  {links.map((route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className={`flex items-center gap-2 hover:opacity-80 transition
                          ${pathname === route.href ? "border-b-2 border-white font-semibold" : ""}`}
                      >
                        <span className="text-white text-lg">{route.icon}</span>
                        <span>{route.label}</span>
                      </Link>
                    </li>
                  ))}
 <Link href="/notifications">
    <button className="relative text-2xl mt-1 text-white hover:opacity-80 cursor-pointer">
      <FiBell />
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
    </button>
  </Link>

                  {/* Logout Button */}
                  <li>
                  
                  <UserMenu />
              
                  </li>
                </ul>
              </nav>
            )}

            {/* Mobile Hamburger */}
            {!isDesktop && (
               <div className="flex items-center gap-4">
                  {/* 🔔 Mobile Notification Bell */}
                  <Link href="/notifications">
                    <button className="relative mt-2 text-2xl text-white hover:opacity-80 cursor-pointer">
                      <FiBell />
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                  </Link>
              <button
                className="text-2xl focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!isDesktop && isOpen && (
          <nav className="bg-gradient-to-r from-purple-600 to-blue-300 px-4 py-4">
            <ul className="flex flex-col gap-4">
              {links.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-purple-700 transition
                      ${pathname === route.href ? 
                        "bg-purple-600 font-semibold" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg text-white">{route.icon}</span>
                    <span>{route.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/logout"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLogOut className="text-lg text-white" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>
       <Footer />
    </div>
    </ProtectedRoute>
  );
}
