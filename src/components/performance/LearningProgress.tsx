import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeSpent: number;
  lastActivity: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

interface LearningProgressProps {
  courses: Course[];
}

export function LearningProgress({ courses }: LearningProgressProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Intermediate":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Advanced":
        return "bg-gradient-to-r from-purple-200 to-blue-200 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "text-purple-600";
    if (progress >= 70) return "text-blue-600";
    return "text-purple-500";
  };

  return (
    <Card
      className="animate-slide-up border-border/50"
      style={{ animationDelay: "200ms" }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          <BookOpen className="h-5 w-5 text-purple-500" />
          Learning Progress
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your progress across all courses
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{course.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getDifficultyColor(course.difficulty)}`}
                  >
                    {course.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-lg font-bold ${getProgressColor(
                    course.progress
                  )}`}
                >
                  {course.progress}%
                </div>
                {course.progress === 100 && (
                  <CheckCircle className="h-4 w-4 text-purple-600 ml-auto mt-1" />
                )}
              </div>
            </div>

            {/* Pink/Blue Progress Bar */}
            <Progress
              value={course.progress}
              className="h-2 bg-blue-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500"
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3 text-purple-500" />
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  {course.timeSpent} minutes spent
                </span>
              </div>
              <span className="text-blue-600">Last: {course.lastActivity}</span>
            </div>
          </div>
        ))}

        {/* Summary Section */}
        <div className="pt-4 border-t border-purple-300">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-purple-600">
                {courses.filter((c) => c.progress === 100).length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-600">
                {
                  courses.filter(
                    (c) => c.progress > 0 && c.progress < 100
                  ).length
                }
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {Math.round(
                  courses.reduce((sum, course) => sum + course.timeSpent, 0)
                )}
                 m
              </div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
