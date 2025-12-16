import { DashboardCard } from "../components/DashboardCard";
import { StatusTimeline } from "../components/StatusTimeline";
import { NotificationsPreview } from "../components/NotificationsPreview";
import { ChatBot } from "../components/ChatBot";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Gauge, Bell, Calendar, TrendingUp, FileText, Newspaper, Video, Image, Link2 } from "lucide-react";
import { projekte } from "./MeineProjekte";

const Dashboard = () => {
  const { activeRole, user } = useAuth();
  
  const cards = [
    {
      title: "Zählerstandsablesung & Meldung",
      description: "Zählerstand einfach online übermitteln.",
      icon: Gauge,
      to: "/zaehlerstand",
    },
    {
      title: "Benachrichtigungen / Nachrichten",
      description: "Nachrichten vom Netzbetreiber, Installateur und Systemhinweise (z. B. erhöhter Verbrauch).",
      icon: Bell,
      to: "/nachrichten",
    },
    {
      title: "Termine / Terminfindung",
      description: "Termine für Inbetriebnahmen, Zählerwechsel, Vor-Ort-Prüfungen.",
      icon: Calendar,
      to: "/termine",
    },
    {
      title: "Energieverbrauchs-Dashboard",
      description: "Verbrauchsverlauf, Einspeisung, ggf. Kostenschätzung.",
      icon: TrendingUp,
      to: "/verbrauch",
    },
    {
      title: "Anträge",
      description: "PV-Anmeldung, Leistungsänderungen, Hausanschluss, etc.",
      icon: FileText,
      to: "/antraege",
    },
  ];

  const getGreeting = () => {
    const firstName = user?.user_metadata?.first_name || "";
    const lastName = user?.user_metadata?.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    
    switch (activeRole) {
      case "kunde":
        return {
          title: `Willkommen in Ihrem Energieportal${fullName ? `, ${fullName}` : ""}`,
          subtitle: "Verwalten Sie Ihre Anschlüsse und Anträge",
        };
      case "installateur":
        return {
          title: `Willkommen zurück${fullName ? `, ${fullName}` : ""}`,
          subtitle: "Übersicht Ihrer Installationsprojekte",
        };
      case "kundenbetreuer":
        return {
          title: `Willkommen zurück${fullName ? `, ${fullName}` : ""}`,
          subtitle: "Kundenbetreuung und Verwaltung",
        };
      default:
        return {
          title: "Willkommen im Netzportal",
          subtitle: "Ihr Self-Service-Portal",
        };
    }
  };

  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{greeting.title}</h1>
          <p className="text-muted-foreground">{greeting.subtitle}</p>
        </div>

        {activeRole === "kunde" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Links: Benachrichtigungen */}
              <div className="flex">
                <NotificationsPreview />
              </div>

              {/* Rechts: News */}
              <div className="flex">
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Newspaper className="h-5 w-5" />
                      <CardTitle>Neuigkeiten</CardTitle>
                    </div>
                    <CardDescription>Aktuelle Informationen vom Netzbetreiber</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium line-clamp-2">
                              Neue Förderprogramme für PV-Anlagen
                            </h4>
                            <span className="text-xs text-muted-foreground shrink-0">Vor 2 Tagen</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Ab sofort stehen erweiterte Fördermöglichkeiten zur Verfügung.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <Image className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium line-clamp-2">
                              Wartungsarbeiten am 15. Dezember
                            </h4>
                            <span className="text-xs text-muted-foreground shrink-0">Vor 5 Tagen</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Geplante Arbeiten am Stromnetz in Ihrer Region.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                          <Link2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium line-clamp-2">
                              Optimierung der Antragsbearbeitung
                            </h4>
                            <span className="text-xs text-muted-foreground shrink-0">Vor 1 Woche</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Anträge werden nun 30% schneller bearbeitet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Aktueller Antrag */}
            <div className="mb-8">
              <StatusTimeline />
            </div>
          </>
        )}

        {activeRole === "installateur" && (
          <div className="mb-8 p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Ihre Installationsprojekte</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projekte.map((projekt) => (
                <Card key={projekt.name}>
                  <CardHeader>
                    <CardTitle>{projekt.name}</CardTitle>
                    <CardDescription>{projekt.beschreibung}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm mb-2">Status: <span className={`font-semibold ${projekt.status.color}`}>{projekt.status.text}</span></div>
                    <div className="text-xs text-muted-foreground">{projekt.termin}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeRole === "kundenbetreuer" && (
          <div className="mb-8 p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Kundensuche</h2>
            <div className="grid gap-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Kundennummer</label>
                  <input 
                    type="text" 
                    placeholder="z.B. K-12345" 
                    className="w-full px-3 py-2 rounded-md border bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Straße und Ort</label>
                  <input 
                    type="text" 
                    placeholder="z.B. Mustergasse, Musterstadt" 
                    className="w-full px-3 py-2 rounded-md border bg-background"
                  />
                </div>
              </div>
              <Button className="w-full md:w-auto">Suchen</Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Letzte Kunden:</p>
              <div className="p-3 bg-muted/50 rounded hover:bg-muted cursor-pointer transition-colors">
                <p className="font-medium">Anna Müller - K-10001</p>
                <p className="text-sm text-muted-foreground">Mustergasse 123, 12345 Musterstadt</p>
              </div>
              <div className="p-3 bg-muted/50 rounded hover:bg-muted cursor-pointer transition-colors">
                <p className="font-medium">Max Mustermann - K-10002</p>
                <p className="text-sm text-muted-foreground">Beispielweg 45, 54321 Beispielstadt</p>
              </div>
            </div>
          </div>
        )}

        <ChatBot />
      </div>
    </div>
  );
};

export default Dashboard;
