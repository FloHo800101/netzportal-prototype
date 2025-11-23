import { DashboardCard } from "@/components/DashboardCard";
import { StatusTimeline } from "@/components/StatusTimeline";
import { NotificationsPreview } from "@/components/NotificationsPreview";
import { ChatBot } from "@/components/ChatBot";
import { useAuth } from "@/contexts/AuthContext";
import { Gauge, Bell, Calendar, TrendingUp, FileText } from "lucide-react";

const Dashboard = () => {
  const { role } = useAuth();
  
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
    switch (role) {
      case "kunde":
        return {
          title: "Willkommen in Ihrem Energieportal, Frau Müller",
          subtitle: "Verwalten Sie Ihre Anschlüsse und Anträge",
        };
      case "installateur":
        return {
          title: "Willkommen zurück, Herr Schmidt",
          subtitle: "Übersicht Ihrer Installationsprojekte",
        };
      case "kundenbetreuer":
        return {
          title: "Willkommen zurück, Herr Weber",
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

        <div className="mb-8">
          <StatusTimeline />
        </div>

        <div className="mb-8">
          <NotificationsPreview />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        <ChatBot />
      </div>
    </div>
  );
};

export default Dashboard;
