import React from "react";

type Antrag = {
  id: string;
  timestamp: string;
  step1?: { anlagenart?: string; gesamtleistung?: string; installer_selected?: string };
  step2?: { strasse?: string; hausnummer?: string; plz?: string; ort?: string };
  step3?: { payout_iban?: string; payout_kontoinhaber?: string; payout_steuernummer?: string };
  visibleToInstaller?: boolean;
  visibleToNetzbetreiber?: boolean;
};

const mask = (value?: string | undefined) => {
  if (!value) return '';
  return '**** **** ****';
};

const InstallerView = () => {
  const raw = JSON.parse(localStorage.getItem('submittedAntraege') || '[]') as Antrag[];
  const currentInstaller = localStorage.getItem('currentInstallerName') || '';
  // Show only entries where installer was selected and matches current installer
  const visible = raw.filter((a) => Boolean(a.visibleToInstaller) && a.step1?.installer_selected === currentInstaller);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Anträge - Installateur Ansicht</h1>
          <p className="text-muted-foreground">
            Übersicht aller Anträge, bei denen Sie als Installateur ausgewählt wurden
          </p>
        </div>

        {(!currentInstaller || visible.length === 0) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              {currentInstaller 
                ? 'Keine Anträge verfügbar, bei denen Sie als Installateur ausgewählt wurden.' 
                : 'Kein Installateur in Ihren Profilen hinterlegt. Bitte wählen Sie Ihren Installateur unter „Meine Daten" aus.'}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {visible.map((a) => (
            <div key={a.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{a.step1?.anlagenart} — {a.step1?.gesamtleistung}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    Antragsnummer: {a.id}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Eingereicht am: {a.timestamp ? new Date(a.timestamp).toLocaleString() : '—'}
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Zugewiesen
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Standort</h4>
                  <div className="space-y-1 text-sm">
                    <div>{a.step2?.strasse} {a.step2?.hausnummer}</div>
                    <div>{a.step2?.plz} {a.step2?.ort}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Installateur</h4>
                  <div className="text-sm">
                    {a.step1?.installer_selected || '—'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">IBAN:</span> {mask(a.step3?.payout_iban)}
                    <span className="ml-4 text-xs">(Aus Datenschutzgründen maskiert)</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Details ansehen
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                      Status aktualisieren
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentInstaller && visible.length > 0 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-1">Installateur-Hinweise</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Kontaktaufnahme mit dem Kunden zur Terminvereinbarung</li>
              <li>• Technische Prüfung der Anlagenspezifikationen</li>
              <li>• Statusupdates nach Installationsfortschritt</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallerView;