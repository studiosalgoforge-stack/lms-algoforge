"use client";
import React, { useState } from "react";

export interface Video {
  title: string;
  url: string; // YouTube/Drive/direct embed URL
}

interface VideoTabProps {
  videos: Video[];
}

const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    // Extract YouTube ID
    const youtubeId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1].split("?")[0]
      : new URL(url).searchParams.get("v");

    return `https://www.youtube.com/embed/${youtubeId}`;
  } else if (url.includes("drive.google.com")) {
    // Extract Google Drive file ID
    const match = url.match(/\/d\/(.*)\/(view|preview)/);
    const fileId = match ? match[1] : "";
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  return url; // fallback
};

const VideoTab: React.FC<VideoTabProps> = ({ videos }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!videos || videos.length === 0) {
    return <p className="text-gray-500">No videos available for this course.</p>;
  }

  return (
    <div className="space-y-4">
      {videos.map((video, idx) => (
        <div
          key={idx}
          className="border rounded-lg shadow-md"
        >
          {/* Card header (clickable) */}
          <button
            className="w-full text-left px-4 py-3 font-semibold text-lg bg-gray-100 hover:bg-purple-200 rounded-t-lg"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {video.title}
          </button>

          {/* Expand section with video */}
          {openIndex === idx && (
            <div className="p-4 border-t">
              <div className="relative w-full pb-[56.25%] h-0">
                <iframe
                  src={getEmbedUrl(video.url)}
                  title={video.title}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  sandbox="allow-scripts allow-same-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
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
