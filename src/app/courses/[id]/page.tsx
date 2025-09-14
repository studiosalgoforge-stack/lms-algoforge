"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudyTab, { Material } from "@/components/course/StudyTab";
import InterviewTab from "@/components/course/InterviewTab";
import AssignmentsTab from "@/components/course/AssignmentsTab";
import VideoTab, { Video } from "@/components/course/VideoTab";
import { backupPPTs } from "@/app/data/backupPPTs";
import { interviewData } from "@/app/data/interviewData";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

export default function CourseDetail() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [topics, setTopics] = useState<Material[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "study" | "videos" | "interview" | "assignments" | "none"
  >("study");

  const [openTopics, setOpenTopics] = useState<string[]>([]);
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);
  const [isMobileSliderOpen, setIsMobileSliderOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // 🔹 Track completed topics per course
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  if (!id) return <p>Invalid course ID</p>;

  // ✅ Study Time Tracking (autosave every 5 min + on exit)
  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      fetch(`${BASE}/progress/studytime/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ minutes: 5 }),
      }).catch((err) => console.error("Failed to auto-save study time:", err));
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      const end = Date.now();
      const minutes = Math.floor((end - start) / 60000);

      if (minutes > 0) {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${BASE}/progress/studytime/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ minutes }),
        }).catch((err) => console.error("Failed to save study time:", err));
      }
    };
  }, [id]);

  // 🔹 Count total topics recursively
  const countTotalTopics = useCallback((items: Material[]): number => {
    return items.reduce(
      (acc, item) =>
        acc + (item.children ? countTotalTopics(item.children) : 1),
      0
    );
  }, []);

  // 🔹 Merge stored progress
  const mergeCompletedTopics = useCallback(
    async (newCompleted: string[]) => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE}/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseKey: id,
            topicPath: newCompleted[0],
          }),
        });

        const data = await res.json();
        if (res.ok) {
          const merged = data.completedTopics || [];
          setCompletedTopics(merged);

          const total = countTotalTopics(topics);
          if (total > 0) setProgress(Math.floor((merged.length / total) * 100));
        } else {
          console.error("Failed to update progress:", data.message);
        }
      } catch (err) {
        console.error("Error updating progress:", err);
      }
    },
    [id, topics, countTotalTopics]
  );

  // 🔹 Recursively find first leaf index
  const getFirstLeafIndex = useCallback(
    (items: Material[], parentIndex = "0"): string => {
      let item = items[0];
      let index = parentIndex;

      while (item?.children && item.children.length > 0) {
        item = item.children[0];
        index += ".0";
      }
      return index;
    },
    []
  );

  // 🔹 Get all parent indexes
  const getAllParentIndexes = useCallback(
    (items: Material[], parentIndex = ""): string[] => {
      let indexes: string[] = [];
      items.forEach((item, idx) => {
        const index = parentIndex ? `${parentIndex}.${idx}` : `${idx}`;
        if (item.children && item.children.length > 0) {
          indexes.push(index);
          indexes = indexes.concat(getAllParentIndexes(item.children, index));
        }
      });
      return indexes;
    },
    []
  );

  // 🔹 Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserId(null);
        return;
      }

      try {
        const res = await fetch(`${BASE}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          setUserId(null);
          return;
        }

        const data = await res.json();
        if (data && data._id) {
          setUserId(data._id);
        } else {
          setUserId(null);
        }
      } catch {
        setUserId(null);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Load stored progress
// 🔹 Load stored progress
useEffect(() => {
  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE}/progress?courseKey=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        // Add a check to ensure data.completedTopics is a valid array
        const completed = data.completedTopics || [];
        setCompletedTopics(completed);

        const total = countTotalTopics(topics);
        if (total > 0) {
          setProgress(Math.floor((completed.length / total) * 100));
        }
      }
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  fetchProgress();
}, [id, topics, countTotalTopics]);

  // 🔹 Fetch topics & assignments
 // ...
