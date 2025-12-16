import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Home, Thermometer, Sun, Receipt, Download } from "lucide-react";
import React, { useState } from "react";
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

const MeineAnschluesse: React.FC = () => {
  const [openChatBotId, setOpenChatBotId] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Meine Anschlüsse & Verträge</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anschluesse.map((anschluss) => (
          <Card key={anschluss.id} className="relative pb-12">
            <CardHeader className="flex flex-row items-center gap-2">
              <anschluss.icon className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-lg">{anschluss.typ}</CardTitle>
                <CardDescription className="text-xs">{anschluss.anschlussnummer}</CardDescription>
              </div>
              <Badge className="ml-auto" variant="outline">{anschluss.status}</Badge>
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
                    <Button variant="ghost" size="icon" className="ml-2" title="Download Vertrag">
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
                      <span>{rechnung.betrag}</span>
                      <Button variant="ghost" size="icon" className="ml-2" title="Download Rechnung">
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
                    <div key={gutschrift.monat} className="flex items-center gap-2 text-xs mb-1">
                      <Receipt className="w-4 h-4 text-muted-foreground" />
                      <span>{gutschrift.monat}:</span>
                      <span className="ml-auto">{gutschrift.betrag}</span>
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
