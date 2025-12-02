import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AlertCircle, Calendar, TrendingUp, Zap } from "lucide-react";

const defaultMessages = [
  {
    id: 1,
    title: "Geplante Netzwartung in Ihrem Gebiet",
    description: "Kurzzeitige Stromunterbrechung am 25.01.2025 zwischen 09:00-12:00 Uhr",
    date: "02.12.2025",
    time: "14:30",
    type: "warning",
    icon: Zap,
    read: false,
    priority: "hoch",
    category: "Wartung",
    sender: "Netzbetreiber Regional",
  },
  {
    id: 2,
    title: "Terminvorschlag für Inbetriebnahme",
    description: "Installateur möchte einen Termin vereinbaren",
    date: "01.12.2025",
    time: "16:45",
    type: "info",
    icon: Calendar,
    read: false,
    priority: "mittel",
    category: "Installateur",
    sender: "Müller GmbH",
  }
];

const Nachrichten = () => {
  const [messages] = useState(defaultMessages);
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <div className="flex h-screen bg-background">
      {/* Seitenleiste mit Nachrichten-Liste */}
      <div className="w-1/3 border-r bg-card">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Nachrichten</h1>
          <p className="text-muted-foreground">Ihre Kommunikation im Überblick</p>
        </div>
        
        <div className="p-4 space-y-2">
          {messages.map((message) => (
            <Card 
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-accent ${
                selectedMessage?.id === message.id ? 'bg-accent' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <message.icon className="h-4 w-4" />
                    <Badge variant={message.type === 'warning' ? 'destructive' : 'default'}>
                      {message.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {message.date} {message.time}
                  </div>
                </div>
                <CardTitle className="text-base">{message.title}</CardTitle>
                <CardDescription>{message.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Hauptbereich mit Nachrichtendetails */}
      <div className="flex-1 p-6">
        {selectedMessage && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedMessage.title}</h2>
                <p className="text-muted-foreground">Von: {selectedMessage.sender}</p>
              </div>
              <Badge variant={selectedMessage.type === 'warning' ? 'destructive' : 'default'}>
                {selectedMessage.priority}
              </Badge>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <p className="whitespace-pre-line">{selectedMessage.description}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nachrichten;