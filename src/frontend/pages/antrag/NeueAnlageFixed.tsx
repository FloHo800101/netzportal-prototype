import { useState } from "react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Button } from "@/frontend/components/ui/button";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/frontend/components/ui/select";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import { Textarea } from "@/frontend/components/ui/textarea";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";

interface FormData {
  step1: {
    typ: string;
    leistung: string;
    hersteller: string;
    modell: string;
    inbetriebnahme: string;
    mitSpeicher: boolean;
    eigenverbrauch: boolean;
  };
  step2: {
    adresse: {
      strasse: string;
      plz: string;
      ort: string;
    };
    gemarkung: string;
    flurstueck: string;
    netzanschlusspunkt: string;
    zaehlernummer: string;
    bemerkungen: string;
  };
  step3: {
    installateur: string;
    bankdaten: {
      kontoinhaber: string;
      iban: string;
      bic: string;
    };
    steuer: {
      kleinunternehmerregelung: boolean;
      steuernummer: string;
      finanzamt: string;
    };
  };
  step4: {
    dsgvoAkzeptiert: boolean;
    agbAkzeptiert: boolean;
    korrektheitBestaetigt: boolean;
  };
}

const INSTALLER_OPTIONS = [
  "Amann Solar GmbH",
  "Abel Photovoltaik",
  "Acker Energietechnik", 
  "Adler Solar Solutions",
  "Ahmann Solartechnik"
];

const steps = [
  { id: 1, title: "Anlagendetails", description: "Grunddaten Ihrer PV-Anlage" },
  { id: 2, title: "Standort", description: "Installationsort der Anlage" },
  { id: 3, title: "Auszahlung", description: "Vergütungseinstellungen" },
  { id: 4, title: "Prüfung", description: "Daten überprüfen und absenden" },
];

