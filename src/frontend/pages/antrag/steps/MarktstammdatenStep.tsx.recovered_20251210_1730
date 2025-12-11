import { Button } from "@/frontend/components/ui/button";
import { ExternalLink, Info } from "lucide-react";

export const MarktstammdatenStep = () => {
  return (
    <div className="space-y-6">
      <div className="bg-primary-light rounded-lg p-6 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Info className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold">Registrierung im Marktstammdatenregister erforderlich</h3>
        <p className="text-muted-foreground">
          Gemäß gesetzlicher Vorgabe müssen Sie Ihre Erzeugungsanlage im Marktstammdatenregister der Bundesnetzagentur
          registrieren.
        </p>
      </div>

      <div className="border border-border rounded-lg p-4 space-y-4">
        <h4 className="font-medium">Was ist das Marktstammdatenregister?</h4>
        <p className="text-sm text-muted-foreground">
          Das Marktstammdatenregister (MaStR) ist das Register für den deutschen Strom- und Gasmarkt. Es wird von der
          Bundesnetzagentur geführt und erfasst alle Anlagen zur Stromerzeugung.
        </p>

        <h4 className="font-medium mt-4">Erforderliche Angaben:</h4>
        <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
          <li>Standort der Anlage</li>
          <li>Technische Daten (Leistung, Hersteller, Module)</li>
          <li>Inbetriebnahmedatum</li>
          <li>Netzbetreiber und Zählpunkt</li>
          <li>Betreiberdaten</li>
        </ul>
      </div>

      <div className="bg-status-warning/10 border border-status-warning rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Info className="w-4 h-4" />
          Wichtiger Hinweis
        </h4>
        <p className="text-sm text-muted-foreground">
          Die Registrierung muss innerhalb eines Monats nach Inbetriebnahme erfolgen. Ohne Registrierung entfällt der
          Anspruch auf Einspeisevergütung.
        </p>
      </div>

      <div className="text-center pt-4">
        <Button size="lg" className="gap-2">
          Zum Marktstammdatenregister
          <ExternalLink className="w-4 h-4" />
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Sie werden zur externen Website der Bundesnetzagentur weitergeleitet
        </p>
      </div>
    </div>
  );
};
