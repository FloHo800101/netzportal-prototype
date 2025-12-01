import { DashboardCard } from "@/frontend/components/DashboardCard";
import { StatusTimeline } from "@/frontend/components/StatusTimeline";
import { NotificationsPreview } from "@/frontend/components/NotificationsPreview";
import { ChatBot } from "@/frontend/components/ChatBot";
import { useAuth } from "@/frontend/contexts/AuthContext";
import { Button } from "@/frontend/components/ui/button";
import { Gauge, Bell, Calendar, TrendingUp, FileText } from "lucide-react";

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
            <div className="mb-8">
              <StatusTimeline />
            </div>

            <div className="mb-8">
              <NotificationsPreview />
            </div>
          </>
        )}

        {activeRole === "installateur" && (
          <div className="mb-8 p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Ihre Installationsprojekte</h2>
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Kunde: Anna Müller</p>
                    <p className="text-sm text-muted-foreground">Mustergasse 123, 12345 Musterstadt</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs rounded">In Bearbeitung</span>
                </div>
                <p className="text-sm">PV-Anlage 10 kWp</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Kunde: Max Mustermann</p>
                    <p className="text-sm text-muted-foreground">Beispielweg 45, 54321 Beispielstadt</p>
                  </div>
                  <span className="px-2 py-1 bg-green-500/10 text-green-700 dark:text-green-400 text-xs rounded">Genehmigt</span>
                </div>
                <p className="text-sm">PV-Anlage 8 kWp</p>
              </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards
            .filter(card => {
              // Kundenbetreuer sehen alle Karten
              if (activeRole === "kundenbetreuer") return true;
              // Installateur sieht nur relevante Bereiche
              if (activeRole === "installateur") {
                return ["Anträge", "Termine", "Benachrichtigungen / Nachrichten", "Meine Daten"].includes(card.title);
              }
              // Kunde sieht alle Karten
              return true;
            })
            .map((card, index) => (
              <DashboardCard key={index} {...card} />
            ))}
        </div>

        <ChatBot />
      </div>
    </div>
  );
};

export default Dashboard;
