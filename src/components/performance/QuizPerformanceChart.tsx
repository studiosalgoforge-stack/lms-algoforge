import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface QuizPerformanceChartProps {
  data: {
    week: string;
    score: number;
    attempted: number;
    completed: number;
  }[];
}

export function QuizPerformanceChart({ data }: QuizPerformanceChartProps) {
  const averageScore = Math.round(
    data.reduce((sum, item) => sum + item.score, 0) / data.length
  );
  const totalQuizzes = data.reduce((sum, item) => sum + item.attempted, 0);

  return (
    <Card className="animate-slide-up border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground text-purple-900">
              Quiz Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Weekly progress tracking
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-500">{averageScore}%</div>
            <div className="text-xs text-muted-foreground">Average Score</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                {/* Purple–blue gradient fill */}
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="week"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--card-foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="url(#lineGradient)" // stroke uses gradient too
                strokeWidth={3}
                fill="url(#scoreGradient)"
                dot={{ fill: "#a855f7", stroke: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: "#3b82f6",
                  fill: "#a855f7",
                  strokeWidth: 2,
                }}
              />
              {/* Line stroke gradient */}
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {totalQuizzes}
            </div>
            <div className="text-xs text-muted-foreground">Total Quizzes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {data.reduce((sum, item) => sum + item.completed, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
