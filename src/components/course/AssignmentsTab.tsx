// src/components/course/AssignmentsTab.tsx
"use client";
import { assignments, Assignment } from "@/app/data/assignmentDocs";
import { Download, FileText, FileSpreadsheet, FileQuestion, File } from "lucide-react";

interface AssignmentsTabProps {
  courseId: string;
}

// 📌 Helper function to determine the icon based on file extension
const getFileIcon = (url: string) => {
  const extension = url.split('.').pop()?.split('?')[0]; // Extract file extension
  switch (extension) {
    case 'docx':
    case 'doc':
      return <FileText className="text-blue-500" size={24} />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="text-green-500" size={24} />;
    case 'csv':
      return <FileQuestion className="text-yellow-500" size={24} />;
    default:
      return <File className="text-gray-500" size={24} />;
  }
};

export default function AssignmentsTab({ courseId }: AssignmentsTabProps) {
  const courseAssignments = assignments[courseId];

  if (!courseAssignments || courseAssignments.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-8">
        No assignments available for this course.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {courseAssignments.map((assignment: Assignment, idx: number) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
        >
          {/* File Icon and Title */}
          <div className="flex items-center gap-4">
            {getFileIcon(assignment.url)} 
            <p className="font-medium text-lg text-gray-800">
              {assignment.title}
            </p>
          </div>

          {/* Download Button */}
          <a
            href={assignment.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-4 py-2 bg-purple-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 hover:bg-purple-500"
          >
            <Download size={16} />
            <span>Download</span>
          </a>
        </div>
      ))}
    </div>
  );
}