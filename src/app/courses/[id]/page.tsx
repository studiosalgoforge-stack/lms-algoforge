"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

// 🔹 Tab components
import StudyTab, { Material } from "@/components/course/StudyTab";
import InterviewTab from "@/components/course/InterviewTab";
import AssignmentsTab from "@/components/course/AssignmentsTab";

// 🔹 Centralized data
import { backupPPTs } from "@/app/data/backupPPTs";
import { interviewData } from "@/app/data/interviewData";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function CourseDetail() {
  const { id } = useParams();
  const [topics, setTopics] = useState<Material[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Tabs for desktop
  const [activeTab, setActiveTab] = useState<"study" | "interview" | "assignments">("study");
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);
 
    // Mobile slider
  const [isMobileSliderOpen, setIsMobileSliderOpen] = useState(false);

  // Scrollable PPT view
  const scrollRef = useRef<HTMLDivElement>(null!);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Fetch topics & assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pptRes = await fetch(`${BASE}/drive/${id}/ppts`);
        const pptData = await pptRes.json();

        const finalTopics =
          Array.isArray(pptData) && pptData.length
            ? pptData.map((file: any) => ({
                name: file.name.replace(/\.pptx?$/i, ""),
                url: file.previewUrl || file.webViewLink,
                assignments: [],
              }))
            : [];

        const assRes = await fetch(`${BASE}/drive/${id}/assignments`);
        const assData = await assRes.json();

        const finalTopicsWithAssignments = finalTopics.map((topic, idx) => ({
          ...topic,
          assignments: assData[idx]?.assignments || [],
        }));

        setTopics(finalTopicsWithAssignments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching materials:", err);

        // 🔹 fallback to backupPPTs.ts
        const backups = backupPPTs[id as string] || [];
        setTopics(
          backups.map((t) => ({
            name: t.name,
            url: t.link,
            assignments: t.assignments || [],
          }))
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Auto select first topic on load
  useEffect(() => {
    if (topics.length > 0 && selectedTopic === null) {
      setSelectedTopic(0);
    }
  }, [topics]);

  // Handle sidebar toggle on resize
  useEffect(() => {
    const handleResize = () => {
      setIsTopicsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p className="text-center mt-16">Loading materials...</p>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-purple-950">
          {id} Course
        </h1>

        {/* ---------------- DESKTOP VIEW ---------------- */}
        <div className="hidden lg:flex">
          {/* Sidebar */}
          <div
            className={`fixed lg:static top-0 left-0 h-full lg:h-auto bg-white shadow-md z-40 transition-all duration-300 ${
              isTopicsSidebarOpen ? "w-64" : "w-0 lg:w-64 lg:block hidden"
            } overflow-hidden`}
          >
            <div className="p-4">
              <h2 className="font-semibold text-purple-950 text-lg mb-3">
                Topics
              </h2>
              <ul className="space-y-2">
                {topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className={`p-2 rounded-md bg-gray-100 hover:bg-purple-200 text-black cursor-pointer ${
                      selectedTopic === idx ? "bg-purple-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedTopic(idx);
                      setActiveTab("study");
                    }}
                  >
                    {topic.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white text-purple-950 rounded-lg shadow-md p-6">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              {["study", "interview", "assignments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-md font-semibold transition ${
                    activeTab === tab
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "study" && (
              <StudyTab
                topics={topics}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                scrollRef={scrollRef}
              />
            )}

            {activeTab === "interview" && (
              <InterviewTab
                interviewQuestions={interviewData}
                courseId={id as string}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            )}

            {activeTab === "assignments" && (
              <AssignmentsTab topics={topics} selectedTopic={selectedTopic} />
            )}
          </div>
        </div>

           {/* ---------------- MOBILE/TABLET VIEW ---------------- */}
        <div className="block lg:hidden space-y-4">
          {/* Toggle button */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setIsMobileSliderOpen(!isMobileSliderOpen)}
              className="px-3 py-2 bg-purple-500 text-white rounded-md shadow"
            >
              {isMobileSliderOpen ? "<<" : ">>"}
            </button>
            <span className="text-lg font-semibold">{id} Topics</span>
          </div>

          {/* Slider */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-purple-50 shadow-lg transform transition-transform duration-300 z-40 p-4
            ${isMobileSliderOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-semibold text-lg">📘 Topics</h2>
                {/* Cross button */}
      <button
        onClick={() => setIsMobileSliderOpen(false)}
        className="text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>
    </div>
              <ul>
                {topics.map((topic, idx) => (
                  <li
                    key={idx}
                    className={`p-2 cursor-pointer rounded ${
                      selectedTopic === idx ? "bg-purple-200" : "hover:bg-purple-100"
                    }`}
                    onClick={() => {
                      setSelectedTopic(idx);
                      setActiveTab("study");
                      setIsMobileSliderOpen(false); // auto close on select
                    }}
                  >
                    {topic.name}
                  </li>
                ))}
              </ul>
            </div>

          {/* Tabs content same as desktop */}
          {["study", "interview", "assignments"].map((tab) => (
            <div key={tab} className="border rounded-md shadow">
              <button
                onClick={() =>
                  setActiveTab(
                    activeTab === tab ? ("none" as any) : (tab as any)
                  )
                }
                className={`w-full text-left p-4 font-semibold ${
                  tab === "study"
                    ? "bg-purple-100 hover:bg-purple-200"
                    : tab === "interview"
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-purple-100 hover:bg-purple-200"
                }`}
              >
                {tab === "study" && "📘 Study Materials"}
                {tab === "interview" && "❓ Interview Questions"}
                {tab === "assignments" && "📝 Assignments"}
              </button>

              {activeTab === tab && (
                <div className="p-4">
                  {tab === "study" && (
                    <StudyTab
                      topics={topics}
                      selectedTopic={selectedTopic}
                      setSelectedTopic={setSelectedTopic}
                      scrollRef={scrollRef}
                    />
                  )}
                  {tab === "interview" && (
                    <InterviewTab
                      interviewQuestions={interviewData}
                      courseId={id as string}
                      currentQuestionIndex={currentQuestionIndex}
                      setCurrentQuestionIndex={setCurrentQuestionIndex}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                    />
                  )}
                  {tab === "assignments" && (
                    <AssignmentsTab topics={topics} selectedTopic={selectedTopic} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