useEffect(() => {
// After
// ...
const fetchData = async () => {
    try {
        // Step 1: Always start with the local backup data
        let finalTopics: Material[] = backupPPTs[id as string] || [];

        // Step 2: Attempt to fetch assignments from the backend
        const assRes = await fetch(`${BASE}/drive/${id}/assignments`);
        const assData = await assRes.json();

        // Step 3: Merge assignments with the local data
        finalTopics = finalTopics.map((topic, idx) => ({
            ...topic,
            assignments: assData[idx]?.assignments || [],
        }));

        setTopics(finalTopics);
        
        // ... rest of your code
        if (finalTopics.length > 0 && finalTopics[0].children && finalTopics[0].children.length > 0) {
            setSelectedTopic("0.0");
        }
        setLoading(false);

    } catch (err) {
        console.error("Error fetching assignments:", err);
        setTopics(backupPPTs[id as string] || []);
        setLoading(false);
    }
};
// ...

  fetchData();
}, [id, getAllParentIndexes, getFirstLeafIndex]);
// ...



  // Sidebar toggle on resize
  useEffect(() => {
    const handleResize = () =>
      setIsTopicsSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🎉 Confetti when 100%
  useEffect(() => {
    if (progress === 100) {
      confetti({ particleCount: 100, spread: 70 });
    }
  }, [progress]);

  // ✅ Toggle dropdown
  const toggleTopic = (index: string) => {
    setOpenTopics((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSidebarClick = (index: string) => {
    setSelectedTopic(index);
  };




  const handleTopicCompletion = (topicId: string) => {
    if (!completedTopics.includes(topicId)) {
      mergeCompletedTopics([topicId]);
    }
  };

  if (loading) return <p className="text-center mt-16">Loading materials...</p>;

  const videoData: Video[] = [
    {
      id: "video1",
      title: "Gym Posture Correction",
      url: "https://drive.google.com/file/d/1Gn04BhzHxaImmsngPgi-GEoFZrAOQlVX/preview",
    },
    {
      id: "video2",
      title: "Skin Cancer Correction",
      url: "https://drive.google.com/file/d/1mTCfA7gd9mPseiFoT7LITKY6fobuoLyi/preview",
    },
  ];

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
  }`}
>
  <div className="p-2 h-full overflow-y-auto">
    <h2 className="font-semibold text-purple-950 text-lg mb-3 border-b pb-2">
      📘 Topics
    </h2>
                 <ul className="space-y-2">
  {topics.length > 0 &&
    topics[0].children?.map((item, idx) => (
      <li
        key={idx}
        className={`px-3 py-2 rounded-md cursor-pointer ${
          selectedTopic === `${idx}`
            ? "bg-purple-200 text-purple-900 font-semibold"
            : "bg-gray-100 hover:bg-purple-100"
        }`}
       onClick={() => setSelectedTopic(`0.${idx}`)} 
      >
        {item.name}
      </li>
    ))}
</ul>

  </div>
</div>



          {/* Main Content */}
          <div className="flex-1 bg-white text-purple-950 rounded-lg shadow-md p-6">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              {["study", "videos", "interview", "assignments"].map((tab) => (
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
    courseId={id as string}
    onNext={handleTopicCompletion}
    completedTopics={completedTopics}
  />
)}


            {activeTab === "videos" && (
              <VideoTab videos={videoData} courseId={id as string} />
            )}
            {activeTab === "interview" && (
              <InterviewTab
                interviewQuestions={interviewData}
                courseId={id as string}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                userId={userId!}
              />
            )}
            {activeTab === "assignments" && (
              <AssignmentsTab topics={topics} selectedTopic={selectedTopic} />
            )}
          </div>
        </div>

        {/* ---------------- MOBILE VIEW ---------------- */}
        <div className="block lg:hidden space-y-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setIsMobileSliderOpen(!isMobileSliderOpen)}
              className="px-3 py-2 bg-purple-500 text-white rounded-md shadow"
            >
              {isMobileSliderOpen ? "<<" : ">>"}
            </button>
            <span className="text-lg font-semibold">{id} Topics</span>
          </div>

          <div
            className={`fixed top-0 left-0 h-full w-[80%] bg-purple-50 shadow-lg transform transition-transform duration-300 z-40 p-4 overflow-y-auto
            ${isMobileSliderOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="p-4 flex justify-between items-center border-b overflow-y-auto">
              <h2 className="font-semibold text-lg">📘 Topics</h2>
              <button
                onClick={() => setIsMobileSliderOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xl font-bold "
              >
                ×
              </button>
            </div>
             <ul className="space-y-2">
  {topics.length > 0 &&
    topics[0].children?.map((item, idx) => (
      <li
        key={idx}
        className={`px-3 py-2 rounded-md cursor-pointer ${
          selectedTopic === `${idx}`
            ? "bg-purple-200 text-purple-900 font-semibold"
            : "bg-gray-100 hover:bg-purple-100"
        }`}
        onClick={() => setSelectedTopic(`${idx}`)}
      >
        {item.name}
      </li>
    ))}
</ul>
          </div>

          {["study", "videos", "interview", "assignments"].map((tab) => (
            <div key={tab} className="border rounded-md shadow">
              <button
                onClick={() =>
                  setActiveTab(activeTab === tab ? ("none" as any) : (tab as any))
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
                {tab === "videos" && "🎥 Videos"}
                {tab === "interview" && "❓ Interview Questions"}
                {tab === "assignments" && "📝 Assignments"}
              </button>

              {activeTab === tab && (
                <div className="p-4">
                  {tab === "study" && (
                 <StudyTab
    topics={topics[0].children || []}
    selectedTopic={selectedTopic}
    setSelectedTopic={setSelectedTopic}
    scrollRef={scrollRef}
    courseId={id as string}
    onNext={handleTopicCompletion}
    completedTopics={completedTopics}
  />
                  )}
                  {tab === "videos" && (
                    <VideoTab videos={videoData} courseId={id as string} />
                  )}
                  {tab === "interview" && (
                    <InterviewTab
                      interviewQuestions={interviewData}
                      courseId={id as string}
                      currentQuestionIndex={currentQuestionIndex}
                      setCurrentQuestionIndex={setCurrentQuestionIndex}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      userId={userId!}
                    />
                  )}
                  {tab === "assignments" && (
                    <AssignmentsTab
                      topics={topics}
                      selectedTopic={selectedTopic}
                    />
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
