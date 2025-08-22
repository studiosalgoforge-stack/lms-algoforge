"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api";

interface Material {
  name: string;
  url: string;
}

interface InterviewQuestion {
  question: string;
  options: string[];
  correct?: number;
}

// ===== MANUAL INTERVIEW QUESTIONS =====
const interviewQuestions: InterviewQuestion[] = [
  {
    question: "What is a primary key in SQL?",
    options: [
      "A column that uniquely identifies a row",
      "A column that stores text",
      "A column used for sorting",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question: "Which Python library is used for data manipulation?",
    options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
    correct: 1,
  },
  {
    question: "Power BI is mainly used for?",
    options: ["Web development", "Data visualization", "Machine learning", "Game development"],
    correct: 1,
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const [topics, setTopics] = useState<Material[]>([]);
  const [assignments, setAssignments] = useState<Material[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showPPT, setShowPPT] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tabs for desktop
  const [activeTab, setActiveTab] = useState<"study" | "interview" | "assignments">("study");
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);

  // Scrollable PPT view
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scrollContent = (direction: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: width * direction, behavior: "smooth" });
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const correct = interviewQuestions[currentQuestionIndex].correct === selectedOption;
    console.log("Answer correct?", correct);
    setSelectedOption(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Fetch topics & assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pptRes = await fetch(`${BASE}/drive/${id}/ppts`);
        const pptData = await pptRes.json();
        setTopics(
          pptData.map((file: any) => ({
            name: file.name.replace(/\.pptx?$/i, ""),
            url: file.previewUrl || file.webViewLink,
          }))
        );

        const assRes = await fetch(`${BASE}/drive/${id}/assignments`);
        const assData = await assRes.json();
        setAssignments(
          (assData.files || assData).map((file: any) => ({
            name: file.name,
            url: file.webViewLink,
          }))
        );

        setLoading(false);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle sidebar resize
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-blue-950">{id} Course</h1>

        {/* ---------------- DESKTOP VIEW ---------------- */}
        <div className="hidden lg:flex">
          {/* Sidebar */}
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
          <div className="flex-1 bg-white text-blue-950 rounded-lg shadow-md p-4 lg:ml-6">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b pb-2">
              {["study", "interview", "assignments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-t-md font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-blue-950 hover:bg-gray-300"
                  }`}
                >
                  {tab === "study" && "Study Materials"}
                  {tab === "interview" && "Interview Questions"}
                  {tab === "assignments" && "Assignments"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "study" && selectedTopic !== null && (
              <div>
                <div
                  className="cursor-pointer bg-blue-100 hover:bg-blue-200 p-2 rounded-md shadow-md mb-4"
                  onClick={() => setShowPPT(!showPPT)}
                >
                  <h2 className="font-semibold text-lg mb-0">{topics[selectedTopic].name}</h2>
                  <p className="text-sm text-gray-700">
                    {showPPT ? "Click to hide PPT" : "Click to view PPT"}
                  </p>
                </div>
                {showPPT && (
                  <div className="relative w-full h-[500px] flex items-center overflow-hidden">
                    <button
                      className="absolute left-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                      onClick={() => scrollContent(-1)}
                    >
                      &lt;
                    </button>
                    <div ref={scrollRef} className="flex overflow-x-auto h-full scroll-smooth no-scrollbar">
                      <iframe
                        src={topics[selectedTopic].url}
                        className="flex-shrink-0 w-full h-full mx-2 rounded-md border"
                        key={selectedTopic}
                      ></iframe>
                    </div>
                    <button
                      className="absolute right-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                      onClick={() => scrollContent(1)}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "interview" && (
              <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
                {currentQuestionIndex < interviewQuestions.length ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Question {currentQuestionIndex + 1}:
                    </h2>
                    <p className="mb-4">{interviewQuestions[currentQuestionIndex].question}</p>
                    <div className="space-y-2">
                      {interviewQuestions[currentQuestionIndex].options.map((opt, idx) => (
                        <label
                          key={idx}
                          className={`block p-3 border rounded-md cursor-pointer hover:bg-blue-50 ${
                            selectedOption === idx ? "bg-blue-100 border-blue-400" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="option"
                            value={idx}
                            checked={selectedOption === idx}
                            onChange={() => setSelectedOption(idx)}
                            className="mr-2"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    <button
                      disabled={selectedOption === null}
                      onClick={handleSubmitAnswer}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">Quiz Completed!</h2>
                    <p className="mt-2">You have answered all questions.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignments.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border rounded-md shadow hover:bg-blue-50 transition"
                  >
                    {file.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---------------- MOBILE VIEW ---------------- */}
        <div className="block lg:hidden space-y-4">
          {["study", "interview", "assignments"].map((tab) => (
            <div key={tab} className="border rounded-md shadow">
              <button
                onClick={() => setActiveTab(activeTab === tab ? ("none" as any) : (tab as any))}
                className={`w-full text-left p-4 font-semibold ${
                  tab === "study"
                    ? "bg-blue-100 hover:bg-blue-200"
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
                  {tab === "study" && selectedTopic !== null && (
                    <div className="relative w-full h-[400px] flex items-center overflow-hidden">
                      <button
                        className="absolute left-2 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                        onClick={() =>
                          setSelectedTopic((prev) => (prev! - 1 + topics.length) % topics.length)
                        }
                      >
                        &lt;
                      </button>
                      <iframe
                        src={topics[selectedTopic].url}
                        className="w-full h-full rounded-md border"
                        allowFullScreen
                      ></iframe>
                      <button
                        className="absolute right-2 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                        onClick={() =>
                          setSelectedTopic((prev) => (prev! + 1) % topics.length)
                        }
                      >
                        &gt;
                      </button>
                    </div>
                  )}

                  {tab === "interview" && (
                    <div>
                      {currentQuestionIndex < interviewQuestions.length ? (
                        <div>
                          <h2 className="text-lg font-semibold mb-4">
                            Question {currentQuestionIndex + 1}:
                          </h2>
                          <p className="mb-4">{interviewQuestions[currentQuestionIndex].question}</p>
                          <div className="space-y-2">
                            {interviewQuestions[currentQuestionIndex].options.map((opt, idx) => (
                              <label
                                key={idx}
                                className={`block p-3 border rounded-md cursor-pointer hover:bg-blue-50 ${
                                  selectedOption === idx ? "bg-blue-100 border-blue-400" : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="option"
                                  value={idx}
                                  checked={selectedOption === idx}
                                  onChange={() => setSelectedOption(idx)}
                                  className="mr-2"
                                />
                                {opt}
                              </label>
                            ))}
                          </div>
                          <button
                            disabled={selectedOption === null}
                            onClick={handleSubmitAnswer}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <h2 className="text-xl font-semibold">Quiz Completed!</h2>
                          <p className="mt-2">You have answered all questions.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {tab === "assignments" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {assignments.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 border rounded-md shadow hover:bg-purple-50 transition"
                        >
                          {file.name}
                        </a>
                      ))}
                    </div>
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
