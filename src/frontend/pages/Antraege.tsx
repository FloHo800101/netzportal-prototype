import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const applications = [
  {
    id: "ANT-2025-001",
    title: "PV-Anlage 8,5 kWp",
    type: "Erzeugungsanlage",
    date: "12.01.2025",
    status: "In Prüfung",
    statusColor: "warning",
  },
  {
    id: "ANT-2024-287",
    title: "Leistungserhöhung Hausanschluss",
    type: "Leistungsänderung",
    date: "15.12.2024",
    status: "Freigegeben",
    statusColor: "success",
  },
];

const TRACK_STEPS = [
  "In Antragsstellung",
  "Antrag eingereicht",
  "Anlage im Bau (Installateur)",
  "Inbetriebnahme",
  "Erste Einspeisevergütung erhalten",
];

const Antraege = () => {
  const [submitted, setSubmitted] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('submittedAntraege') || '[]');
      if (Array.isArray(raw)) {
        setSubmitted(raw);
      }
    } catch (e) {
      setSubmitted([]);
    }
  }, []);

  const mappedSubmitted = submitted.map((s) => ({
    id: s.id,
    title: `${s.step1?.anlagenart || 'Anlage'} ${s.step1?.gesamtleistung || ''}`.trim(),
    type: 'Erzeugungsanlage',
    date: s.timestamp ? new Date(s.timestamp).toLocaleDateString() : '',
    status: 'Eingereicht',
    statusColor: 'warning',
  }));

  const list = [...mappedSubmitted, ...applications];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Anträge</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Anträge und Anmeldungen</p>
          </div>

          {/* Beide Cards nebeneinander */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Erzeugungsanlagen Sektion */}
            <Card className="border-dashed">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle>Erzeugungsanlagen</CardTitle>
                <CardDescription>Anträge für Photovoltaik- und andere Erzeugungsanlagen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Link to="/antrag/neue-anlage">
                    <Button className="w-full h-auto py-4 flex flex-col gap-2">
                      <Plus className="w-6 h-6" />
                      <span>Neue Erzeugungsanlage anmelden</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 opacity-60 cursor-not-allowed" disabled>
                    <FileText className="w-6 h-6" />
                    <span>Anlagenerweiterung</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 opacity-60 cursor-not-allowed" disabled>
                    <FileText className="w-6 h-6" />
                    <span>Anlagenrückbau</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weitere Antragsarten Sektion */}
            <Card className="border-dashed">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <CardTitle>Weitere Antragsarten</CardTitle>
                <CardDescription>Beantragen Sie Hausanschluss, Leistungsänderung oder Netzanschluss.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    <span>Hausanschluss</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    <span>Leistungsänderung</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    <span>Netzanschluss</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Meine eingereichten Anträge</h2>
            {submitted.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keine eingereichten Anträge vorhanden. Reiche einen Antrag ein, damit er hier erscheint.</p>
            ) : (
              <div className="space-y-4">
                {submitted.map((s) => (
                  <Card key={s.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-1">{s.step1?.anlagenart || 'Anlage'} {s.step1?.gesamtleistung || ''}</CardTitle>
                            <CardDescription>
                              {s.step1?.anlagenart ? 'Erzeugungsanlage' : 'Antrag'} • Antragsnummer: {s.id}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-status-warning/10 text-status-warning border-status-warning">Eingereicht</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        {/* Bubble-Statusverfolgung */}
                        {(() => {
                          // Für alle eingereichten Anträge: current = 2 (beide Bubbles 1 und 2 sollen blau sein)
                          const current = 2;
                          return (
                            <div className="w-full">
                              <div className="flex items-center w-full">
                                {TRACK_STEPS.map((label, idx) => {
                                  const step = idx + 1;
                                  const completed = step <= current; // Both step 1 AND 2 are completed for eingereicht
                                  const darkBlue = "#0b3d91";
                                  const lightGray = "#f1f5f9";
                                  const darkGray = "#64748b";
                                  const connectorDone = "#16a34a"; // green
                                  const connectorPending = "#cbd5e1"; // gray

                                  return (
                                    <div key={label} className="flex items-center flex-1">
                                      <div className="flex flex-col items-center w-40 sm:w-auto">
                                        <div className="text-center text-xs sm:text-sm mb-2" style={{ 
                                          color: completed ? darkBlue : darkGray 
                                        }}>{label}</div>
                                        <div
                                          className="w-10 h-10 rounded-full flex items-center justify-center"
                                          style={{
                                            backgroundColor: completed ? darkBlue : lightGray,
                                            color: completed ? '#fff' : darkGray,
                                          }}
                                        >
                                          <span className="text-sm font-semibold">{step}</span>
                                        </div>
                                      </div>

                                      {step < TRACK_STEPS.length && (
                                        <div className="flex-1 px-3">
                                          <div
                                            className="h-1 w-full rounded"
                                            style={{
                                              backgroundColor: step <= current - 1 ? connectorDone : connectorPending,
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Eingereicht am {s.timestamp ? new Date(s.timestamp).toLocaleString() : ''}</span>
                        <div className="flex gap-2">
                          <Link to={`/antraege/${s.id}`}>
                            <Button variant="outline" size="sm">Details ansehen</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Weitere Anträge</h2>
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">{application.title}</CardTitle>
                          <CardDescription>
                            {application.type} • Antragsnummer: {application.id}
                          </CardDescription>
                        </div>
                      </div>
                  <Badge
                    variant={
                      application.statusColor === "success"
                        ? "default"
                        : application.statusColor === "warning"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      application.statusColor === "warning"
                        ? "bg-status-warning/10 text-status-warning border-status-warning"
                        : application.statusColor === "success"
                        ? "bg-status-success/10 text-status-success border-status-success"
                        : ""
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Eingereicht am {application.date}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Details ansehen
                    </Button>
                    <Button variant="outline" size="sm">
                      Status verfolgen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Antraege;
