"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CourseDetail() {
  const { id } = useParams();
  const [topics, setTopics] = useState<{ name: string; pptUrl: string }[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showPPT, setShowPPT] = useState(false);
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);

  // Replace with your published CSV export link
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbGY7oZ-mP_nnUrzppv9Zr1rKFbreR6pGrkuEjE30ekvj5aPTnMF11JK3msneY1BwT1E_3PMgW91uf/pub?output=csv";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      const rows = text.split("\n").slice(1); // skip header

      const data = rows
        .map((row) => {
          const cols = row.split(",");
          let fileName = cols[0]?.trim();
          const fileId = cols[1]?.trim();
          if (!fileName || !fileId) return null;

            if (fileName.toLowerCase().endsWith(".pptx")) {
            fileName = fileName.slice(0, -5);
          }

          return {
            name: fileName,
            pptUrl: `https://drive.google.com/file/d/${fileId}/preview`,
          };
        })
        .filter(Boolean) as { name: string; pptUrl: string }[];

      setTopics(data);
    };

    fetchData();
  }, []);

  // Responsive sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsTopicsSidebarOpen(false);
      } else {
        setIsTopicsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex">
      {/* Topics Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto bg-white shadow-md z-40 transition-all duration-300 ${
          isTopicsSidebarOpen ? "w-64" : "w-0 lg:w-64 lg:block hidden"
        } overflow-hidden`}
      >
        <div className="p-4">
          <h2 className="font-semibold text-blue-950 text-lg mb-3">Topics</h2>
          <ul className="space-y-2">
            {topics.map((topic, idx) => (
              <li
                key={idx}
                className={`p-2 rounded-md bg-gray-100 hover:bg-blue-200 text-black cursor-pointer ${
                  selectedTopic === idx ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  setSelectedTopic(idx);
                  setShowPPT(false);
                }}
              >
                {topic.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md"
        onClick={() => setIsTopicsSidebarOpen(!isTopicsSidebarOpen)}
      >
        ☰
      </button>

      {/* Main Content */}
      <div className="flex-1 bg-white text-blue-950 rounded-lg shadow-md p-4 lg:ml-6">
        <h1 className="text-4xl font-bold mb-4">Data Science</h1>

        {selectedTopic !== null ? (
          <>
            <div
              className="cursor-pointer bg-blue-100 hover:bg-blue-200 p-2 rounded-md shadow-md mb-4"
              onClick={() => setShowPPT(!showPPT)}
            >
              <h2 className="font-semibold text-lg mb-0">
                {topics[selectedTopic].name}
              </h2>
              <p className="text-sm text-gray-700">
                {showPPT ? "Click to hide PPT" : "Click to view PPT"}
              </p>
            </div>

            {showPPT && (
              <iframe
                src={topics[selectedTopic].pptUrl}
                className="w-full h-96 border rounded-md"
              ></iframe>
            )}
          </>
        ) : (
          <p className="text-gray-500">Select a topic to view its PPT</p>
        )}
      </div>
    </div>
  );
}
