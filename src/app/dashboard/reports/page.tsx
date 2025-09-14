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
  timeSpent: number; // in minutes
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
  const [quizData, setQuizData] = useState<any[]>([]);
  const [videoData, setVideoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // CORRECTED: Added /api to the base URL
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:10000/api";

        // Unified call to fetch all progress + studyTime
        const dashboardRes = await fetch(`${BASE_URL}/progress/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!dashboardRes.ok) throw new Error("Failed to fetch dashboard");
        const dashboardJson = await dashboardRes.json();

        const { courseProgress, quizProgress, videoProgress, studyTime } =
          dashboardJson.progress || {};

        const courseNames = ["Data-Science", "Power-BI", "SQL", "Data-Engineering" , "Tableau"];
        const courseData: Course[] = courseNames.map((courseName) => {
          const topics = backupPPTs[courseName] || [];
          const totalLessons = countPPTLeafTopics(topics);

          const completedArray: string[] =
            (courseProgress || []).find((c: any) => c.courseKey === courseName)
              ?.completedTopics || [];

          const completedLessons = completedArray.length;
          const progress =
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;

          const timeSpent =
            studyTime?.find((s: any) => s.courseKey === courseName)?.totalMinutes ||
            0;

          return {
            id: courseName,
            title: courseName.replace("-", " "),
            progress,
            totalLessons,
            completedLessons,
            timeSpent, // keep as number for TS
            lastActivity: "Today",
            difficulty: "Intermediate",
            category: "Data",
          };
        });
        setCourses(courseData);

        // Quiz chart
        const quizChartData = (quizProgress || []).map((q: any, idx: number) => ({
          week: `Quiz ${idx + 1}`,
          score: q.score,
          attempted: q.totalQuestions,
          completed: q.correctAnswers,
        }));
        setQuizData(quizChartData);

        // Video chart
        const videoChartData = [
          {
            name: "Video Lectures",
            value: videoProgress?.length || 0,
            color: "hsl(var(--chart-1))",
            icon: PlayCircle,
          },
          {
            name: "Quiz Practice",
            value:
              quizProgress?.reduce((acc: number, q: any) => acc + q.totalQuestions, 0) ||
              0,
            color: "hsl(var(--chart-2))",
            icon: HelpCircle,
          },
          {
            name: "Reading Materials",
            value: courseData.reduce((acc, c) => acc + c.completedLessons, 0),
            color: "hsl(var(--chart-3))",
            icon: FileText,
          },
          {
            name: "Course Projects",
            value: 2,
            color: "hsl(var(--chart-4))",
            icon: BookOpen,
          },
          {
            name: "Group Discussions",
            value: 3,
            color: "hsl(var(--chart-5))",
            icon: Users,
          },
        ];
        setVideoData(videoChartData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Performance overview stats
  const stats = {
    overallScore:
      quizData.length > 0
        ? Math.round(quizData.reduce((acc, q) => acc + q.score, 0) / quizData.length)
        : 0,
    coursesCompleted: courses.filter((c) => c.progress === 100).length,
    totalCourses: courses.length,
    videosWatched: videoData.find((d) => d.name === "Video Lectures")?.value || 0,
    totalVideos: videoData.find((d) => d.name === "Video Lectures")?.value || 0,
    quizAverage:
      quizData.length > 0
        ? Math.round(quizData.reduce((acc, q) => acc + q.score, 0) / quizData.length)
        : 0,
    studyTime: courses.reduce((acc, c) => acc + c.timeSpent, 0), // total minutes
    achievements: 15,
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground text-purple-800">
              Performance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your learning progress and achievements
            </p>
          </div>

          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-foreground text-purple-900 mb-4">
              Overview
            </h2>
            <PerformanceOverview stats={stats} />
          </section>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <QuizPerformanceChart data={quizData} />
            </section>
            <section>
              <ActivityPieChart data={videoData} />
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
