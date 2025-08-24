"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Topic = {
  name: string;
  url: string;
};

const backups: Record<string, string[]> = {
  course1: [
    "https://example.com/ppt1.pdf",
    "https://example.com/ppt2.pdf",
  ],
  course2: [
    "https://example.com/ppt3.pdf",
  ],
};

export default function CoursePage() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? "";

  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    if (!id) return; // ✅ guard against undefined

    if (backups[id]) {
      setTopics(
        backups[id].map((link, idx) => ({
          name: `${id} Backup PPT ${idx + 1}`,
          url: link,
        }))
      );
    } else {
      setTopics([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // ✅ safe dependency

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Course: {id}</h1>
      {topics.length === 0 ? (
        <p>No backups available for this course.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {topics.map((topic, idx) => (
            <li key={idx}>
              <a
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {topic.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
