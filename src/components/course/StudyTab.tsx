"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export interface Material {
  name: string;
  url?: string;
  file?: string;
  link?: string;
  children?: Material[];
}

interface StudyTabProps {
  topics: Material[];
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  courseId: string;
  onNext?: (topicId: string) => void;
  completedTopics?: string[];
}

export default function StudyTab({
  topics,
  selectedTopic,
  setSelectedTopic,
  scrollRef,
  courseId,
  onNext,
  completedTopics = [],
}: StudyTabProps) {
  const [cooldown, setCooldown] = useState<number>(10);
  const [lastCompleted, setLastCompleted] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // 👉 helper to resolve nested topic by path like "0.1.2"
const getTopicByPath = (path: string): Material | null => {
  const parts = path.split(".").map(Number);
  let current: Material | null = null;
  let children = topics; // 🔑 always start from root

  for (let idx of parts) {
    current = children[idx];
    if (!current) return null;
    children = current.children || [];
  }
  return current;
};


  // ✅ auto-select first topic
  useEffect(() => {
    if (!selectedTopic && topics.length > 0) {
      setSelectedTopic("0");
    }
  }, [selectedTopic, topics, setSelectedTopic]);

  // cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

 const topic = selectedTopic ? getTopicByPath(selectedTopic) : null;

  if (!topic) return <p className="text-gray-600">Select a topic to start studying.</p>;

  const markComplete = () => {
    if (!selectedTopic) return;
    if (cooldown > 0) {
      setMessage(`⏳ Please study ${cooldown} seconds before marking complete.`);
      return;
    }

    if (!completedTopics.includes(selectedTopic)) {
      onNext?.(selectedTopic);
      setLastCompleted(selectedTopic);
      setMessage("");

      if (completedTopics.length + 1 === topics.length && topics.length > 0) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <div ref={scrollRef} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{topic.name}</h2>

      <div className="space-y-4">
        {topic.children?.map((child, idx) => {
          const isFile =
            child.file ||
            (child.url && /\.(pdf|docx?|pptx?|xlsx?|zip|rar)$/i.test(child.url));
          const isOpen = openIdx === idx;

          return (
            <div key={idx} className="border rounded bg-white">
              <div
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 hover:bg-gray-200"
              >
                <h3 className="font-semibold">{child.name}</h3>
                <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className="p-4 border-t space-y-3">
                  {child.link && (
                    <iframe
                      src={child.link}
                      className="w-full h-90 border rounded"
                      allowFullScreen
                    ></iframe>
                  )}
                  {isFile && (
                    <a
                      href={child.file || child.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-2 bg-purple-400 text-white rounded hover:bg-purple-500"
                    >
                      ⬇ Download
                    </a>
                  )}
                  {!child.link && !isFile && (
                    <p className="text-gray-500">No content available.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {message && <p className="text-red-500 mt-2">{message}</p>}

      <button
        onClick={markComplete}
        className={`mt-6 px-5 py-2 rounded-md text-white ${
          lastCompleted === selectedTopic
            ? "bg-green-600 hover:bg-green-700"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {lastCompleted === selectedTopic ? "Completed!" : "Mark as Complete"}
      </button>
    </div>
  );
}
