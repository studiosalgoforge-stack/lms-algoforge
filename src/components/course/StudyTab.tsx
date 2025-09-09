"use client";
import { Dispatch, SetStateAction, RefObject, useEffect } from "react";

export interface Material {
  name: string;
  url?: string;
  link?: string;
  file?: string;
  assignments?: string[];
  children?: Material[];
}

// Find topic by index (nested support)
function findTopicByIndex(items: Material[], index: string | null): Material | null {
  if (!index) return null;
  const parts = index.split(".").map(Number);
  let current: Material | undefined;
  let arr = items;
  for (const i of parts) {
    current = arr[i];
    if (!current) return null;
    arr = current.children || [];
  }
  return current || null;
}

// Flatten leaf topics for navigation
function getAllLeafIndices(topics: Material[]): string[] {
  const indices: string[] = [];
  function traverse(items: Material[], prefix = "") {
    items.forEach((item, i) => {
      const index = prefix ? `${prefix}.${i}` : `${i}`;
      if (item.children && item.children.length > 0) {
        traverse(item.children, index);
      } else if (item.url || item.link || item.file) {
        indices.push(index);
      }
    });
  }
  traverse(topics);
  return indices;
}

interface StudyTabProps {
  topics: Material[];
  selectedTopic: string | null;
  setSelectedTopic: Dispatch<SetStateAction<string | null>>;
  scrollRef: RefObject<HTMLDivElement | null>;
  onNext?: (nextIndex: string | null, completedCount: number, total: number) => void;
}

export default function StudyTab({
  topics,
  selectedTopic,
  setSelectedTopic,
  scrollRef,
  onNext,
}: StudyTabProps) {
  const currentTopic = findTopicByIndex(topics, selectedTopic);
  const getUrl = (item: Material) => item?.url || item?.link || item?.file;

  if (!topics.length) return <p>No study materials available.</p>;
  if (!currentTopic || !getUrl(currentTopic))
    return <p>Study Materials are on the sidebar - please select one to view.</p>;

  const url = getUrl(currentTopic)!;
  const lower = url.toLowerCase();

  const leafIndices = getAllLeafIndices(topics);
  const currentPos = selectedTopic ? leafIndices.indexOf(selectedTopic) : 0;

  const isPreviewable =
    url.includes("/preview") ||
    lower.endsWith(".pdf") ||
    lower.endsWith(".ppt") ||
    lower.endsWith(".pptx") ||
    lower.endsWith(".doc") ||
    lower.endsWith(".docx");

  // Mark progress in localStorage
  useEffect(() => {
    if (selectedTopic) {
      const completed: string[] = JSON.parse(localStorage.getItem("completedTopics") || "[]");
      if (!completed.includes(selectedTopic)) {
        completed.push(selectedTopic);
        localStorage.setItem("completedTopics", JSON.stringify(completed));
        onNext?.(selectedTopic, completed.length, leafIndices.length);
      }
    }
  }, [selectedTopic]);

  const getNextIndex = () => (currentPos < leafIndices.length - 1 ? leafIndices[currentPos + 1] : selectedTopic);
  const getPrevIndex = () => (currentPos > 0 ? leafIndices[currentPos - 1] : selectedTopic);

  return (
    <div>
      {isPreviewable ? (
        <div className="relative w-full h-[400px] flex flex-col overflow-hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto h-full w-full scroll-smooth no-scrollbar"
          >
            <iframe
              src={url.includes("/preview") ? url : url + "/preview"}
              className="flex-shrink-0 w-full h-full mx-2 rounded-md border"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin"
              key={selectedTopic}
            ></iframe>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              disabled={currentPos === 0}
              onClick={() => setSelectedTopic(getPrevIndex())}
            >
              Previous
            </button>

            <button
              className="px-4 py-2 bg-purple-500 text-white rounded"
              disabled={currentPos === leafIndices.length - 1}
              onClick={() => setSelectedTopic(getNextIndex())}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 border rounded-md bg-gray-50">
          <p className="mb-2 text-gray-700">{currentTopic.name}</p>
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Download File
          </a>
        </div>
      )}
    </div>
  );
}
