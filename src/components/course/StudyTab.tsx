"use client";
import { Dispatch, SetStateAction, RefObject, useState } from "react";

export interface Material {
  name: string;
  url: string;
  assignments?: string[];
}

interface StudyTabProps {
  topics: Material[];
  selectedTopic: number | null;
  setSelectedTopic: Dispatch<SetStateAction<number | null>>;
  scrollRef: RefObject<HTMLDivElement | null>; // safer typing
}

export default function StudyTab({
  topics,
  selectedTopic,
  setSelectedTopic,
  scrollRef,
}: StudyTabProps) {
  const [showPPT, setShowPPT] = useState(false);

  if (!topics.length) return <p>No study materials available.</p>;

  // Scroll handler
  const scrollContent = (direction: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Tab Content */}
      {selectedTopic !== null && (
        <div>
          {/* Toggle PPT Card */}
          <div
            className="cursor-pointer bg-purple-100 hover:bg-purple-200 p-2 rounded-md shadow-md mb-4"
            onClick={() => setShowPPT(!showPPT)}
          >
            <h2 className="font-semibold text-lg mb-0">
              {topics[selectedTopic].name}
            </h2>
            <p className="text-sm text-gray-700">
              {showPPT ? "Click to hide PPT" : "Click to view PPT"}
            </p>
          </div>

          {/* PPT Viewer */}
          {showPPT && (
            <div 
            className="relative w-full h-[400px] flex items-center overflow-hidden">
        

              {/* Iframe container */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto h-full w-full scroll-smooth no-scrollbar"
              >
                <iframe
                  src={
                    topics[selectedTopic].url.includes("/preview")
                      ? topics[selectedTopic].url
                      : topics[selectedTopic].url + "/preview"
                  }
                  className="flex-shrink-0 w-full h-full mx-2 rounded-md border"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin" // restrict iframe
                  key={selectedTopic}
                ></iframe>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
