import { Check, MapPin, Zap, Settings } from "lucide-react";

export const FreigabeStep = () => {
  return (
    <div className="space-y-6">
      <div className="bg-status-success/10 border border-status-success rounded-lg p-6 text-center space-y-3">
        <div className="mx-auto w-16 h-16 bg-status-success rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-status-success">Netzanschlussbegehren genehmigt</h3>
        <p className="text-muted-foreground">
          Ihr Antrag wurde erfolgreich geprüft und genehmigt. Die Inbetriebnahme kann vorbereitet werden.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border border-border rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h4 className="font-medium">Ihr Anschlusspunkt</h4>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Trafostation Musterstraße 15, 12345 Musterstadt</p>
        </div>

        <div className="border border-border rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <h4 className="font-medium">Technische Eckdaten</h4>
          </div>
          <div className="ml-7 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nennleistung:</span>
              <span className="font-medium">8,5 kWp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Einspeiseart:</span>
              <span className="font-medium">Überschusseinspeisung</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Netzanschluss:</span>
              <span className="font-medium">Niederspannung (400V)</span>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h4 className="font-medium">Messkonzept</h4>
          </div>
          <p className="text-sm text-muted-foreground ml-7">
            Zweirichtungszähler mit separater Erfassung von Bezug und Einspeisung
          </p>
        </div>
      </div>

      <div className="bg-primary-light rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-sm">Nächste Schritte</h4>
        <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
          <li>Koordination des Inbetriebnahmetermins mit Ihrem Installateur</li>
          <li>Installation und Anschluss der Anlage durch den Installateur</li>
          <li>Inbetriebnahme und Abnahme durch den Netzbetreiber</li>
        </ul>
      </div>
    </div>
  );
};
