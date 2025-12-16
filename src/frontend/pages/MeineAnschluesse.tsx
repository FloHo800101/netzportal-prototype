import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Home, Thermometer, Sun, Receipt, Download } from "lucide-react";
import React, { useState, useEffect } from "react";
import { ChatBotTaskDialog } from "../components/ChatBotTaskDialog";

// Hilfsfunktion für Label und Placeholder je Serviceart
function getBeschreibungConfig(art: string) {
  switch (art) {
    case "stammdaten":
      return {
        label: "Welche Stammdaten sollen geändert werden?",
        placeholder: "Bitte beschreiben Sie die gewünschten Änderungen (z. B. Name, Adresse, Bankverbindung)..."
      };
    case "betreiberwechsel":
      return {
        label: "Details zum Betreiberwechsel",
        placeholder: "Bitte geben Sie den neuen Betreiber und das gewünschte Wechsel-Datum an..."
      };
    case "betriebsweise":
      return {
        label: "Gewünschte Änderung der Betriebsweise",
        placeholder: "Bitte beschreiben Sie die gewünschte Änderung (z. B. Eigenverbrauch, Volleinspeisung)..."
      };
    case "stilllegung":
      return {
        label: "Angaben zur Stilllegung oder Modultausch",
        placeholder: "Bitte geben Sie das Datum und den Grund der Stilllegung oder Details zum Modultausch an..."
      };
    case "steuerliche-behandlung":
      return {
        label: "Angaben zur steuerlichen Behandlung",
        placeholder: "Bitte beschreiben Sie Ihr Anliegen zur steuerlichen Behandlung..."
      };
    case "rechnungskorrektur":
      return {
        label: "Grund für die Rechnungskorrektur",
        placeholder: "Bitte beschreiben Sie, was an der Rechnung korrigiert werden soll..."
      };
    default:
      return {
        label: "Beschreibung/Anliegen",
        placeholder: "Bitte beschreiben Sie Ihr Anliegen..."
      };
  }
}

// Typdefinitionen
interface Vertrag {
  vertragsNummer: string;
  typ: string;
  beginn: string;
  ende: string;
  dokument: string;
}

interface Rechnung {
  rechnungsNummer: string;
  betrag: string;
  datum: string;
  dokument: string;
}

interface Gutschrift {
  monat: string;
  betrag: string;
}

interface Anschluss {
  id: number;
  typ: string;
  icon: React.ElementType;
  zaehlerNummer: string;
  anschlussnummer: string;
  adresse: string;
  leistung: string;
  netzebene: string;
  inbetriebnahme: string;
  status: string;
  vertraege: Vertrag[];
  rechnungen?: Rechnung[];
  gutschriften?: Gutschrift[];
}

