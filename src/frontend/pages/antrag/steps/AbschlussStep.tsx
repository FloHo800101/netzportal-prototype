import { Button } from "@/components/ui/button";
import { Check, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const AbschlussStep = () => {
  return (
    <div className="space-y-6">
      <div className="bg-status-success/10 border border-status-success rounded-lg p-6 text-center space-y-3">
        <div className="mx-auto w-16 h-16 bg-status-success rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-status-success">Herzlichen Glückwunsch!</h3>
        <p className="text-muted-foreground">
          Ihre PV-Anlage ist erfolgreich angemeldet und bereit für die Inbetriebnahme.
        </p>
      </div>

      <div className="border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium mb-2">Begrüßungsmail</h4>
            <div className="bg-muted rounded-lg p-4 text-sm space-y-3">
              <p className="font-medium">Betreff: Herzlich willkommen als Einspeiser!</p>
              <p className="text-muted-foreground">Sehr geehrte Kundin, sehr geehrter Kunde,</p>
              <p className="text-muted-foreground">
                wir freuen uns, Sie als Betreiber einer Erzeugungsanlage in unserem Netz begrüßen zu dürfen. Ihre
                PV-Anlage mit 8,5 kWp wurde erfolgreich registriert.
              </p>
              <p className="text-muted-foreground">
                Nach erfolgreicher Inbetriebnahme beginnt die Einspeisung automatisch. Ihre erste Abrechnung erhalten
                Sie voraussichtlich am 15.03.2025.
              </p>
              <p className="text-muted-foreground">
                Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.
                <br />
                Mit freundlichen Grüßen
                <br />
                Ihr Netzbetreiber-Team
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h4 className="font-medium">Erste Abrechnung</h4>
        </div>
        <p className="text-sm text-muted-foreground ml-7">
          Ihre erste Abrechnung wird voraussichtlich am <strong>15.03.2025</strong> erstellt und berücksichtigt alle
          Einspeisungen seit Inbetriebnahme.
        </p>
      </div>

      <div className="bg-primary-light rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-sm">Nächste Schritte</h4>
        <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
          <li>Dokumentation der Anlagendaten sicher aufbewahren</li>
          <li>Versicherung für die PV-Anlage prüfen</li>
          <li>Regelmäßige Wartung mit Ihrem Installateur vereinbaren</li>
          <li>Verbrauchsdaten im Portal verfolgen</li>
        </ul>
      </div>

      <div className="flex gap-3 pt-4">
        <Link to="/" className="flex-1">
          <Button variant="outline" className="w-full">
            Zum Dashboard
          </Button>
        </Link>
        <Link to="/antraege" className="flex-1">
          <Button className="w-full">Antrag im Überblick</Button>
        </Link>
      </div>
    </div>
  );
};
