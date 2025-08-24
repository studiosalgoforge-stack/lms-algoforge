"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

interface Material {
  name: string;
  url: string;
  assignments?: string[];
}

interface InterviewQuestion {
  question: string;
  options: string[];
  correct?: number;
}

// ===== MANUAL INTERVIEW QUESTIONS =====
const interviewQuestions: InterviewQuestion[] = [
  // (keeping your questions exactly the same…)
  {
    question: "Which regression model is most commonly used for modeling count data?",
    options: ["Linear regression", "Logistic regression", "Poisson regression", "Ridge regression"],
    correct: 2,
  },
  // ... rest of your questions unchanged
];

export default function CourseDetail() {
  const { id: rawId } = useParams();
  const id = Array.isArray(rawId) ? rawId[0] : rawId; // ✅ ensure string

  const [topics, setTopics] = useState<Material[]>([]);
  const [assignments, setAssignments] = useState<Material[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showPPT, setShowPPT] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"study" | "interview" | "assignments">("study");
  const [isTopicsSidebarOpen, setIsTopicsSidebarOpen] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

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
    const correctIndex = interviewQuestions[currentQuestionIndex].correct!;
    if (selectedOption === correctIndex) {
      setSelectedOption(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Wrong answer! Correct option is highlighted. Please select the correct answer to continue.");
    }
  };

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

        const backups: Record<string, string[]> = {
          "Data-Science": [
            "https://docs.google.com/presentation/d/1kAban4f0Uuqk_mKTjLmBOW4dOEfmvKt3/preview",
            "https://docs.google.com/presentation/d/1CIUkcmkhtQQgRJYw76S6DRWdZv-GT-Fl/preview",
            "https://docs.google.com/presentation/d/1Hg4JYyl_CGBIZqtygFupfF2vdnG4-3BU/preview",
            "https://docs.google.com/presentation/d/1hElVRlRnPcVWxaPT5QUE2O5DxwDUQJfT/preview",
            "https://docs.google.com/presentation/d/1C7iZmnKe7cAv5snL3DD3PvdO_N7Yk81p/preview",
          ],
          SQL: [
            "https://docs.google.com/presentation/d/1BECUfhOhXTDWfNPJZDxw4gA1giWYwK1E/preview",
            "https://docs.google.com/presentation/d/1kRJxhgK8ShxRfFRWKMElktz52u1qgWXo/preview",
            "https://docs.google.com/presentation/d/1AbhTDz1cjwZxkhJRdZNnPIar1RIRdlnL/preview",
            "https://docs.google.com/presentation/d/1gjEb5G9LFgT0fZ8XPBqh1lWvtUIO2VP3/preview",
            "https://docs.google.com/presentation/d/192soPE6O_xZ1z5QyIcBgcJ-f1NbmKvjR/preview",
          ],
          "Power-BI": [
            "https://docs.google.com/presentation/d/1Y6i26XAA8OTZFrUSKQugal_zJUHPF3iu/preview",
            "https://docs.google.com/presentation/d/19FoSK-2SB7Lf7ZF8zkXyMmyhiV5GWIEe/preview",
            "https://docs.google.com/presentation/d/1e6XjemjvS-gqSl6OPqv1WW96dqpGoPCa/preview",
            "https://docs.google.com/presentation/d/1cka_VZaaO4bvj7P8t4kv2-0pkkM6c4PD/preview",
            "https://docs.google.com/presentation/d/1MJ3TsDgAN31f-UviHIYJZN-52GL8e_Hh/preview",
          ],
        };

        setTopics(
          (backups[id] || []).map((link, idx) => ({
            name: `${id} Backup PPT ${idx + 1}`,
            url: link,
          }))
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (topics.length > 0 && selectedTopic === null) {
      setSelectedTopic(0);
    }
  }, [topics]);

  useEffect(() => {
    const handleResize = () => {
      setIsTopicsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p className="text-center mt-16">Loading materials...</p>;

  console.log("id:", id, "topics:", topics, "selectedTopic:", selectedTopic);

  // (your full JSX render remains unchanged)
  return (
    <ProtectedRoute>
      {/* ... your JSX UI (sidebar, tabs, quiz, assignments, etc.) stays the same ... */}
    </ProtectedRoute>
  );
}
