import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Zap, Calendar, Download, Home, Thermometer, Sun, Calculator, Database, UserCheck, Receipt, TrendingUp, Headphones } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";

const anschluesse = [
  {
    id: 1,
    typ: "Hausanschluss",
    icon: Home,
    zaehlerNummer: "1234567890",
    anschlussnummer: "HA-2024-001",
    adresse: "Musterstraße 123, 12345 Musterstadt",
    leistung: "35 kW",
    netzebene: "Niederspannung",
    inbetriebnahme: "15.03.2020",
    status: "Aktiv",
    vertraege: [
      {
        vertragsNummer: "V-HA-2024-001",
        typ: "Netzanschlussvertrag",
        beginn: "15.03.2020",
        ende: "unbefristet",
        dokument: "netzanschlussvertrag_hausanschluss.pdf"
      }
    ]
  },
  {
    id: 2,
    typ: "Wärmepumpe",
    icon: Thermometer,
    zaehlerNummer: "9876543210",
    anschlussnummer: "WP-2024-042",
    adresse: "Musterstraße 123, 12345 Musterstadt",
    leistung: "12 kW",
    netzebene: "Niederspannung",
    inbetriebnahme: "10.08.2023",
    status: "Aktiv",
    vertraege: [
      {
        vertragsNummer: "V-WP-2024-042",
        typ: "Netzanschlussvertrag Wärmepumpe",
        beginn: "10.08.2023",
        ende: "unbefristet",
        dokument: "netzanschlussvertrag_waermepumpe.pdf"
      },
      {
        vertragsNummer: "V-WP-TARIF-2024",
        typ: "Sondertarif Wärmepumpe",
        beginn: "10.08.2023",
        ende: "31.12.2025",
        dokument: "sondertarif_waermepumpe.pdf"
      }
    ]
  },
  {
    id: 3,
    typ: "PV-Anlage",
    icon: Sun,
    zaehlerNummer: "5555666677",
    anschlussnummer: "PV-2024-089",
    adresse: "Musterstraße 123, 12345 Musterstadt",
    leistung: "9.8 kWp",
    netzebene: "Niederspannung",
    inbetriebnahme: "22.04.2024",
    status: "Aktiv",
    vertraege: [
      {
        vertragsNummer: "V-PV-2024-089",
        typ: "Netzanschlussvertrag PV-Anlage",
        beginn: "22.04.2024",
        ende: "unbefristet",
        dokument: "netzanschlussvertrag_pv.pdf"
      },
      {
        vertragsNummer: "V-PV-EEG-2024",
        typ: "EEG-Einspeisevertrag",
        beginn: "22.04.2024",
        ende: "21.04.2044",
        dokument: "eeg_einspeisevertrag.pdf"
      }
    ]
  }
];

const serviceAnfragen = [
  { value: "steuerliche-behandlung", label: "Steuerliche Behandlung" },
  { value: "mastr-registrierung", label: "MaStR Registrierung" },
  { value: "betreiberwechsel", label: "Betreiberwechsel" },
  { value: "rechnungskorrektur", label: "Rechnungskorrektur" },
  { value: "direktvermarktung", label: "Direktvermarktung" }
];

const MeineAnschluesse = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnschluss, setSelectedAnschluss] = useState("");
  const [selectedServiceArt, setSelectedServiceArt] = useState("");
  const [beschreibung, setBeschreibung] = useState("");

  const handleSubmit = () => {
    // Hier würde die Serviceanfrage abgeschickt werden
    console.log({
      anschluss: selectedAnschluss,
      serviceArt: selectedServiceArt,
      beschreibung: beschreibung
    });
    setIsDialogOpen(false);
    setSelectedAnschluss("");
    setSelectedServiceArt("");
    setBeschreibung("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meine Anschlüsse & Verträge</h1>
            <p className="text-muted-foreground">Übersicht über Ihre Netzanschlüsse und Vertragsdetails</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Headphones className="w-4 h-4" />
                Serviceanfrage stellen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Serviceanfrage stellen</DialogTitle>
                <DialogDescription>
                  Stellen Sie eine Serviceanfrage zu einem Ihrer Anschlüsse oder Verträge
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="anschluss">Anschluss / Zählernummer</Label>
                  <Select value={selectedAnschluss} onValueChange={setSelectedAnschluss}>
                    <SelectTrigger id="anschluss">
                      <SelectValue placeholder="Anschluss auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {anschluesse.map((anschluss) => (
                        <SelectItem key={anschluss.id} value={anschluss.zaehlerNummer}>
                          {anschluss.typ} - {anschluss.zaehlerNummer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceart">Art der Serviceanfrage</Label>
                  <Select value={selectedServiceArt} onValueChange={setSelectedServiceArt}>
                    <SelectTrigger id="serviceart">
                      <SelectValue placeholder="Serviceart auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceAnfragen.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beschreibung">Beschreibung / Anliegen</Label>
                  <Textarea
                    id="beschreibung"
                    placeholder="Beschreiben Sie hier Ihr Anliegen..."
                    value={beschreibung}
                    onChange={(e) => setBeschreibung(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button onClick={handleSubmit} disabled={!selectedAnschluss || !selectedServiceArt || !beschreibung}>
                  Anfrage absenden
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {anschluesse.map((anschluss) => {
            const Icon = anschluss.icon;
            return (
              <Card key={anschluss.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{anschluss.typ}</CardTitle>
                        <CardDescription>Anschlussnummer: {anschluss.anschlussnummer}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={anschluss.status === "Aktiv" ? "default" : "secondary"}>
                      {anschluss.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Anschlussdaten */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Anschlussdaten
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Zählernummer</p>
                        <p className="font-medium">{anschluss.zaehlerNummer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Anschlussleistung</p>
                        <p className="font-medium">{anschluss.leistung}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Adresse</p>
                        <p className="font-medium">{anschluss.adresse}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Netzebene</p>
                        <p className="font-medium">{anschluss.netzebene}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Inbetriebnahme</p>
                        <p className="font-medium">{anschluss.inbetriebnahme}</p>
                      </div>
                    </div>
                  </div>

                  {/* Verträge */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Zugehörige Verträge ({anschluss.vertraege.length})
                    </h3>
                    <div className="space-y-3">
                      {anschluss.vertraege.map((vertrag, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{vertrag.typ}</p>
                              <Badge variant="outline" className="text-xs">
                                {vertrag.vertragsNummer}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Laufzeit: {vertrag.beginn} - {vertrag.ende}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            PDF
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MeineAnschluesse;