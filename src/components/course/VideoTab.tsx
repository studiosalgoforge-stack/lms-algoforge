// VideoTab.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";

export interface Video {
  title: string;
  url: string;
  id: string;
}

interface VideoTabProps {
  videos: Video[];
  courseId: string;
}

const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const youtubeId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1].split("?")[0]
      : new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${youtubeId}`;
  } else if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/(.*)\/(view|preview)/);
    const fileId = match ? match[1] : "";
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
};
const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

const VideoTab: React.FC<VideoTabProps> = ({ videos }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const markVideoProgress = async (
    videoId: string,
    watchedDuration: number,
    totalDuration: number
  ) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE}/progress/video/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ watchedDuration, totalDuration }),
      });
    } catch (err) {
      console.error("Failed to update video progress:", err);
    }
  };

  useEffect(() => {
    if (openIndex !== null) {
      const video = videos[openIndex];
      // Start progress at 0
      markVideoProgress(video.id, 0, 100);
    }
  }, [openIndex]);

  if (!videos || videos.length === 0) {
    return <p className="text-gray-500">No videos available for this course.</p>;
  }

  return (
    <div className="space-y-4">
      {videos.map((video, idx) => (
        <div key={video.id} className="border rounded-lg shadow-md">
          <button
            className="w-full text-left px-4 py-3 font-semibold text-lg bg-gray-100 hover:bg-purple-200 rounded-t-lg"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {video.title}
          </button>

          {openIndex === idx && (
            <div className="p-4 border-t">
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  src={getEmbedUrl(video.url)}
                  title={video.title}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                  onLoad={() => markVideoProgress(video.id, 100, 100)} // mark complete
                ></iframe>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoTab;
