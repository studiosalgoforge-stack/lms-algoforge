"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const courses = [
  { title: "Data Structures & Algorithms", progress: 85, grade: "A" },
  { title: "Machine Learning Basics", progress: 62, grade: "B+" },
  { title: "Database Management Systems", progress: 45, grade: "Pending" },
];

const assignments = [
  { title: "ML Project Proposal", due: "20 Aug 2025" },
  { title: "SQL Queries Practice", due: "25 Aug 2025" },
];

export default function StudentReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Courses Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.map((course, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">{course.title}</span>
                <span className="text-sm text-gray-500">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <div className="text-sm text-gray-600">Grade: {course.grade}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {assignments.map((a, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{a.title}</span>
              <span className="text-gray-500">{a.due}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
