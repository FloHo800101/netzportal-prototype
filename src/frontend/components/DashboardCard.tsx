import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  iconColor?: string;
}

export const DashboardCard = ({ title, description, icon: Icon, to, iconColor = "text-primary" }: DashboardCardProps) => {
  return (
    <Link to={to} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border hover:border-primary">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-3">
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
