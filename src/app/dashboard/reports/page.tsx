"use client";

import { PerformanceOverview } from "@/components/performance/PerformanceOverview";
import { QuizPerformanceChart } from "@/components/performance/QuizPerformanceChart";
import { LearningProgress } from "@/components/performance/LearningProgress";
import { ActivityPieChart } from "@/components/performance/ActivityPieChart";
import { BookOpen, PlayCircle, FileText, HelpCircle, Users } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
// Mock data - in a real app, this would come from your API
const mockStats = {
  overallScore: 87,
  coursesCompleted: 8,
  totalCourses: 12,
  videosWatched: 156,
  totalVideos: 200,
  quizAverage: 89,
  studyTime: 47,
  achievements: 15
};

const mockQuizData = [
  { week: "Week 1", score: 78, attempted: 5, completed: 4 },
  { week: "Week 2", score: 82, attempted: 6, completed: 6 },
  { week: "Week 3", score: 85, attempted: 4, completed: 4 },
  { week: "Week 4", score: 91, attempted: 7, completed: 7 },
  { week: "Week 5", score: 88, attempted: 5, completed: 5 },
  { week: "Week 6", score: 94, attempted: 6, completed: 6 }
];

const mockCourses = [
  {
    id: "1",
    title: "Advanced React Development",
    progress: 85,
    totalLessons: 24,
    completedLessons: 20,
    timeSpent: 15,
    lastActivity: "2 hours ago",
    difficulty: "Advanced" as const,
    category: "Web Development"
  },
  {
    id: "2",
    title: "TypeScript Fundamentals",
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    timeSpent: 12,
    lastActivity: "1 day ago",
    difficulty: "Intermediate" as const,
    category: "Programming"
  },
  {
    id: "3",
    title: "UI/UX Design Principles",
    progress: 60,
    totalLessons: 22,
    completedLessons: 13,
    timeSpent: 8,
    lastActivity: "3 hours ago",
    difficulty: "Beginner" as const,
    category: "Design"
  },
  {
    id: "4",
    title: "Database Design",
    progress: 40,
    totalLessons: 16,
    completedLessons: 6,
    timeSpent: 6,
    lastActivity: "1 week ago",
    difficulty: "Intermediate" as const,
    category: "Backend"
  }
];

const mockActivityData = [
  {
    name: "Video Lectures",
    value: 18,
    color: "hsl(var(--chart-1))",
    icon: PlayCircle
  },
  {
    name: "Quiz Practice",
    value: 12,
    color: "hsl(var(--chart-2))",
    icon: HelpCircle
  },
  {
    name: "Reading Materials",
    value: 9,
    color: "hsl(var(--chart-3))",
    icon: FileText
  },
  {
    name: "Course Projects",
    value: 6,
    color: "hsl(var(--chart-4))",
    icon: BookOpen
  },
  {
    name: "Group Discussions",
    value: 3,
    color: "hsl(var(--chart-5))",
    icon: Users
  }
];

const Dashboard = () => {
  return (
       <ProtectedRoute>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Performance Dashboard</h1>
          <p className="text-muted-foreground">
            Track your learning progress and achievements
          </p>
        </div>

        {/* Performance Overview */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Overview</h2>
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
          <LearningProgress courses={mockCourses} />
        </section>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Dashboard;