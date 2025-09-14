"use client";
import { Material } from "./StudyTab";

interface AssignmentsTabProps {
  topics: Material[];
  selectedTopic: string | null; 
}

// helper to resolve topic by path
function getTopicByPath(topics: Material[], path: string): Material | null {
  return path.split(".").reduce<Material | null>((current, part) => {
    if (!current) return null;
    const index = Number(part);
    if (isNaN(index)) return null;
    return current.children?.[index] || null;
  }, { children: topics } as any);
}

export default function AssignmentsTab({ topics, selectedTopic }: AssignmentsTabProps) {
  if (selectedTopic === null) return <p>Select a topic to view assignments.</p>;

  const topic = getTopicByPath(topics, selectedTopic);

  if (!topic?.assignments || topic.assignments.length === 0) {
    return <p>No assignments available for this topic.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topic.assignments.map((link, idx) => (
        <a
          key={idx}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className="block p-4 border rounded-md shadow hover:bg-purple-50 transition"
        >
          View Assignment {idx + 1}
        </a>
      ))}
    </div>
  );
} //iqbal
