import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BookOpen, PlayCircle, Trophy, Target, Clock } from "lucide-react";

interface PerformanceOverviewProps {
  stats: {
    overallScore: number;
    coursesCompleted: number;
    totalCourses: number;
    videosWatched: number;
    totalVideos: number;
    quizAverage: number;
    studyTime: number;
    achievements: number;
  };
}

export function PerformanceOverview({ stats }: PerformanceOverviewProps) {
  const completionRate = Math.round((stats.coursesCompleted / stats.totalCourses) * 100);
  const videoProgress = Math.round((stats.videosWatched / stats.totalVideos) * 100);

  // Map score into purple/blue accents
  const getScoreColor = (score: number) => {
    if (score >= 85) return "purple-500";
    if (score >= 70) return "blue-500";
    return "red-500"; // low score fallback
  };

  const performanceCards = [
    {
      title: "Overall Score",
      value: `${stats.overallScore}%`,
      icon: TrendingUp,
      color: getScoreColor(stats.overallScore),
      progress: undefined,
      gradient: "bg-gradient-to-r from-purple-500 to-blue-500"
    },
    {
      title: "Course Progress",
      value: `${stats.coursesCompleted}/${stats.totalCourses}`,
      icon: BookOpen,
      color: "blue-500",
      progress: completionRate,
      gradient: "bg-gradient-to-r from-blue-400 to-purple-400"
    },
    {
      title: "Videos Watched",
      value: `${stats.videosWatched}/${stats.totalVideos}`,
      icon: PlayCircle,
      color: "purple-500",
      progress: videoProgress,
      gradient: "bg-gradient-to-r from-purple-400 to-blue-400"
    },
    {
      title: "Quiz Average",
      value: `${stats.quizAverage}%`,
      icon: Target,
      color: getScoreColor(stats.quizAverage),
      progress: undefined,
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500"
    },
    {
      title: "Study Time",
      value: `${stats.studyTime}h`,
      icon: Clock,
      color: "blue-400",
      subtitle: "This month",
      gradient: "bg-gradient-to-r from-purple-500 to-blue-400"
    },
    {
      title: "Achievements",
      value: stats.achievements.toString(),
      icon: Trophy,
      color: "purple-400",
      subtitle: "Unlocked",
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {performanceCards.map((card, index) => (
        <Card
          key={card.title}
          className="relative overflow-hidden animate-fade-in border-border/50 hover:border-border transition-colors duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient overlay */}
          <div className={`absolute inset-0 opacity-15 ${card.gradient}`} />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 text-${card.color}`} />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {card.value}
                </div>
                {card.subtitle && (
                  <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                )}
              </div>
              {card.progress !== undefined && (
                <div className="ml-4">
                  <Badge
                    variant="outline"
                    className={`text-${card.color} bg-${card.color}/20 border-${card.color}/30`}
                  >
                    {card.progress}%
                  </Badge>
                </div>
              )}
            </div>
            {card.progress !== undefined && (
              <div className="mt-3">
                <Progress
                  value={card.progress}
                  className={`h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500`}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
