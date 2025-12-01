import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const recentNotifications = [
  {
    id: 1,
    subject: "Erhöhter Energieverbrauch",
    sender: "Netzportal System",
    date: "15.01.2025",
    type: "warning",
    icon: TrendingUp,
  },
  {
    id: 2,
    subject: "Terminvorschlag von Installateur",
    sender: "Installateur Müller GmbH",
    date: "14.01.2025",
    type: "info",
    icon: Calendar,
  },
  {
    id: 3,
    subject: "Netzprüfung erfolgreich",
    sender: "Netzbetreiber",
    date: "12.01.2025",
    type: "success",
    icon: AlertCircle,
  },
];

export const NotificationsPreview = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Aktuelle Benachrichtigungen
          </CardTitle>
          <Link to="/nachrichten">
            <Button variant="ghost" size="sm">
              Alle anzeigen
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notification.type === "warning"
                    ? "bg-status-warning/10"
                    : notification.type === "success"
                    ? "bg-status-success/10"
                    : "bg-status-info/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    notification.type === "warning"
                      ? "text-status-warning"
                      : notification.type === "success"
                      ? "text-status-success"
                      : "text-status-info"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground line-clamp-1">
                    {notification.subject}
                  </h4>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {notification.date}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{notification.sender}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
