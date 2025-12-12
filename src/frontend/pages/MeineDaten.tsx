import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { User, Home, CreditCard, Gauge, Edit2 } from "lucide-react";

const MeineDaten = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meine Daten</h1>
          <p className="text-muted-foreground mb-4">Installateur: <span className="font-semibold">Andreas Anlagenbau GmbH</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Persönliche Daten */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Persönliche Daten</CardTitle>
                    <CardDescription>Ihre Kontaktinformationen</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Vor- und Nachname</Label>
                <Input id="name" value="Max Mustermann" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" value="max.mustermann@beispiel.de" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon</Label>
                <Input id="telefon" type="tel" value="+49 123 456789" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kundennummer">Kundennummer</Label>
                <Input id="kundennummer" value="KD-2025-001234" readOnly />
              </div>
            </CardContent>
          </Card>

          {/* Adresse */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Adresse</CardTitle>
                    <CardDescription>Ihre Anschrift</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="strasse">Straße und Hausnummer</Label>
                <Input id="strasse" value="Musterstraße 123" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plz">PLZ</Label>
                  <Input id="plz" value="12345" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ort">Ort</Label>
                  <Input id="ort" value="Musterstadt" readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="land">Land</Label>
                <Input id="land" value="Deutschland" readOnly />
              </div>
            </CardContent>
          </Card>

          {/* Zählerdaten */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <Gauge className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Zählerdaten</CardTitle>
                    <CardDescription>Ihre Stromzähler</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Bezugszähler</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zählpunkt:</span>
                    <span className="font-medium">DE001234567890123456789012</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zählernummer:</span>
                    <span className="font-medium">ZN-987654321</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Letzter Stand:</span>
                    <span className="font-medium">45.678 kWh (12.01.2025)</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-3">Einspeisezähler (PV-Anlage)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zählpunkt:</span>
                    <span className="font-medium">DE001234567890123456789013</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zählernummer:</span>
                    <span className="font-medium">ZN-123456789</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Anlagenleistung:</span>
                    <span className="font-medium">8,5 kWp</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bankverbindung */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Bankverbindung</CardTitle>
                    <CardDescription>Für Abrechnungen und Erstattungen</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kontoinhaber">Kontoinhaber</Label>
                <Input id="kontoinhaber" value="Max Mustermann" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input id="iban" value="DE89 3704 0044 0532 0130 00" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bic">BIC</Label>
                <Input id="bic" value="COBADEFFXXX" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank">Bank</Label>
                <Input id="bank" value="Commerzbank" readOnly />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">Änderungen verwerfen</Button>
          <Button>Änderungen speichern</Button>
        </div>
      </div>
    </div>
  );
};

export default MeineDaten;
