"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { backupPPTs } from "@/app/data/backupPPTs";
import Link from "next/link";
import { User } from "lucide-react";

const categories = ["My Courses", "Orientation", "Projects"];
const sampleData = {
  Orientation: [
    { id: "welcome", title: "Welcome Video", link: "https://drive.google.com/file/d/1lszoOETnhKZKgSVO8SWnmso3rQKjgmN8/preview" },
  ],
  Projects: [
    { title: "Gym Posture Correction", link: "https://drive.google.com/file/d/1Gn04BhzHxaImmsngPgi-GEoFZrAOQlVX/preview" },
    { title: "Skin Cancer Correction", link: "https://drive.google.com/file/d/1mTCfA7gd9mPseiFoT7LITKY6fobuoLyi/preview" },
  ],
};

export default function CoursesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Courses");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false); // 🚩 New state for loading

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (!token) return;
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";
        const res = await fetch(`${BASE_URL}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch progress");
        const data = await res.json();
        setCourseProgress(data.courseProgress || {});
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchProgress();
  }, [token]);

  const toggleCourse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const countLeafTopics = (items: any[]): number => {
    return items.reduce((acc, item) => {
      if (item.children && item.children.length > 0) {
        return acc + countLeafTopics(item.children);
      }
      if (item.link || item.file || item.url) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const courses = Object.keys(backupPPTs).map((key) => {
    const topics = backupPPTs[key] || [];
    const normalizedTopics = topics;
    const total = countLeafTopics(normalizedTopics);
    const completedArray = Array.isArray(courseProgress[key]) ? courseProgress[key] : [];
    const completed = completedArray.length;
    const progress = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
    return {
      id: key,
      title: key,
      topics: normalizedTopics,
      completed,
      total,
      progress,
    };
  });

  const items = sampleData[activeTab as keyof typeof sampleData];

  return (
    <ProtectedRoute>
      {/*  Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="w-12 h-12 border-4 border-black border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      <div className="min-h-screen bg-purple-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* Left/Main Content */}
        <div className="flex-1 ">
          <div className="flex-1 text-black mb-6 text-bold bg-gray-100 h-12 flex items-center px-4 gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>- Classroom</span>
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap gap-6 mb-6 border-b  border-gray-200">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pb-2 text-sm md:text-base font-semibold transition-colors duration-300 ${
                  activeTab === cat
                    ? "bg-gradient-to-r from-[#9B4DFF] to-[#E76CF3] bg-clip-text text-transparent border-b-2 border-[#C87BEF]"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-[#9B4DFF] hover:to-[#E76CF3] hover:bg-clip-text hover:text-transparent"
                }`}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIndex(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* My Courses */}
          {activeTab === "My Courses" && (
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#B07DFF] to-[#FF9DDB] text-white font-semibold cursor-pointer"
                    onClick={() => toggleCourse(index)}
                  >
                    <span>{course.title}</span>
                    <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                  </div>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-72" : "max-h-0"
                    } bg-white`}
                  >
                    <div className="p-4 space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#F58BFF] to-[#90E0FF] h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          {course.completed} / {course.total} Completed ({course.progress}%)
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          className="w-full sm:w-auto px-4 sm:px-6 lg:px-6 py-2 sm:py-2.5 lg:py-2 
                          bg-pink-500 text-white font-medium rounded-lg shadow 
                          hover:opacity-90 transition-all duration-200 cursor-pointer"
                          onClick={() => {
                            setIsLoading(true); //  Start loading
                            setTimeout(() => {
                              router.push(`/courses/${course.id}?completed=${course.completed}&total=${course.total}`);
                            }, 200);
                          }}
                        >
                          Go to Course
                        </button>

                        <button
                          className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 
                          border border-pink-400 text-pink-500 font-medium rounded-lg 
                          hover:bg-pink-50 transition-all duration-200 cursor-pointer"
                          onClick={() => {
                             setIsLoading(true); 
                            setTimeout(() => {
                            router.push('/dashboard/reports')
                              }, 200);
                          }}
                        >
                          Progress Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other Tabs */}
          {/* Orientation Tab */}
          {activeTab === "Orientation" && (
            <div className="space-y-4">
              {sampleData.Orientation.map((item, index) => (
                <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#B07DFF] to-[#FF9DDB] text-white font-semibold cursor-pointer"
                    onClick={() => toggleCourse(index)}
                  >
                    <span>{item.title}</span>
                    <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-[600px]" : "max-h-0"
                    } bg-white`}
                  >
                    <div className="p-4">
                      <iframe
                        src={item.link}
                        width="100%"
                        height="400"
                        allow="autoplay"
                        className="rounded-md"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "Projects" && (
            <div className="space-y-4">
              {sampleData.Projects.map((project, index) => (
                <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#B07DFF] to-[#FF9DDB] text-white font-semibold cursor-pointer"
                    onClick={() => toggleCourse(index)}
                  >
                    <span>{project.title}</span>
                    <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-[600px]" : "max-h-0"
                    } bg-white`}
                  >
                    <div className="p-4">
                      <iframe
                        src={project.link}
                        width="100%"
                        height="400"
                        allow="autoplay"
                        className="rounded-md"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-72 sticky mt-32 top-8 self-start">
          <div className="rounded-lg p-6 shadow-lg bg-gradient-to-r from-[#F6A6FF] via-[#D6A4E6] to-[#A1C4FD]">
            <div className="space-y-4">
              {["Success Stories", "Research Articles", "Project Discussions"].map(
                (item, i) => (
                  <button
                    key={i}
                    className="w-full px-4 py-3 border border-white text-white rounded-md hover:opacity-90"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}