"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { courseFolders } from "@/lib/courseFolders";

const categories = ["My Courses", "Orientation", "Learning Tools", "Projects"];

export default function CoursesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Courses");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCourse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const courses = Object.keys(courseFolders).map((key) => ({
    id: key,
    title: key,
    progress: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="min-h-screen bg-gray-50 md:p-8">
      <div className="flex-1 text-black mb-6 text-bold bg-gray-100 h-12">
        <a href="https://app.algoforgestudios.com/">Home -</a>
        <a> Classroom</a>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 mb-6 border-b border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pb-2 text-sm md:text-base font-semibold transition-colors duration-300 ${
              activeTab === cat
                ? "bg-gradient-to-r from-[#9B4DFF] to-[#E76CF3] bg-clip-text text-transparent border-b-2 border-[#C87BEF]"
                : "text-gray-600 hover:bg-gradient-to-r hover:from-[#9B4DFF] hover:to-[#E76CF3] hover:bg-clip-text hover:text-transparent"
            }`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Accordion */}
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
                  openIndex === index ? "max-h-40" : "max-h-0"
                } bg-white`}
              >
                <div className="p-4 space-y-4">
                  {/* Progress bar */}
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#F58BFF] to-[#90E0FF] h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      {course.progress}% Completed
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="px-4 py-2 bg-pink-500 text-white rounded-md shadow hover:opacity-90"
                      onClick={() => router.push(`/courses/${course.id}`)}
                    >
                      Go to Course
                    </button>
                    <button className="px-4 py-2 border border-pink-400 text-pink-500 rounded-md hover:bg-orange-50">
                      Progress Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
