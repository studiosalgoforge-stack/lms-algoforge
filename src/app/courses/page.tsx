"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { courseFolders } from "@/lib/courseFolders";
import ProtectedRoute from "@/components/ProtectedRoute";
import { backupPPTs } from "@/app/data/backupPPTs";

const categories = ["My Courses", "Orientation", "Learning Tools", "Projects"];

// Sample data for other tabs
const sampleData = {
  Orientation: [
    { id: "welcome", title: "Welcome Video", link: "#" },
    { id: "getting-started", title: "Getting Started Guide", link: "#" },
  ],
  "Learning Tools": [
    { id: "jupyter", title: "Jupyter Notebook Tutorial", link: "#" },
    { id: "power-bi", title: "Power BI Tutorial", link: "#" },
  ],
  Projects: [
    {
      title: "Gym Posture Correction",
      url: "https://drive.google.com/file/d/1Gn04BhzHxaImmsngPgi-GEoFZrAOQlVX/preview",
    },
    {
      title: "Skin Cancer Correction",
      url: "https://drive.google.com/file/d/1mTCfA7gd9mPseiFoT7LITKY6fobuoLyi/preview",
    },
  ],
};

export default function CoursesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Courses");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Track completed topics per course
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});

  const toggleCourse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Normalize courses data from courseFolders
  const courses = Object.keys(courseFolders).map((key) => {
    const topics = Array.isArray(courseFolders[key])
      ? courseFolders[key]
      : [courseFolders[key]]; // wrap single object in array

    const completed = courseProgress[key] || 0;
    const total = topics.length;

    return {
      id: key,
      title: key,
      topics,
      completed,
      total,
      progress: total > 0 ? Math.floor((completed / total) * 100) : 0,
    };
  });

  // Recursive rendering function for topics
  const renderTopics = (topics: any[]) => {
    if (!Array.isArray(topics)) return null;
    return topics.map((topic, idx) => (
      <div key={idx} className="pl-4 space-y-2">
        <div>{topic.name}</div>
        {topic.children && renderTopics(topic.children)}
      </div>
    ));
  };

  // Items for other tabs
  const items = sampleData[activeTab as keyof typeof sampleData];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* Left/Main Content */}
        <div className="flex-1">
          <div className="flex-1 text-black mb-6 text-bold bg-gray-100 h-12 flex items-center px-4 gap-2">
            <a
              href="https://dev-algoforge-prototype.vercel.app/"
              className="hover:underline"
            >
              Home
            </a>
            <span>- Classroom</span>
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
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIndex(null); // reset expand state when switching tabs
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* My Courses Accordion */}
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
                      {renderTopics(course.topics)}

                      {/* ✅ Actual Progress Bar */}
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

          {/* Other Tabs */}
          {activeTab !== "My Courses" && activeTab !== "Projects" && (
            <div className="space-y-4">
              {items?.map((item, index) => (
                <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#B07DFF] to-[#FF9DDB] text-white font-medium cursor-pointer"
                    onClick={() => toggleCourse(index)}
                  >
                    <span>{item.title}</span>
                    <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                  </div>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-72" : "max-h-0"
                    } bg-white`}
                  >
                    <div className="p-4 space-y-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 inline-block"
                      >
                        Open
                      </a>
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
                        src={project.url}
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
