import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Circle } from "lucide-react";

const steps = [
  { label: "Antrag eingereicht", status: "completed" },
  { label: "Netzprüfung", status: "completed" },
  { label: "Messkonzept", status: "active" },
  { label: "Freigabe", status: "pending" },
  { label: "Inbetriebnahme", status: "pending" },
  { label: "Marktstammdatenregister", status: "pending" },
  { label: "Erste Abrechnung", status: "pending" },
];

export const StatusTimeline = () => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Mein aktueller Antrag</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2 min-w-fit">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-status-success text-white"
                      : step.status === "active"
                      ? "bg-status-pending text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.status === "completed" ? <Check className="w-4 h-4" /> : <Circle className="w-3 h-3 fill-current" />}
                </div>
                <span className="text-xs text-muted-foreground text-center max-w-[80px]">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 ${
                    step.status === "completed" ? "bg-status-success" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
