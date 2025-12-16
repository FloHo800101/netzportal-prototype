import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const projekte = [
  {
    name: "Familie Müller",
    beschreibung: "PV-Anlage 9,8 kWp",
    status: { text: "Inbetriebnahme geplant", color: "text-green-700" },
    termin: "Nächster Termin: 18.12.2025 (Zählermontage)"
  },
  {
    name: "Max Mustermann",
    beschreibung: "Wärmepumpe 14 kW",
    status: { text: "Antrag in Prüfung", color: "text-yellow-700" },
    termin: "Nächster Termin: 10.01.2026 (Netzanschlussbegehung)"
  },
  {
    name: "Sabine Solar",
    beschreibung: "PV-Anlage 5,2 kWp",
    status: { text: "Abgeschlossen", color: "text-blue-700" },
    termin: "Letzter Termin: 02.12.2025 (Fertigmeldung)"
  }
];

const MeineProjekte = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Meine Projekte</h1>
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
    </div>
  );
};

export default MeineProjekte;
