import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, TrendingUp } from "lucide-react";

const messages = [
  {
    id: 1,
    title: "Erhöhter Energieverbrauch",
    description: "Ihr Energieverbrauch ist in den letzten 7 Tagen um 15% gestiegen.",
    date: "15.01.2025",
    type: "warning",
    icon: TrendingUp,
    details: "Wir haben festgestellt, dass Ihr Energieverbrauch in der letzten Woche deutlich über dem Durchschnitt liegt. Durchschnittlicher Verbrauch: 12 kWh/Tag. Aktueller Verbrauch: 14 kWh/Tag. Bitte prüfen Sie Ihre Geräte auf ungewöhnliche Aktivitäten.",
  },
  {
    id: 2,
    title: "Terminvorschlag von Installateur",
    description: "Ihr Installateur hat einen neuen Termin für die Inbetriebnahme vorgeschlagen.",
    date: "14.01.2025",
    type: "info",
    icon: Calendar,
    details: "Installateur Müller GmbH schlägt folgenden Termin vor: Montag, 22.01.2025 um 10:00 Uhr. Bitte bestätigen Sie den Termin im Bereich 'Termine' oder schlagen Sie einen alternativen Termin vor.",
  },
  {
    id: 3,
    title: "Wichtige Information zur Netzprüfung",
    description: "Die Netzverträglichkeitsprüfung für Ihre PV-Anlage wurde erfolgreich abgeschlossen.",
    date: "12.01.2025",
    type: "success",
    icon: AlertCircle,
    details: "Die technische Prüfung Ihres Netzanschlussbegehren wurde erfolgreich durchgeführt. Ihr Anschlusspunkt wurde identifiziert: Trafostation Musterstraße 15. Die erforderliche Netzverträglichkeit ist gegeben. Der nächste Schritt ist die Auswahl des Messkonzepts.",
  },
];

const Nachrichten = () => {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nachrichten</h1>
          <p className="text-muted-foreground">Alle wichtigen Mitteilungen auf einen Blick</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {messages.map((message) => {
              const Icon = message.icon;
              return (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage.id === message.id ? "border-primary shadow-sm" : ""
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          message.type === "warning"
                            ? "bg-status-warning/10"
                            : message.type === "success"
                            ? "bg-status-success/10"
                            : "bg-status-info/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            message.type === "warning"
                              ? "text-status-warning"
                              : message.type === "success"
                              ? "text-status-success"
                              : "text-status-info"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm mb-1">{message.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedMessage.type === "warning"
                          ? "bg-status-warning/10"
                          : selectedMessage.type === "success"
                          ? "bg-status-success/10"
                          : "bg-status-info/10"
                      }`}
                    >
                      <selectedMessage.icon
                        className={`w-6 h-6 ${
                          selectedMessage.type === "warning"
                            ? "text-status-warning"
                            : selectedMessage.type === "success"
                            ? "text-status-success"
                            : "text-status-info"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{selectedMessage.title}</CardTitle>
                      <CardDescription>{selectedMessage.description}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      selectedMessage.type === "warning"
                        ? "destructive"
                        : selectedMessage.type === "success"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedMessage.date}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{selectedMessage.details}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nachrichten;
