import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Zap, Calendar, Download, Home, Thermometer, Sun, Calculator, Database, UserCheck, Receipt, TrendingUp, Headphones, Check, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { useState } from "react";

const MeineAnschluesse = () => {
        // Handler für das Absenden der Serviceanfrage
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Hier könnte ein API-Call erfolgen
          setIsDialogOpen(false);
          setSelectedAnschluss("");
          setSelectedServiceArt("");
          setBeschreibung("");
          // Optional: Feedback/Toast anzeigen
        };
      // Handler für das Absenden des Zählerstand-Dialogs
      const handleZaehlerstandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hier könnte ein API-Call erfolgen
        setZaehlerstandSubmitted(true);
      };
    // State für Dialoge und Formulare
    const [isZaehlerstandDialogOpen, setIsZaehlerstandDialogOpen] = useState(false);
    const [zaehlerstandSubmitted, setZaehlerstandSubmitted] = useState(false);
    const [selectedZaehler, setSelectedZaehler] = useState("");
    const [zaehlerstand, setZaehlerstand] = useState("");
    const [ablesedatum, setAblesedatum] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAnschluss, setSelectedAnschluss] = useState("");
    const [selectedServiceArt, setSelectedServiceArt] = useState("");
    const [beschreibung, setBeschreibung] = useState("");
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
      typ: "Wärmepumpenanschluss",
      icon: Thermometer,
      zaehlerNummer: "WP-2025-001",
      anschlussnummer: "WP-2025-001",
      adresse: "Musterstraße 123, 12345 Musterstadt",
      leistung: "12 kW",
      netzebene: "Niederspannung",
      inbetriebnahme: "01.09.2023",
      status: "Aktiv",
      vertraege: [
        {
          vertragsNummer: "V-WP-2025-001",
          typ: "Wärmepumpen-Sondervertrag",
          beginn: "01.09.2023",
          ende: "unbefristet",
          dokument: "waermepumpe_vertrag.pdf"
        }
      ]
    },
    {
      id: 3,
      typ: "PV-Anlage (Einspeiser)",
      icon: Sun,
      zaehlerNummer: "PV-2025-001",
      anschlussnummer: "PV-2025-001",
      adresse: "Musterstraße 123, 12345 Musterstadt",
      leistung: "8 kWp",
      netzebene: "Niederspannung",
      inbetriebnahme: "10.06.2022",
      status: "Aktiv",
      vertraege: [
        {
          vertragsNummer: "V-PV-2025-001",
          typ: "Einspeisevertrag",
          beginn: "10.06.2022",
          ende: "09.06.2042",
          dokument: "einspeisevertrag_pv.pdf"
        }
      ],
      gutschriften: [
        { monat: "November 2025", betrag: "112,34 €" },
        { monat: "Oktober 2025", betrag: "98,76 €" },
        { monat: "September 2025", betrag: "105,67 €" }
      ]
    }
  ];

  // ...hier müssen alle useState-Hooks und Handler deklariert werden, falls sie fehlen...

  const handleZaehlerstandDialogClose = () => {
    setIsZaehlerstandDialogOpen(false);
    setZaehlerstandSubmitted(false);
    setSelectedZaehler("");
    setZaehlerstand("");
    setAblesedatum("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meine Anschlüsse & Verträge</h1>
            <p className="text-muted-foreground">Übersicht über Ihre Netzanschlüsse und Vertragsdetails</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isZaehlerstandDialogOpen} onOpenChange={setIsZaehlerstandDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calculator className="w-4 h-4" />
                  Zählerstand melden
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                {!zaehlerstandSubmitted ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Zählerstand übermitteln</DialogTitle>
                      <DialogDescription>
                        Geben Sie Ihren aktuellen Zählerstand ein
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleZaehlerstandSubmit} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="zaehler">Zähler auswählen</Label>
                        <Select value={selectedZaehler} onValueChange={setSelectedZaehler}>
                          <SelectTrigger id="zaehler">
                            <SelectValue placeholder="Zähler auswählen" />
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
                        <Label htmlFor="zaehlerstand">Aktueller Zählerstand (kWh)</Label>
                        <Input 
                          id="zaehlerstand" 
                          type="number" 
                          placeholder="12345" 
                          value={zaehlerstand}
                          onChange={(e) => setZaehlerstand(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ablesedatum">Ablesedatum</Label>
                        <Input 
                          id="ablesedatum" 
                          type="date" 
                          value={ablesedatum}
                          onChange={(e) => setAblesedatum(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="foto">Foto hochladen (optional)</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Foto des Zählerstands hinzufügen</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleZaehlerstandDialogClose}
                        >
                          Abbrechen
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={!selectedZaehler || !zaehlerstand || !ablesedatum}
                        >
                          Zählerstand übermitteln
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-8">
                    <div className="text-center">
                      <div className="mx-auto w-16 h-16 bg-status-success/10 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-status-success" />
                      </div>
                      <DialogTitle className="text-2xl mb-2">Erfolgreich übermittelt</DialogTitle>
                      <DialogDescription className="mb-6">
                        Ihre Referenznummer: ZS-2025-{Math.floor(Math.random() * 900000 + 100000)}
                      </DialogDescription>
                      <p className="text-sm text-muted-foreground mb-6">
                        Ihr Zählerstand wurde erfolgreich gespeichert und wird in Ihrer nächsten Abrechnung berücksichtigt.
                      </p>
                      <Button onClick={handleZaehlerstandDialogClose} className="w-full">
                        Schließen
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
            
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
                  
                  {/* Vertragsauswahl für relevante Servicearten */}
                  {(["stammdaten","betriebsweise","steuerliche-behandlung"].includes(selectedServiceArt)) && (
                    <div className="space-y-2">
                      <Label>Vertrag auswählen</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Vertrag auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {anschluesse
                            .find((a) => a.zaehlerNummer === selectedAnschluss)?.vertraege?.map((v, idx) => (
                              <SelectItem key={idx} value={v.vertragsNummer}>{v.typ} ({v.vertragsNummer})</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Stammdatenänderung */}
                  {selectedServiceArt === "stammdaten" && (
                    <div className="space-y-2">
                      <Label>Straße</Label>
                      <Input defaultValue="Musterstraße 123" />
                      <Label>PLZ</Label>
                      <Input defaultValue="12345" />
                      <Label>Ort</Label>
                      <Input defaultValue="Musterstadt" />
                      <Label>Bankverbindung</Label>
                      <Input defaultValue="DE12 3456 7890 1234 5678 00" />
                      <Label>Beschreibung / Anliegen</Label>
                      <Textarea placeholder="Beschreiben Sie hier Ihr Anliegen..." />
                    </div>
                  )}

                  {/* Betriebsweise ändern */}
                  {selectedServiceArt === "betriebsweise" && (
                    <div className="space-y-2">
                      <Label>Aktuelle Betriebsweise</Label>
                      <Input defaultValue="Volleinspeisung" disabled />
                      <Label>Neue Betriebsweise</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Neue Betriebsweise wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volleinspeisung">Volleinspeisung</SelectItem>
                          <SelectItem value="eigenverbrauch">Eigenverbrauch</SelectItem>
                          <SelectItem value="kombi">Kombination</SelectItem>
                        </SelectContent>
                      </Select>
                      <Label>Beschreibung / Anliegen</Label>
                      <Textarea placeholder="Beschreiben Sie hier Ihr Anliegen..." />
                    </div>
                  )}

                  {/* Betreiberwechsel */}
                  {selectedServiceArt === "betreiberwechsel" && (
                    <div className="space-y-2">
                      <Label>Aktueller Betreiber</Label>
                      <Input placeholder="Name aktueller Betreiber" defaultValue="Max Mustermann" />
                      <Label>Neuer Betreiber</Label>
                      <Input placeholder="Name neuer Betreiber" />
                      <Label>Beschreibung / Anliegen</Label>
                      <Textarea placeholder="Beschreiben Sie hier Ihr Anliegen..." />
                    </div>
                  )}

                  {/* Stilllegung/Modultausch */}
                  {selectedServiceArt === "stilllegung" && (
                    <div className="space-y-2">
                      <Label>Stilllegung/Modultausch</Label>
                      <Button asChild variant="link">
                        <a href="/antrag/neue-anlage?art=stilllegung" target="_blank" rel="noopener noreferrer">
                          Zur Antragsstrecke "Anlagenrückbau"
                        </a>
                      </Button>
                      <Textarea placeholder="Fragen zur Stilllegung oder Modultausch..." />
                    </div>
                  )}

                  {/* Steuerliche Behandlung */}
                  {selectedServiceArt === "steuerliche-behandlung" && (
                    <div className="space-y-2">
                      <Label>Beschreibung / Anliegen</Label>
                      <Textarea placeholder="Ihr Anliegen zur steuerlichen Behandlung..." />
                    </div>
                  )}

                  {/* Rechnungskorrektur */}
                  {selectedServiceArt === "rechnungskorrektur" && (
                    <div className="space-y-2">
                      <Label>Rechnung auswählen</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Rechnung auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Beispieldaten */}
                          <SelectItem value="R-HA-2023-001">Hausanschlussrechnung (R-HA-2023-001) - 2.450,00 €</SelectItem>
                          <SelectItem value="R-PV-2025-002">PV-Gutschrift Dezember (R-PV-2025-002) - 105,67 €</SelectItem>
                        </SelectContent>
                      </Select>
                      <Label>Beschreibung / Anliegen</Label>
                      <Textarea placeholder="Fragen zur Rechnung..." />
                    </div>
                  )}

                  {/* Standard-Beschreibung für alle anderen */}
                  {["stammdaten","betriebsweise","betreiberwechsel","stilllegung","steuerliche-behandlung","rechnungskorrektur"].includes(selectedServiceArt) ? null : (
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
                  )}
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

                  {/* Rechnungen für Hausanschluss */}
                  {anschluss.rechnungen && anschluss.rechnungen.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Receipt className="w-4 h-4" />
                        Rechnungen ({anschluss.rechnungen.length})
                      </h3>
                      <div className="space-y-3">
                        {anschluss.rechnungen.map((rechnung, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{rechnung.typ}</p>
                                <Badge variant="outline" className="text-xs">
                                  {rechnung.rechnungsNummer}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Datum: {rechnung.datum} • Betrag: {rechnung.betrag}
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
                  )}

                  {/* Gutschriften für PV-Anlage */}
                  {anschluss.gutschriften && anschluss.gutschriften.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-status-success" />
                        Gutschriften der letzten 3 Monate
                      </h3>
                      <div className="space-y-3">
                        {anschluss.gutschriften.map((g, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{g.monat}</p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Betrag: <span className="font-medium text-status-success">{g.betrag}</span>
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
                  )}
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