"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export interface Material {
  name: string;
  url?: string;
  assignments?: string[];
  children?: Material[];
}

interface StudyTabProps {
  topics: Material[];
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  courseId: string;
  onNext?: (topicIndex: string, completed: number, total: number) => void;
  updateProgress?: (courseId: string, completed: number) => void;
}

export default function StudyTab({
  topics,
  selectedTopic,
  setSelectedTopic,
  scrollRef,
  courseId,
  onNext,
  updateProgress,
}: StudyTabProps) {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [cooldown, setCooldown] = useState<number>(10);
  const [lastCompleted, setLastCompleted] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  // Load stored progress
  useEffect(() => {
    const stored = localStorage.getItem("courseProgress");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[courseId]) {
        setCompletedTopics(parsed[courseId]);
      }
    }
  }, [courseId]);

  // ✅ Automatically select first topic if none selected
  useEffect(() => {
    if (!selectedTopic && topics.length > 0) {
      setSelectedTopic("0"); // first topic
    }
  }, [selectedTopic, topics, setSelectedTopic]);

  // Save progress & trigger confetti if complete
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("courseProgress") || "{}");
    stored[courseId] = completedTopics;
    localStorage.setItem("courseProgress", JSON.stringify(stored));

    if (updateProgress) {
      updateProgress(courseId, completedTopics.length);
    }

    const total = countTotalTopics(topics);
    if (completedTopics.length === total && total > 0) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [completedTopics, courseId, updateProgress, topics]);

  // Timer countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const countTotalTopics = (items: Material[]): number =>
    items.reduce(
      (acc, item) =>
        acc + (item.children ? countTotalTopics(item.children) : 1),
      0
    );

  const getTopicByPath = (items: Material[], path: string): Material | null => {
    return path.split(".").reduce<Material | null>((current, part) => {
      if (!current) return null;
      const index = Number(part);
      if (isNaN(index)) return null;
      return current.children?.[index] || null;
    }, { children: items } as any);
  };

  const getNextTopicPath = (items: Material[], currentPath: string): string | null => {
    const leafPaths: string[] = [];

    const traverse = (arr: Material[], prefix = "") => {
      arr.forEach((item, i) => {
        const path = prefix ? `${prefix}.${i}` : `${i}`;
        if (item.children && item.children.length > 0) {
          traverse(item.children, path);
        } else if (item.url) {
          leafPaths.push(path);
        }
      });
    };

    traverse(items);
    const idx = leafPaths.indexOf(currentPath);
    if (idx >= 0 && idx < leafPaths.length - 1) return leafPaths[idx + 1];
    return null;
  };

  // Mark topic complete
  const markComplete = () => {
    if (!selectedTopic) return;

    if (cooldown > 0) {
      setMessage(`⏳ Please study ${cooldown} seconds before marking complete.`);
      return;
    }

    if (!completedTopics.includes(selectedTopic)) {
      const updated = [...completedTopics, selectedTopic];
      setCompletedTopics(updated);
      setLastCompleted(selectedTopic);
      setMessage("");

      const total = countTotalTopics(topics);
      const next = getNextTopicPath(topics, selectedTopic);
      if (next) {
        setTimeout(() => {
          setSelectedTopic(next);
          setLastCompleted(null);
          setCooldown(10);
        }, 1200);
      }

      onNext?.(selectedTopic, updated.length, total);
    }
  };

  // Sidebar topic click (prevent skipping)
  const handleTopicClick = (path: string) => {
    if (!selectedTopic) {
      setSelectedTopic(path);
      return;
    }

    if (!completedTopics.includes(selectedTopic)) {
      alert("⚠️ Please mark the current topic as complete before moving to the next.");
      return;
    }

    setSelectedTopic(path);
  };

  // Recursive sidebar renderer
  const renderSidebarTopics = (items: Material[], parentIndex = "", level = 0) =>
    items.map((item, idx) => {
      const index = parentIndex ? `${parentIndex}.${idx}` : `${idx}`;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = false;

      const bgColors = ["bg-gray-200", "bg-gray-100", "bg-gray-50"];
      const bg = bgColors[level % bgColors.length];

      if (hasChildren) {
        return (
          <li key={index} className="mb-1">
            <div
              className={`${bg} font-semibold cursor-pointer flex justify-between items-center p-2 rounded-md hover:bg-purple-100`}
              onClick={() => handleTopicClick(index)}
            >
              <span>{item.name}</span>
              <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </div>
            {isOpen && (
              <ul className="ml-4 mt-1 pl-2 border-l-2 border-purple-300 space-y-1">
                {renderSidebarTopics(item.children!, index, level + 1)}
              </ul>
            )}
          </li>
        );
      }

      return (
        <li
          key={index}
          className={`p-2 rounded-md cursor-pointer ${
            completedTopics.includes(index)
              ? "bg-green-200 text-black"
              : selectedTopic === index
              ? "bg-purple-300 text-black"
              : "bg-gray-100 hover:bg-purple-200 text-black"
          }`}
          onClick={() => handleTopicClick(index)}
        >
          {item.name}
        </li>
      );
    });

  if (!selectedTopic) {
    return <p className="text-gray-600">Select a topic to start studying.</p>;
  }

  const topic = getTopicByPath(topics, selectedTopic);
  if (!topic) return <p className="text-red-500">Topic not found.</p>;

  const isFile = topic.url && /\.(pdf|docx?|pptx?|xlsx?|zip|rar)$/i.test(topic.url);

  return (
    <div ref={scrollRef}>
      <h2 className="text-xl font-semibold mb-4">{topic.name}</h2>

      {topic.url && !isFile ? (
        <iframe src={topic.url} className="w-full h-[500px] border rounded-md" allowFullScreen></iframe>
      ) : isFile ? (
        <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-gray-50">
          <p className="mb-2 text-gray-700">{topic.name}</p>
          <a
            href={topic.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Download File
          </a>
        </div>
      ) : (
        <p className="text-gray-500">No content available.</p>
      )}

      {message && <p className="text-red-500 mt-2">{message}</p>}

      <button
        onClick={markComplete}
        className={`mt-4 px-4 py-2 rounded-md text-white ${
          lastCompleted === selectedTopic ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {lastCompleted === selectedTopic ? "Completed!" : "Mark as Complete"}
      </button>
    </div>
  );
}
