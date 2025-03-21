
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className
}: DashboardCardProps) => {
  const trendStyles = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground"
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    neutral: "→"
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="mt-2 text-xs text-muted-foreground">
            {description}
            {trend && trendValue && (
              <span className={cn("ml-1", trendStyles[trend])}>
                {trendIcons[trend]} {trendValue}
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
