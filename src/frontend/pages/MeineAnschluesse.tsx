import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Zap, Calendar, Download } from "lucide-react";

const MeineAnschluesse = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meine Anschlüsse & Verträge</h1>
          <p className="text-muted-foreground">Übersicht über Ihre Netzanschlüsse und Vertragsdetails</p>
        </div>

        <div className="space-y-6">
          {/* Platzhalter für zukünftige Inhalte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Netzanschlüsse
              </CardTitle>
              <CardDescription>
                Ihre aktiven und geplanten Netzanschlüsse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Noch keine Anschlüsse vorhanden.</p>
                <p className="text-sm">Ihre Netzanschlüsse werden hier angezeigt, sobald sie verfügbar sind.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Verträge & Dokumente
              </CardTitle>
              <CardDescription>
                Ihre Vertragsunterlagen und wichtigen Dokumente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Keine Verträge verfügbar.</p>
                <p className="text-sm">Ihre Vertragsdetails und Dokumente werden hier angezeigt.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeineAnschluesse;