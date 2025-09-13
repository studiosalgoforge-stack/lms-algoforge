import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Activity } from "lucide-react";

interface ActivityData {
  name: string;
  value: number;
  color: string;
  icon: React.ComponentType<any>;
}

interface ActivityPieChartProps {
  data: ActivityData[];
  title?: string;
}

export function ActivityPieChart({ data, title = "Learning Activities" }: ActivityPieChartProps) {
  const totalHours = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalHours) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium text-foreground">{data.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {data.value}h ({percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; 
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="hsl(var(--foreground))" 
        textAnchor={x > cx ? 'start' : 'end'} 
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
        <CardTitle className="text-xl font-semibold text-foreground  text-purple-900 flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-900" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Distribution of your learning time
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={100}
                fill="#7361a1ff" // purple as default
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with Icons */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-border/50">
          {data.map((item) => {
            const IconComponent = item.icon;
            const percentage = ((item.value / totalHours) * 100).toFixed(1);
            
            return (
              <div key={item.name} className="flex text-purple-900 items-center gap-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <IconComponent className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground text-purple-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.value}m ({percentage}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-border/50 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            {totalHours}m
          </div>
          <div className="text-xs text-muted-foreground">Total Learning Time</div>
        </div>
      </CardContent>
    </Card>
  );
}
