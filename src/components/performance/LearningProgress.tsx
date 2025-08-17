import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, Star } from "lucide-react";

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
      case "Beginner": return "success";
      case "Intermediate": return "warning";
      case "Advanced": return "destructive";
      default: return "secondary";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "text-success";
    if (progress >= 70) return "text-warning";
    return "text-primary";
  };

  return (
    <Card className="animate-slide-up border-border/50" style={{ animationDelay: "200ms" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Learning Progress
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track your progress across all courses
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {courses.map((course, index) => (
          <div key={course.id} className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{course.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs bg-${getDifficultyColor(course.difficulty)}/20 border-${getDifficultyColor(course.difficulty)}/30`}
                  >
                    {course.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{course.category}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getProgressColor(course.progress)}`}>
                  {course.progress}%
                </div>
                {course.progress === 100 && (
                  <CheckCircle className="h-4 w-4 text-success ml-auto mt-1" />
                )}
              </div>
            </div>

            <Progress value={course.progress} className="h-2" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.timeSpent}h spent
                </span>
              </div>
              <span>Last: {course.lastActivity}</span>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-chart-1">
                {courses.filter(c => c.progress === 100).length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-chart-2">
                {courses.filter(c => c.progress > 0 && c.progress < 100).length}
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-xl font-bold text-chart-3">
                {Math.round(courses.reduce((sum, course) => sum + course.timeSpent, 0))}h
              </div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}