const anschluesse: Anschluss[] = [
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
    ],
    rechnungen: [
      {
        rechnungsNummer: "R-HA-2020-001",
        betrag: "1.200,00 €",
        datum: "20.03.2020",
        dokument: "rechnung_hausanschluss_2020.pdf"
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

// ServiceanfrageDialog-Komponente ausgelagert
const ServiceanfrageDialog: React.FC<{ anschluesse: Anschluss[] }> = ({ anschluesse }) => {
  const [anschluss, setAnschluss] = useState(anschluesse[0]?.id || "");
  const [serviceart, setServiceart] = useState("");
  const [form, setForm] = useState({
    name: "",
    strasse: "",
    konto: "",
    betreiber: "",
    betreiberAdresse: "",
    betriebsweise: "",
    nachricht: "",
  });

  useEffect(() => {
    if (serviceart === "stammdaten") {
      setForm(f => ({ ...f, name: "Max Mustermann", strasse: "Musterstraße 123", konto: "DE12 3456 7890 1234 5678 00" }));
    } else if (serviceart === "betreiberwechsel") {
      setForm(f => ({ ...f, betreiber: "Max Mustermann", betreiberAdresse: "Musterstraße 123" }));
    } else if (serviceart === "betriebsweise") {
      setForm(f => ({ ...f, betriebsweise: "Volleinspeisung" }));
    }
  }, [serviceart]);

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Anschluss wählen</label>
        <select className="w-full border rounded px-3 py-2" value={anschluss} onChange={e => setAnschluss(Number(e.target.value))}>
          {anschluesse.map((a) => (
            <option key={a.id} value={a.id}>{a.typ} – {a.anschlussnummer}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Serviceart</label>
        <select className="w-full border rounded px-3 py-2" value={serviceart} onChange={e => setServiceart(e.target.value)}>
          <option value="">Bitte wählen…</option>
          <option value="stammdaten">Stammdatenänderung</option>
          <option value="betreiberwechsel">Betreiberwechsel</option>
          <option value="betriebsweise">Betriebsweise ändern</option>
          <option value="stilllegung">Stilllegung/Modultausch</option>
        </select>
      </div>
      {serviceart === "stammdaten" && (
        <>
          <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="w-full border rounded px-3 py-2" placeholder="Straße" value={form.strasse} onChange={e => setForm(f => ({ ...f, strasse: e.target.value }))} />
          <input className="w-full border rounded px-3 py-2" placeholder="Kontoverbindung" value={form.konto} onChange={e => setForm(f => ({ ...f, konto: e.target.value }))} />
        </>
      )}
      {serviceart === "betreiberwechsel" && (
        <>
          <input className="w-full border rounded px-3 py-2" placeholder="Neuer Betreiber" value={form.betreiber} onChange={e => setForm(f => ({ ...f, betreiber: e.target.value }))} />
          <input className="w-full border rounded px-3 py-2" placeholder="Anschrift Betreiber" value={form.betreiberAdresse} onChange={e => setForm(f => ({ ...f, betreiberAdresse: e.target.value }))} />
        </>
      )}
      {serviceart === "betriebsweise" && (
        <input className="w-full border rounded px-3 py-2" placeholder="Betriebsweise (z. B. Volleinspeisung)" value={form.betriebsweise} onChange={e => setForm(f => ({ ...f, betriebsweise: e.target.value }))} />
      )}
      {serviceart === "stilllegung" && (
        <div className="text-sm">
          <a href="#" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Zum Antrag</a>
        </div>
      )}
      <textarea className="w-full border rounded px-3 py-2" placeholder="Nachricht (optional)" value={form.nachricht} onChange={e => setForm(f => ({ ...f, nachricht: e.target.value }))} />
      <DialogFooter>
        <Button variant="default" type="submit">Absenden</Button>
      </DialogFooter>
    </form>
  );
};
const MeineAnschluesse: React.FC = () => {
  const [openChatBotId, setOpenChatBotId] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Meine Anschlüsse & Verträge</h1>
        <div className="flex gap-2">
          {/* Zählerstand melden Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                Zählerstand melden
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Zählerstand melden</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <label className="block text-sm font-medium mb-1">Zähler auswählen</label>
                <select className="w-full border rounded px-3 py-2">
                  {anschluesse.map((a) => (
                    <option key={a.zaehlerNummer} value={a.zaehlerNummer}>
                      {a.typ} – {a.zaehlerNummer}
                    </option>
                  ))}
                </select>
                <input type="number" placeholder="Zählerstand (kWh)" className="w-full border rounded px-3 py-2" />
                <input type="date" className="w-full border rounded px-3 py-2" />
                <div>
                  <label className="block text-sm font-medium mb-1">Foto (optional)</label>
                  <input type="file" accept="image/*" className="w-full" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="default">Absenden</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Serviceanfrage Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Serviceanfrage
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Serviceanfrage</DialogTitle>
              </DialogHeader>
              <ServiceanfrageDialog anschluesse={anschluesse} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anschluesse.map((anschluss) => (
          <Card key={anschluss.id} className="relative pb-12">
            <CardHeader className="flex flex-row items-center gap-2">
              <anschluss.icon className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-lg">{anschluss.typ}</CardTitle>
                <CardDescription className="text-xs">{anschluss.anschlussnummer}</CardDescription>
              </div>
              <Badge className={`ml-auto ${anschluss.status === "Aktiv" ? "bg-green-100 text-green-700 border-green-300" : ""}`} variant="outline">{anschluss.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">{anschluss.adresse}</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span>Leistung: {anschluss.leistung}</span>
                <span>Netzebene: {anschluss.netzebene}</span>
                <span>Inbetriebnahme: {anschluss.inbetriebnahme}</span>
              </div>
              <div className="mt-2">
                <div className="font-semibold text-xs mb-1">Verträge:</div>
                {anschluss.vertraege.map((vertrag) => (
                  <div key={vertrag.vertragsNummer} className="flex items-center gap-2 text-xs mb-1">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{vertrag.typ} ({vertrag.vertragsNummer})</span>
                    <span className="ml-auto">{vertrag.beginn} – {vertrag.ende}</span>
                    <Button variant="default" size="icon" className="ml-2" title="Download Vertrag">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {anschluss.rechnungen?.length ? (
                <div className="mt-2">
                  <div className="font-semibold text-xs mb-1">Rechnungen:</div>
                  {anschluss.rechnungen.map((rechnung) => (
                    <div key={rechnung.rechnungsNummer} className="flex items-center gap-2 text-xs mb-1">
                      <Receipt className="w-4 h-4 text-muted-foreground" />
                      <span>{rechnung.rechnungsNummer} ({rechnung.datum}):</span>
                      <span className="ml-auto font-semibold">{rechnung.betrag}</span>
                      <Button variant="default" size="icon" className="ml-2" title="Download Rechnung">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}
              {anschluss.gutschriften?.length ? (
                <div className="mt-2">
                  <div className="font-semibold text-xs mb-1">Gutschriften:</div>
                  {anschluss.gutschriften.map((gutschrift) => (
                    <div key={gutschrift.monat} className="flex items-center text-xs mb-1">
                      <Receipt className="w-4 h-4 text-muted-foreground mr-2" />
                      <span>{gutschrift.monat}:</span>
                      <span className="mx-auto font-semibold">{gutschrift.betrag}</span>
                      <Button variant="default" size="icon" className="ml-2" title="Download Gutschrift">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
            <div className="absolute right-4 bottom-4">
              <Button
                size="sm"
                onClick={() => setOpenChatBotId(anschluss.id)}
                className="bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white shadow-md hover:from-blue-600 hover:to-fuchsia-700"
              >
                Fragen an den Chatbot
              </Button>
            </div>
            <ChatBotTaskDialog
              open={openChatBotId === anschluss.id}
              onClose={() => setOpenChatBotId(null)}
              context={`Fragen zu ${anschluss.typ} (${anschluss.anschlussnummer})`}
              taskType={"anschluss"}
              onSend={() => {}}
            />
          </Card>
        ))}
      </div>
    </div>

  );
};


export default MeineAnschluesse;
