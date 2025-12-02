import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

const TRACK_STEPS = [
  "In Antragsstellung",
  "Antrag eingereicht", 
  "Anlage im Bau (Installateur)",
  "Inbetriebnahme",
  "Erste Einspeisevergütung erhalten",
];

export const StatusTimeline = () => {
  const [latestApplication, setLatestApplication] = useState<any>(null);

  useEffect(() => {
    try {
      const submitted = JSON.parse(localStorage.getItem('submittedAntraege') || '[]');
      if (Array.isArray(submitted) && submitted.length > 0) {
        // Nehme den neuesten Antrag (letzter im Array)
        setLatestApplication(submitted[submitted.length - 1]);
      }
    } catch (e) {
      console.error('Error loading applications:', e);
    }
  }, []);

  if (!latestApplication) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Mein aktueller Antrag</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Noch kein Antrag eingereicht.</p>
            <p className="text-sm">Ihr aktueller Antragsstatus wird hier angezeigt.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Gleiche Logik wie auf der Anträge-Seite
  const current = 2; // Eingereichte Anträge sind bei Step 2

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Mein aktueller Antrag</CardTitle>
        <div className="text-sm text-muted-foreground">
          {latestApplication.title} • {latestApplication.id}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center w-full">
            {TRACK_STEPS.map((label, idx) => {
              const step = idx + 1;
              const completed = step <= current;
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
      </CardContent>
    </Card>
  );
};
