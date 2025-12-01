import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { Calendar, Check, Wrench, Power } from "lucide-react";

export const InbetriebnahmeStep = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Wählen Sie einen Wunschtermin für die Inbetriebnahme Ihrer PV-Anlage. Ihr Installateur wird den Termin
        bestätigen.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="termin-datum">Wunschtermin</Label>
          <Input id="termin-datum" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="termin-uhrzeit">Bevorzugte Uhrzeit</Label>
          <Input id="termin-uhrzeit" type="time" />
        </div>
      </div>

      <div className="border border-border rounded-lg p-4 space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Ablauf der Inbetriebnahme
        </h4>

        <div className="space-y-4 ml-7">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
              <Wrench className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">1. Zählerwechsel</p>
              <p className="text-sm text-muted-foreground">Installation des neuen Zweirichtungszählers</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">2. Inbetriebnahme</p>
              <p className="text-sm text-muted-foreground">Technische Prüfung und Freischaltung der Anlage</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
              <Power className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">3. Start der Einspeisung</p>
              <p className="text-sm text-muted-foreground">Ihre Anlage speist ab sofort ins Netz ein</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-sm">Wichtiger Hinweis</h4>
        <p className="text-sm text-muted-foreground">
          Die Inbetriebnahme erfolgt in Abstimmung mit Ihrem Installateur. Nach erfolgreicher Inbetriebnahme erhalten
          Sie eine Bestätigung und können mit der Einspeisung beginnen.
        </p>
      </div>
    </div>
  );
};
