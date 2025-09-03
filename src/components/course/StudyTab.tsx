"use client";
import { Dispatch, SetStateAction, RefObject, useEffect } from "react";

export interface Material {
  name: string;
  url: string;
  assignments?: string[];
}

interface StudyTabProps {
  topics: Material[];
  selectedTopic: number | null;
  setSelectedTopic: Dispatch<SetStateAction<number | null>>;
  scrollRef: RefObject<HTMLDivElement | null>;
}

export default function StudyTab({
  topics,
  selectedTopic,
  setSelectedTopic,
  scrollRef,
}: StudyTabProps) {
  // Default: select the first topic if none selected
  useEffect(() => {
    if (topics.length && selectedTopic === null) {
      setSelectedTopic(0);
    }
  }, [topics, selectedTopic, setSelectedTopic]);

  if (!topics.length) return <p>No study materials available.</p>;

  return (
    <div>
      {selectedTopic !== null && (
        <div>
          {/* PPT Viewer */}
          <div className="relative w-full h-[400px] flex items-center overflow-hidden">
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
                sandbox="allow-scripts allow-same-origin"
                key={selectedTopic}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
