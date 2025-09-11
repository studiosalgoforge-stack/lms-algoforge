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

  const getScoreColor = (score: number) => {
    if (score >= 85) return "success";
    if (score >= 70) return "warning";
    return "destructive";
  };

  const performanceCards = [
    {
      title: "Overall Score",
      value: `${stats.overallScore}%`,
      icon: TrendingUp,
      color: getScoreColor(stats.overallScore),
      gradient: "bg-gradient-primary"
    },
    {
      title: "Course Progress",
      value: `${stats.coursesCompleted}/${stats.totalCourses}`,
      icon: BookOpen,
      color: "info",
      progress: completionRate,
      gradient: "bg-gradient-info"
    },
    {
      title: "Videos Watched",
      value: `${stats.videosWatched}/${stats.totalVideos}`,
      icon: PlayCircle,
      color: "success",
      progress: videoProgress,
      gradient: "bg-gradient-success"
    },
    {
      title: "Quiz Average",
      value: `${stats.quizAverage}%`,
      icon: Target,
      color: getScoreColor(stats.quizAverage),
      gradient: "bg-gradient-warning"
    },
    {
      title: "Study Time",
      value: `${stats.studyTime}h`,
      icon: Clock,
      color: "info",
      subtitle: "This month",
      gradient: "bg-gradient-info"
    },
    {
      title: "Achievements",
      value: stats.achievements.toString(),
      icon: Trophy,
      color: "warning",
      subtitle: "Unlocked",
      gradient: "bg-gradient-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {performanceCards.map((card, index) => (
        <Card key={card.title} className="relative overflow-hidden animate-fade-in border-border/50 hover:border-border transition-colors duration-300" style={{ animationDelay: `${index * 100}ms` }}>
          <div className={`absolute inset-0 opacity-10 ${card.gradient}`} />
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
                  <Badge variant="outline" className={`text-${card.color}-foreground bg-${card.color}/20 border-${card.color}/30`}>
                    {card.progress}%
                  </Badge>
                </div>
              )}
            </div>
            {card.progress !== undefined && (
              <div className="mt-3">
                <Progress 
                  value={card.progress} 
                  className="h-2" 
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}