"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

interface Material {
  name: string;
  url: string;
}

export default function CourseDetail() {
  const { id } = useParams();
  const [topics, setTopics] = useState<Material[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showPPT, setShowPPT] = useState(false);

  // Tabs
  const [interview, setInterview] = useState<Material[]>([]);
  const [assignments, setAssignments] = useState<Material[]>([]);
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"study" | "interview" | "assignments">("study");

  const scrollRef = useRef<HTMLDivElement>(null);
 const [currentPage, setCurrentPage] = useState(1);
  const scrollContent = (direction: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: width * direction, behavior: "smooth" });
      setCurrentPage((prev) => 
   Math.min(Math.max(prev + direction, 1), topics.length)
);

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Study (PPTs)
   const pptRes = await fetch(`http://localhost:5000/api/drive/${id}/ppts`);
        if (!pptRes.ok) {
  const errText = await pptRes.text();
  throw new Error(`Server error ${pptRes.status}: ${errText}`);
}
        const pptData = await pptRes.json();
        const formattedPPT = pptData.map((file: any) => ({
          name: file.name.replace(/\.pptx?$/i, ""),
          url: file.previewUrl || file.webViewLink,
        }));
        setTopics(formattedPPT);

        // Interview
        const intRes = await fetch(`http://localhost:5000/api/drive/${id}/interview`);
        const intData = await intRes.json();
        console.log("Interview API response:", intData);
      const formattedInterview = (intData.files || intData).map((file: any) => ({
  name: file.name,
  url: file.webViewLink,
}));

        setInterview(formattedInterview);

        // Assignments
const assRes = await fetch(`http://localhost:5000/api/drive/${id}/assignments`);
        const assData = await assRes.json();
        const formattedAssignments =  (assData.files || assData).map((file: any) => ({
    name: file.name,
    url: file.webViewLink,
  }))
        setAssignments(formattedAssignments);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    <div className="min-h-screen bg-gray-50 p-6 flex">
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

      {/* Hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-md"
        onClick={() => setIsTopicsSidebarOpen(!isTopicsSidebarOpen)}
      >
        ☰
      </button>

      {/* Main Content */}
      <div className="flex-1 bg-white text-blue-950 rounded-lg shadow-md p-4 lg:ml-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{id} Course</h1>

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

        {/* Study Tab */}
        {activeTab === "study" && (
          <>
            {selectedTopic !== null ? (
              <>
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
                    {/* Left Button */}
                    <button
                      className="absolute left-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                      onClick={() => scrollContent(-1)}
                    >
                      &lt;
                    </button>

                    {/* Scrollable container - only horizontal */}
                    <div
                      ref={scrollRef}
                      className="flex overflow-x-auto h-full scroll-smooth no-scrollbar"
                    >
                      {topics.map((topic, idx) => (
                        <iframe
                          key={idx}
                          src={topics[selectedTopic].url}
                          className="flex-shrink-0 w-full h-full mx-2 rounded-md border"
                        ></iframe>
                      ))}
                    </div>

                    {/* Right Button */}
                    <button
                      className="absolute right-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                      onClick={() => scrollContent(1)}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">Select a topic to view its PPT</p>
            )}
          </>
        )}

        {/* Interview Tab - Responsive Grid */}
        {activeTab === "interview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interview.map((file, idx) => (
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

        {/* Assignments Tab - Responsive Grid */}
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
  );
}