const NeueAnlage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: {
      typ: '',
      leistung: '',
      hersteller: '',
      modell: '',
      inbetriebnahme: '',
      mitSpeicher: false,
      eigenverbrauch: false,
    },
    step2: {
      adresse: {
        strasse: '',
        plz: '',
        ort: '',
      },
      gemarkung: '',
      flurstueck: '',
      netzanschlusspunkt: '',
      zaehlernummer: '',
      bemerkungen: '',
    },
    step3: {
      installateur: '',
      bankdaten: {
        kontoinhaber: '',
        iban: '',
        bic: '',
      },
      steuer: {
        kleinunternehmerregelung: false,
        steuernummer: '',
        finanzamt: '',
      },
    },
    step4: {
      dsgvoAkzeptiert: false,
      agbAkzeptiert: false,
      korrektheitBestaetigt: false,
    },
  });

  const setStep1 = (data: Partial<FormData['step1']>) => {
    setFormData(prev => ({
      ...prev,
      step1: { ...prev.step1, ...data }
    }));
  };

  const setStep2 = (data: Partial<FormData['step2']>) => {
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, ...data }
    }));
  };

  const setStep3 = (data: Partial<FormData['step3']>) => {
    setFormData(prev => ({
      ...prev,
      step3: { ...prev.step3, ...data }
    }));
  };

  const setStep4 = (data: Partial<FormData['step4']>) => {
    setFormData(prev => ({
      ...prev,
      step4: { ...prev.step4, ...data }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.step1.typ && formData.step1.leistung && formData.step1.hersteller && 
               formData.step1.modell && formData.step1.inbetriebnahme;
      case 2:
        return formData.step2.adresse.strasse && formData.step2.adresse.plz && formData.step2.adresse.ort;
      case 3:
        const bankOk = formData.step3.bankdaten.kontoinhaber && formData.step3.bankdaten.iban && formData.step3.installateur;
        const steuerOk = formData.step3.steuer.kleinunternehmerregelung || formData.step3.steuer.steuernummer;
        return bankOk && steuerOk;
      case 4:
        return formData.step4.dsgvoAkzeptiert && formData.step4.agbAkzeptiert && formData.step4.korrektheitBestaetigt;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!canProceed()) return;

    const submission = {
      ...formData,
      id: `ANT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'eingereicht',
      visibleToInstaller: true,
      visibleToNetzbetreiber: true,
    };

    const existing = JSON.parse(localStorage.getItem('submittedAntraege') || '[]');
    existing.push(submission);
    localStorage.setItem('submittedAntraege', JSON.stringify(existing));

    alert('Antrag erfolgreich eingereicht!');
    window.location.href = '/antraege';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Neue Erzeugungsanlage anmelden</h1>
            <p className="text-muted-foreground">PV-Anlage Schritt für Schritt anmelden</p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          step.id < currentStep
                            ? "bg-status-success text-white"
                            : step.id === currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.id}
                      </div>
                      <span className="text-xs text-center mt-2 max-w-[100px] hidden md:block">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          step.id < currentStep ? "bg-status-success" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Anlagendetails */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="typ">Anlagentyp *</Label>
                      <Select value={formData.step1.typ} onValueChange={(value) => setStep1({ typ: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Anlagentyp auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="photovoltaik">Photovoltaik</SelectItem>
                          <SelectItem value="windkraft">Windkraft</SelectItem>
                          <SelectItem value="wasserkraft">Wasserkraft</SelectItem>
                          <SelectItem value="biogas">Biogas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="leistung">Installierte Leistung (kWp) *</Label>
                      <Input
                        id="leistung"
                        type="number"
                        step="0.01"
                        value={formData.step1.leistung}
                        onChange={(e) => setStep1({ leistung: e.target.value })}
                        placeholder="z.B. 10.5"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="hersteller">Hersteller *</Label>
                      <Input
                        id="hersteller"
                        value={formData.step1.hersteller}
                        onChange={(e) => setStep1({ hersteller: e.target.value })}
                        placeholder="z.B. SunTech"
                      />
                    </div>
                    <div>
                      <Label htmlFor="modell">Modell *</Label>
                      <Input
                        id="modell"
                        value={formData.step1.modell}
                        onChange={(e) => setStep1({ modell: e.target.value })}
                        placeholder="z.B. ST-400W"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inbetriebnahme">Geplante Inbetriebnahme *</Label>
                    <Input
                      id="inbetriebnahme"
                      type="date"
                      value={formData.step1.inbetriebnahme}
                      onChange={(e) => setStep1({ inbetriebnahme: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Zusätzliche Optionen</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="speicher"
                          checked={formData.step1.mitSpeicher}
                          onCheckedChange={(checked) => setStep1({ mitSpeicher: !!checked })}
                        />
                        <Label htmlFor="speicher" className="text-sm font-normal">
                          Mit Batteriespeicher
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="eigenverbrauch"
                          checked={formData.step1.eigenverbrauch}
                          onCheckedChange={(checked) => setStep1({ eigenverbrauch: !!checked })}
                        />
                        <Label htmlFor="eigenverbrauch" className="text-sm font-normal">
                          Eigenverbrauch geplant
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Standortdaten */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="strasse">Straße und Hausnummer *</Label>
                    <Input
                      id="strasse"
                      value={formData.step2.adresse.strasse}
                      onChange={(e) => setStep2({
                        adresse: { ...formData.step2.adresse, strasse: e.target.value }
                      })}
                      placeholder="z.B. Musterstraße 123"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="plz">Postleitzahl *</Label>
                      <Input
                        id="plz"
                        value={formData.step2.adresse.plz}
                        onChange={(e) => setStep2({
                          adresse: { ...formData.step2.adresse, plz: e.target.value }
                        })}
                        placeholder="z.B. 12345"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ort">Ort *</Label>
                      <Input
                        id="ort"
                        value={formData.step2.adresse.ort}
                        onChange={(e) => setStep2({
                          adresse: { ...formData.step2.adresse, ort: e.target.value }
                        })}
                        placeholder="z.B. Musterstadt"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="gemarkung">Gemarkung</Label>
                      <Input
                        id="gemarkung"
                        value={formData.step2.gemarkung}
                        onChange={(e) => setStep2({ gemarkung: e.target.value })}
                        placeholder="z.B. Musterflur"
                      />
                    </div>
                    <div>
                      <Label htmlFor="flurstueck">Flurstück</Label>
                      <Input
                        id="flurstueck"
                        value={formData.step2.flurstueck}
                        onChange={(e) => setStep2({ flurstueck: e.target.value })}
                        placeholder="z.B. 123/4"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="netzanschluss">Netzanschlusspunkt</Label>
                      <Input
                        id="netzanschluss"
                        value={formData.step2.netzanschlusspunkt}
                        onChange={(e) => setStep2({ netzanschlusspunkt: e.target.value })}
                        placeholder="z.B. Zählerkasten Hauptgebäude"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zaehler">Zählernummer (falls vorhanden)</Label>
                      <Input
                        id="zaehler"
                        value={formData.step2.zaehlernummer}
                        onChange={(e) => setStep2({ zaehlernummer: e.target.value })}
                        placeholder="z.B. 12345678"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bemerkungen">Bemerkungen zum Standort</Label>
                    <Textarea
                      id="bemerkungen"
                      value={formData.step2.bemerkungen}
                      onChange={(e) => setStep2({ bemerkungen: e.target.value })}
                      placeholder="Zusätzliche Informationen zum Standort..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Auszahlung und Steuern */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="installateur">Installateur/Projektentwickler *</Label>
                    <Select 
                      value={formData.step3.installateur} 
                      onValueChange={(value) => setStep3({ installateur: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Installateur auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {INSTALLER_OPTIONS.map((installer) => (
                          <SelectItem key={installer} value={installer}>
                            {installer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Bankverbindung für Einspeisevergütung</h3>
                    
                    <div>
                      <Label htmlFor="kontoinhaber">Kontoinhaber *</Label>
                      <Input
                        id="kontoinhaber"
                        value={formData.step3.bankdaten.kontoinhaber}
                        onChange={(e) => setStep3({
                          bankdaten: { ...formData.step3.bankdaten, kontoinhaber: e.target.value }
                        })}
                        placeholder="Max Mustermann"
                      />
                    </div>

                    <div>
                      <Label htmlFor="iban">IBAN *</Label>
                      <Input
                        id="iban"
                        value={formData.step3.bankdaten.iban}
                        onChange={(e) => setStep3({
                          bankdaten: { ...formData.step3.bankdaten, iban: e.target.value }
                        })}
                        placeholder="DE89 3704 0044 0532 0130 00"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bic">BIC</Label>
                      <Input
                        id="bic"
                        value={formData.step3.bankdaten.bic}
                        onChange={(e) => setStep3({
                          bankdaten: { ...formData.step3.bankdaten, bic: e.target.value }
                        })}
                        placeholder="COBADEFFXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Steuerliche Angaben</h3>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="kleinunternehmer"
                        checked={formData.step3.steuer.kleinunternehmerregelung}
                        onCheckedChange={(checked) => setStep3({
                          steuer: { 
                            ...formData.step3.steuer, 
                            kleinunternehmerregelung: !!checked,
                            steuernummer: !!checked ? '' : formData.step3.steuer.steuernummer
                          }
                        })}
                      />
                      <Label htmlFor="kleinunternehmer" className="text-sm">
                        Kleinunternehmerregelung nach §19 UStG
                      </Label>
                    </div>

                    {!formData.step3.steuer.kleinunternehmerregelung && (
                      <div>
                        <Label htmlFor="steuernummer">Steuernummer *</Label>
                        <Input
                          id="steuernummer"
                          value={formData.step3.steuer.steuernummer}
                          onChange={(e) => setStep3({
                            steuer: { ...formData.step3.steuer, steuernummer: e.target.value }
                          })}
                          placeholder="12/345/67890"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="finanzamt">Zuständiges Finanzamt</Label>
                      <Input
                        id="finanzamt"
                        value={formData.step3.steuer.finanzamt}
                        onChange={(e) => setStep3({
                          steuer: { ...formData.step3.steuer, finanzamt: e.target.value }
                        })}
                        placeholder="Finanzamt Musterstadt"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Prüfung und Einreichung */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Zusammenfassung Ihrer Angaben</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">ANLAGENDETAILS</h4>
                        <p>
                          {formData.step1.typ} • {formData.step1.leistung} kWp • {formData.step1.hersteller} {formData.step1.modell}
                        </p>
                        <p>Inbetriebnahme: {formData.step1.inbetriebnahme}</p>
                        {formData.step1.mitSpeicher && <p>✓ Mit Batteriespeicher</p>}
                        {formData.step1.eigenverbrauch && <p>✓ Eigenverbrauch geplant</p>}
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">STANDORT</h4>
                        <p>
                          {formData.step2.adresse.strasse}<br />
                          {formData.step2.adresse.plz} {formData.step2.adresse.ort}
                        </p>
                        {formData.step2.gemarkung && <p>Gemarkung: {formData.step2.gemarkung}</p>}
                        {formData.step2.flurstueck && <p>Flurstück: {formData.step2.flurstueck}</p>}
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">AUSZAHLUNG</h4>
                        <p>Installateur: {formData.step3.installateur}</p>
                        <p>Kontoinhaber: {formData.step3.bankdaten.kontoinhaber}</p>
                        <p>IBAN: {formData.step3.bankdaten.iban}</p>
                        {formData.step3.steuer.kleinunternehmerregelung ? (
                          <p>Kleinunternehmerregelung: Ja</p>
                        ) : (
                          <p>Steuernummer: {formData.step3.steuer.steuernummer}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="dsgvo"
                        checked={formData.step4.dsgvoAkzeptiert}
                        onCheckedChange={(checked) => setStep4({ dsgvoAkzeptiert: !!checked })}
                      />
                      <Label htmlFor="dsgvo" className="text-sm leading-relaxed">
                        Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der 
                        Datenschutzerklärung zu. *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agb"
                        checked={formData.step4.agbAkzeptiert}
                        onCheckedChange={(checked) => setStep4({ agbAkzeptiert: !!checked })}
                      />
                      <Label htmlFor="agb" className="text-sm leading-relaxed">
                        Ich akzeptiere die Allgemeinen Geschäftsbedingungen. *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="korrektheit"
                        checked={formData.step4.korrektheitBestaetigt}
                        onCheckedChange={(checked) => setStep4({ korrektheitBestaetigt: !!checked })}
                      />
                      <Label htmlFor="korrektheit" className="text-sm leading-relaxed">
                        Ich bestätige, dass alle Angaben vollständig und korrekt sind. *
                      </Label>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Hinweis:</strong> Nach dem Einreichen können Sie Ihren Antrag in der 
                      Antragsübersicht verfolgen. Sie erhalten eine Bestätigung per E-Mail.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
                {currentStep < steps.length ? (
                  <Button onClick={handleNext} disabled={!canProceed()}>
                    Weiter
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="bg-status-success hover:bg-status-success/90"
                  >
                    Antrag einreichen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NeueAnlage;