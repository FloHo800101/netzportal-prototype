import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const MeineKundendaten = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Meine Kundendaten</h1>
        <Card>
          <CardHeader>
            <CardTitle>Persönliche Daten</CardTitle>
            <CardDescription>Ihre Kontaktinformationen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vor- und Nachname</Label>
              <Input id="name" value="Peter Meier" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" type="email" value="peter.meier@beispiel.de" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefon">Telefon</Label>
              <Input id="telefon" type="tel" value="+49 30 123456" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kundennummer">Kundennummer</Label>
              <Input id="kundennummer" value="KD-2025-009876" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strasse">Straße und Hausnummer</Label>
              <Input id="strasse" value="Hauptstraße 26" readOnly />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plz">PLZ</Label>
                <Input id="plz" value="12345" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ort">Ort</Label>
                <Input id="ort" value="Berlin" readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="land">Land</Label>
              <Input id="land" value="Deutschland" readOnly />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeineKundendaten;
