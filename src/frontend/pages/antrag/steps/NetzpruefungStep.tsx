import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { Label } from "@/frontend/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/frontend/components/ui/radio-group";

export const NetzpruefungStep = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
      setCheckComplete(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {isChecking ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <p className="text-lg font-medium">Netzverträglichkeitsprüfung wird durchgeführt...</p>
          <p className="text-sm text-muted-foreground">Dies kann einen Moment dauern</p>
        </div>
      ) : (
        <>
          <div className="bg-status-success/10 border border-status-success rounded-lg p-6 text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-status-success rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-status-success">Ergebnis: Anschluss grundsätzlich möglich</h3>
            <p className="text-muted-foreground">
              Ihre PV-Anlage kann an das Verteilnetz angeschlossen werden.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Auswahl des Messkonzepts</h4>
            <p className="text-sm text-muted-foreground">
              Bitte wählen Sie das passende Messkonzept für Ihre Anlage:
            </p>

            <RadioGroup defaultValue="ueberschuss">
              <div className="flex items-start space-x-3 rounded-lg border border-border p-4 hover:border-primary transition-colors">
                <RadioGroupItem value="volleinspeisung" id="volleinspeisung" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="volleinspeisung" className="font-medium cursor-pointer">
                    Volleinspeisung
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Die gesamte erzeugte Energie wird ins Netz eingespeist. Höhere Vergütung, aber kein
                    Eigenverbrauch.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-lg border border-border p-4 hover:border-primary transition-colors">
                <RadioGroupItem value="ueberschuss" id="ueberschuss" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="ueberschuss" className="font-medium cursor-pointer">
                    Überschusseinspeisung (Eigenverbrauch)
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Selbst erzeugter Strom wird vorrangig selbst verbraucht. Überschuss wird ins Netz
                    eingespeist.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-lg border border-border p-4 hover:border-primary transition-colors">
                <RadioGroupItem value="speicher" id="speicher" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="speicher" className="font-medium cursor-pointer">
                    Mit Batteriespeicher
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Zusätzliche Speicherung überschüssiger Energie für späteren Eigenverbrauch. Maximale
                    Unabhängigkeit.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Hinweis</h4>
            <p className="text-sm text-muted-foreground">
              Die Details des Messkonzepts werden durch den Netzbetreiber und Ihren Installateur final geprüft und
              abgestimmt.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
