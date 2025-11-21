import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Upload } from "lucide-react";

const Zaehlerstand = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-status-success">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-status-success/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-status-success" />
            </div>
            <CardTitle className="text-2xl">Zählerstand erfolgreich übermittelt</CardTitle>
            <CardDescription>Ihre Referenznummer: ZS-2025-001234</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Ihr Zählerstand wurde erfolgreich gespeichert und wird in Ihrer nächsten Abrechnung berücksichtigt.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Weitere Ablesung erfassen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Zählerstand übermitteln</h1>
            <p className="text-muted-foreground">Geben Sie Ihren aktuellen Zählerstand ein</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Zählerstandsablesung</CardTitle>
              <CardDescription>Bitte füllen Sie alle Felder aus</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="zaehlpunkt">Zählpunkt</Label>
                  <Input id="zaehlpunkt" placeholder="DE0001234567890123456789012" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zaehlernummer">Zählernummer</Label>
                  <Input id="zaehlernummer" placeholder="12345678" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zaehlerstand">Aktueller Zählerstand (kWh)</Label>
                  <Input id="zaehlerstand" type="number" placeholder="12345" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="datum">Ablesedatum</Label>
                  <Input id="datum" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foto">Foto hochladen (optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Klicken Sie hier oder ziehen Sie ein Foto hinein</p>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Zählerstand übermitteln
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Zaehlerstand;
