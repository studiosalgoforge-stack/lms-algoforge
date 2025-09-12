"use client";

import { useEffect, useState } from "react";
import { PerformanceOverview } from "@/components/performance/PerformanceOverview";
import { QuizPerformanceChart } from "@/components/performance/QuizPerformanceChart";
import { LearningProgress } from "@/components/performance/LearningProgress";
import { ActivityPieChart } from "@/components/performance/ActivityPieChart";
import { BookOpen, PlayCircle, FileText, HelpCircle, Users } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { backupPPTs } from "@/app/data/backupPPTs";

type Course = {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeSpent: number;
  lastActivity: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
};

const countPPTLeafTopics = (items: any[]): number => {
  return items.reduce((acc, item) => {
    let count = 0;
    if (item.file || item.link || item.url) count += 1;
    if (item.children?.length) count += countPPTLeafTopics(item.children);
    return acc + count;
  }, 0);
};

const Dashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : "";
        if (!token) return;

        const BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000";
        const res = await fetch(`${BASE_URL}/api/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch progress");
        const data = await res.json();
        const userProgress = data.courseProgress || {};

        const courseNames = ["Data-Science", "Power-BI", "SQL", "Data-Engineering"];
        const courseData: Course[] = courseNames.map((courseName) => {
          const topics = backupPPTs[courseName] || [];
          const totalLessons = countPPTLeafTopics(topics);

          const completedArray: string[] = userProgress[courseName] || [];
          const completedLessons = completedArray.length;

          const progress =
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;

          return {
            id: courseName,
            title: courseName.replace("-", " "),
            progress,
            totalLessons,
            completedLessons,
            timeSpent: Math.floor(Math.random() * 20) + 5,
            lastActivity: "Today",
            difficulty: "Intermediate",
            category: "Data",
          };
        });

        setCourses(courseData);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const mockStats = {
    overallScore: 87,
    coursesCompleted: courses.filter((c) => c.progress === 100).length,
    totalCourses: courses.length,
    videosWatched: 1,
    totalVideos: 2,
    quizAverage: 89,
    studyTime: 47,
    achievements: 15,
  };

  const mockQuizData = [
    { week: "Week 1", score: 78, attempted: 5, completed: 4 },
    { week: "Week 2", score: 82, attempted: 6, completed: 6 },
    { week: "Week 3", score: 85, attempted: 4, completed: 4 },
    { week: "Week 4", score: 91, attempted: 7, completed: 7 },
    { week: "Week 5", score: 88, attempted: 5, completed: 5 },
    { week: "Week 6", score: 94, attempted: 6, completed: 6 },
  ];

  const mockActivityData = [
    { name: "Video Lectures", value: 2, color: "hsl(var(--chart-1))", icon: PlayCircle },
    { name: "Quiz Practice", value: 20, color: "hsl(var(--chart-2))", icon: HelpCircle },
    { name: "Reading Materials", value: 9, color: "hsl(var(--chart-3))", icon: FileText },
    { name: "Course Projects", value: 2, color: "hsl(var(--chart-4))", icon: BookOpen },
    { name: "Group Discussions", value: 3, color: "hsl(var(--chart-5))", icon: Users },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground text-purple-800">
              Performance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your learning progress and achievements
            </p>
          </div>

          {/* Performance Overview */}
          <section>
            <h2 className="text-xl font-semibold text-foreground text-purple-900 mb-4">
              Overview
            </h2>
            <PerformanceOverview stats={mockStats} />
          </section>

          {/* Charts and Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <QuizPerformanceChart data={mockQuizData} />
            </section>
            <section>
              <ActivityPieChart data={mockActivityData} />
            </section>
          </div>

          {/* Learning Progress */}
          <section>
            {loading ? (
              <p className="text-gray-500">Loading progress...</p>
            ) : (
              <LearningProgress courses={courses} />
            )}
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
