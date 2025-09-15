import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Activity } from "lucide-react";

interface ActivityData {
  name: string;
  value: number | string;
  color?: string;
  icon: React.ComponentType<any>;
}

interface ActivityPieChartProps {
  data: ActivityData[];
  title?: string;
}

// Fallback color palette (hardcoded HEXs, never black)
const DEFAULT_COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28BFF", "#FF6F91", "#2ECC71", "#E74C3C",
  "#3498DB", "#F39C12"
];

// Convert minutes to hh:mm
const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export function ActivityPieChart({ data, title = "Learning Activities" }: ActivityPieChartProps) {
  // Normalize values & assign safe colors
  const normalizedData = data.map((item, index) => ({
    ...item,
    value: Number(item.value) || 0,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  const totalMinutes = normalizedData.reduce((sum, item) => sum + item.value, 0);

  // Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const percentage = totalMinutes > 0 ? ((d.value / totalMinutes) * 100).toFixed(1) : "0";
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="font-medium text-foreground">{d.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatTime(d.value)} ({percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  // Pie label
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // hide very small slices
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#000" // black text for readability
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="animate-slide-up border-border/50" style={{ animationDelay: "400ms" }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-purple-900 flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-900" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of your learning time</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {normalizedData.length > 0 && totalMinutes > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={normalizedData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomLabel}
                  outerRadius={100}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {normalizedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color} // guaranteed non-black
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No activity yet
            </div>
          )}
        </div>

        {/* Legend with icons */}
        {normalizedData.length > 0 && totalMinutes > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-border/50">
            {normalizedData.map((item) => {
              const IconComponent = item.icon;
              const percentage = ((item.value / totalMinutes) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center gap-3 text-purple-900">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <IconComponent className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(item.value)} ({percentage}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Total summary */}
        {totalMinutes > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {formatTime(totalMinutes)}
            </div>
            <div className="text-xs text-muted-foreground">Total Learning Time</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
