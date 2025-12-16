import { useState, useEffect } from "react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormData {
  step1: {
    anlagenart: string;
    gesamtleistungGeplant: string;
    netzebene: string;
    eegAnlageJaNein: string;
    eegKategorie: string;
    betreiberEntsprichtAntragsteller: string;
    betreiberName: string;
    betreiberStrasse: string;
    betreiberHausnummer: string;
    betreiberPlz: string;
    betreiberOrt: string;
    betreiberEmail: string;
    betreiberTelefon: string;
    hatInstallateur: string;
    ausgewaehlterInstallateur: string;
  };
  step2: {
    betreiberName: string;
    betreiberFirma: string;
    betreiberStrasse: string;
    betreiberPlz: string;
    betreiberOrt: string;
    betreiberEmail: string;
    betreiberTelefon: string;
    installateurName: string;
    installateurFirma: string;
  };
  step3: {
    anlagenstandortStrasse: string;
    anlagenstandortPlz: string;
    anlagenstandortOrt: string;
    netzanschlussnummer: string;
    zaehlpunkt: string;
  };
  step4: {
    kontoinhaber: string;
    iban: string;
    bic: string;
    kleinunternehmerregelung: boolean;
    steuernummer: string;
    dsgvoAkzeptiert: boolean;
    agbAkzeptiert: boolean;
    korrektheitBestaetigt: boolean;
  };
}

const ANLAGENART_OPTIONEN = [
  "PV Dach",
  "PV Freifläche",
  "BHKW (Blockheizkraftwerk)",
  "Windenergie",
  "Wasserkraft",
  "Biogas"
];

const BETREIBER_ENTSPRICHT_OPTIONEN = [
  "Ja",
  "Nein"
];

const HAT_INSTALLATEUR_OPTIONEN = [
  "Ja",
  "Nein"
];

const INSTALLATEUR_TESTDATEN = [
  { id: "1", name: "Albers Solar GmbH", ort: "Hamburg", telefon: "+49 40 123456" },
  { id: "2", name: "Anton Energie Systeme", ort: "München", telefon: "+49 89 234567" },
  { id: "3", name: "Ackermann PV-Technik", ort: "Berlin", telefon: "+49 30 345678" },
  { id: "4", name: "Adams Solar Service", ort: "Köln", telefon: "+49 221 456789" },
  { id: "5", name: "Albrecht Solartechnik", ort: "Stuttgart", telefon: "+49 711 567890" }
];

const EEG_ANLAGE_OPTIONEN = [
  "Ja",
  "Nein"
];

const EEG_KATEGORIE_OPTIONEN = [
  "PV-Dach",
  "PV-Freiflache", 
  "Wind-Onshore",
  "Wasser",
  "Biogas"
];

const NETZEBENE_OPTIONEN = [
  "Niederspannung",
  "Mittelspannung",
  "Hochspannung"
];

const steps = [
  { id: 1, title: "Auswahl 'Neuer Antrag'", description: "Antragsstellung" },
  { id: 2, title: "Rollen-Selektion", description: "Anlagenbetreiber auswählen" },
  { id: 3, title: "Installateur", description: "Installateur-Daten" },
  { id: 4, title: "Anlagenerrichter", description: "Errichter-Informationen" },
];

const NeueAnlage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [installateurSuche, setInstallateurSuche] = useState('');
  const [installateurSucheOffen, setInstallateurSucheOffen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    step1: {
      anlagenart: '',
      gesamtleistungGeplant: '',
      netzebene: '',
      eegAnlageJaNein: '',
      eegKategorie: '',
      betreiberEntsprichtAntragsteller: '',
      betreiberName: '',
      betreiberStrasse: '',
      betreiberHausnummer: '',
      betreiberPlz: '',
      betreiberOrt: '',
      betreiberEmail: '',
      betreiberTelefon: '',
      hatInstallateur: '',
      ausgewaehlterInstallateur: '',
    },
    step2: {
      betreiberName: '',
      betreiberFirma: '',
      betreiberStrasse: '',
      betreiberPlz: '',
      betreiberOrt: '',
      betreiberEmail: '',
      betreiberTelefon: '',
      installateurName: '',
      installateurFirma: '',
    },
    step3: {
      anlagenstandortStrasse: '',
      anlagenstandortPlz: '',
      anlagenstandortOrt: '',
      netzanschlussnummer: '',
      zaehlpunkt: '',
    },
    step4: {
      kontoinhaber: '',
      iban: '',
      bic: '',
      kleinunternehmerregelung: false,
      steuernummer: '',
      dsgvoAkzeptiert: false,
      agbAkzeptiert: false,
      korrektheitBestaetigt: false,
    },
  });

  const setStep1 = (data: Partial<FormData['step1']>) => {
    setFormData(prev => ({ ...prev, step1: { ...prev.step1, ...data } }));
  };

  const setStep2 = (data: Partial<FormData['step2']>) => {
    setFormData(prev => ({ ...prev, step2: { ...prev.step2, ...data } }));
  };

  const setStep3 = (data: Partial<FormData['step3']>) => {
    setFormData(prev => ({ ...prev, step3: { ...prev.step3, ...data } }));
  };

  const setStep4 = (data: Partial<FormData['step4']>) => {
    setFormData(prev => ({ ...prev, step4: { ...prev.step4, ...data } }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        let baseValid = formData.step1.anlagenart && formData.step1.gesamtleistungGeplant && formData.step1.netzebene && formData.step1.eegAnlageJaNein && formData.step1.betreiberEntsprichtAntragsteller;
        
        // EEG-Kategorie nur erforderlich wenn EEG-Anlage = "Ja"
        if (formData.step1.eegAnlageJaNein === 'Ja') {
          baseValid = baseValid && formData.step1.eegKategorie;
        }
        
        // Installateur-Auswahl erforderlich
        baseValid = baseValid && formData.step1.hatInstallateur;
        if (formData.step1.hatInstallateur === 'Ja') {
          baseValid = baseValid && formData.step1.ausgewaehlterInstallateur;
        }
        
        // Betreiber-Daten nur erforderlich wenn Betreiber ≠ Antragsteller
        if (formData.step1.betreiberEntsprichtAntragsteller === 'Nein') {
          return baseValid && formData.step1.betreiberName && formData.step1.betreiberStrasse && formData.step1.betreiberHausnummer && formData.step1.betreiberPlz && formData.step1.betreiberOrt && formData.step1.betreiberEmail;
        }
        return baseValid;
      case 2:
        return formData.step2.betreiberName && formData.step2.betreiberEmail;
      case 3:
        return formData.step3.anlagenstandortStrasse && formData.step3.anlagenstandortPlz;
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

  const handleSave = () => {
    // Daten werden bereits automatisch in localStorage gespeichert via useEffect
    // Hier können zusätzliche Speicher-Aktionen durchgeführt werden
    alert('Fortschritt gespeichert!');
  };

  const handleSubmit = () => {
    if (!canProceed()) return;

    const submission = {
      ...formData,
      id: `ANT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'eingereicht',
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Neue EEG-Anlage anmelden</h1>
            <p className="text-muted-foreground">EEG-Anlage Schritt für Schritt anmelden</p>
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
                            ? "bg-green-600 text-white"
                            : step.id === currentStep
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {step.id}
                      </div>
                      <span className="text-xs text-center mt-2 max-w-[100px] hidden md:block">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          step.id < currentStep ? "bg-green-600" : "bg-gray-300"
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
              {/* Step 1: Auswahl "Neuer Antrag" / Antragsstellung */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="anlagenart">Anlagenart *</Label>
                      <Select value={formData.step1.anlagenart} onValueChange={(value) => setStep1({ anlagenart: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Anlagenart auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {ANLAGENART_OPTIONEN.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="gesamtleistungGeplant">Gesamtleistung geplant (kWp oder kW) *</Label>
                      <Input
                        id="gesamtleistungGeplant"
                        type="number"
                        step="0.01"
                        value={formData.step1.gesamtleistungGeplant}
                        onChange={(e) => setStep1({ gesamtleistungGeplant: e.target.value })}
                        placeholder="z.B. 10.5"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="netzebene">Netzebene *</Label>
                      <Select value={formData.step1.netzebene} onValueChange={(value) => setStep1({ netzebene: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Netzebene auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {NETZEBENE_OPTIONEN.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base font-medium">EEG_Anlage ja/Nein *</Label>
                      <div className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="eeg-ja"
                            name="eegAnlageJaNein"
                            value="Ja"
                            checked={formData.step1.eegAnlageJaNein === 'Ja'}
                            onChange={(e) => setStep1({ eegAnlageJaNein: e.target.value })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor="eeg-ja" className="text-sm font-normal cursor-pointer">
                            Ja
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="eeg-nein"
                            name="eegAnlageJaNein"
                            value="Nein"
                            checked={formData.step1.eegAnlageJaNein === 'Nein'}
                            onChange={(e) => setStep1({ eegAnlageJaNein: e.target.value })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor="eeg-nein" className="text-sm font-normal cursor-pointer">
                            Nein
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="eegKategorie" className={formData.step1.eegAnlageJaNein !== 'Ja' ? 'text-gray-400' : ''}>
                        EEG_Kategorie (z.B. PV-Dach, PV-Freifläche)
                      </Label>
                      <Select 
                        value={formData.step1.eegAnlageJaNein === 'Ja' ? formData.step1.eegKategorie : ''} 
                        onValueChange={(value) => setStep1({ eegKategorie: value })}
                        disabled={formData.step1.eegAnlageJaNein !== 'Ja'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="EEG-Kategorie auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {EEG_KATEGORIE_OPTIONEN.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Haben Sie bereits einen Installateur? *</Label>
                      <div className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="installateur-ja"
                            name="hatInstallateur"
                            value="Ja"
                            checked={formData.step1.hatInstallateur === 'Ja'}
                            onChange={(e) => setStep1({ hatInstallateur: e.target.value })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor="installateur-ja" className="text-sm font-normal cursor-pointer">
                            Ja
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="installateur-nein"
                            name="hatInstallateur"
                            value="Nein"
                            checked={formData.step1.hatInstallateur === 'Nein'}
                            onChange={(e) => setStep1({ hatInstallateur: e.target.value })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor="installateur-nein" className="text-sm font-normal cursor-pointer">
                            Nein
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    {formData.step1.hatInstallateur === 'Ja' && (
                      <div className="border-t pt-4">
                        <h4 className="text-md font-medium mb-4">Installateur auswählen</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="installateurSuche">Installateur suchen *</Label>
                            <div className="relative">
                              <Input
                                id="installateurSuche"
                                value={installateurSuche}
                                onChange={(e) => setInstallateurSuche(e.target.value)}
                                onFocus={() => setInstallateurSucheOffen(true)}
                                onBlur={() => setTimeout(() => setInstallateurSucheOffen(false), 200)}
                                placeholder="Name eingeben zum Suchen..."
                              />
                              {installateurSucheOffen && (
                                <div 
                                  className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                                  onMouseDown={(e) => e.preventDefault()}
                                >
                                  {INSTALLATEUR_TESTDATEN
                                    .filter(inst => inst.name.toLowerCase().includes(installateurSuche.toLowerCase()))
                                    .map(installateur => (
                                      <div 
                                        key={installateur.id}
                                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                        onClick={() => {
                                          setStep1({ ausgewaehlterInstallateur: installateur.id });
                                          setInstallateurSuche(installateur.name);
                                          setInstallateurSucheOffen(false);
                                        }}
                                      >
                                        <div className="font-medium">{installateur.name}</div>
                                        <div className="text-sm text-gray-600">{installateur.ort} • {installateur.telefon}</div>
                                      </div>
                                    ))}
                                  {INSTALLATEUR_TESTDATEN.filter(inst => inst.name.toLowerCase().includes(installateurSuche.toLowerCase())).length === 0 && installateurSuche && (
                                    <div className="p-3 text-gray-500 text-center">
                                      Kein Installateur gefunden
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            {formData.step1.ausgewaehlterInstallateur && (
                              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                                <div className="text-sm text-green-700">
                                  ✓ Ausgewählt: {INSTALLATEUR_TESTDATEN.find(i => i.id === formData.step1.ausgewaehlterInstallateur)?.name}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setStep1({ ausgewaehlterInstallateur: '' });
                                    setInstallateurSuche('');
                                  }}
                                  className="ml-2 text-green-700 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
                                  title="Auswahl entfernen"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Anlagenbetreiber entspricht Antragsteller *</Label>
                      <div className="flex gap-6 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="betreiber-ja"
                            name="betreiberEntsprichtAntragsteller"
                            value="Ja"
                            checked={formData.step1.betreiberEntsprichtAntragsteller === 'Ja'}
                            onChange={(e) => setStep1({ betreiberEntsprichtAntragsteller: e.target.value })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor="betreiber-ja" className="text-sm font-normal cursor-pointer">
                            Ja
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="betreiber-nein"
                            name="betreiberEntsprichtAntragsteller"
                            value="Nein"
                            checked={formData.step1.betreiberEntsprichtAntragsteller === 'Nein'}
                            onChange={(e) => setStep1({ betreiberEntsprichtAntragsteller: e.target.value })}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <Label htmlFor="betreiber-nein" className="text-sm font-normal cursor-pointer">
                            Nein
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    {formData.step1.betreiberEntsprichtAntragsteller === 'Nein' && (
                      <div className="border-t pt-4">
                        <h4 className="text-md font-medium mb-4">Anlagenbetreiber-Daten</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="betreiberName">Betreiber_Name_oder_Firma *</Label>
                            <Input
                              id="betreiberName"
                              value={formData.step1.betreiberName}
                              onChange={(e) => setStep1({ betreiberName: e.target.value })}
                              placeholder="Max Mustermann oder Firma GmbH"
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="betreiberStrasse">Betreiber_Straße *</Label>
                              <Input
                                id="betreiberStrasse"
                                value={formData.step1.betreiberStrasse}
                                onChange={(e) => setStep1({ betreiberStrasse: e.target.value })}
                                placeholder="Musterstraße"
                              />
                            </div>
                            <div>
                              <Label htmlFor="betreiberHausnummer">Betreiber_Hausnummer *</Label>
                              <Input
                                id="betreiberHausnummer"
                                value={formData.step1.betreiberHausnummer}
                                onChange={(e) => setStep1({ betreiberHausnummer: e.target.value })}
                                placeholder="123"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="betreiberPlz">Betreiber_PLZ *</Label>
                              <Input
                                id="betreiberPlz"
                                value={formData.step1.betreiberPlz}
                                onChange={(e) => setStep1({ betreiberPlz: e.target.value })}
                                placeholder="12345"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="betreiberOrt">Betreiber_Ort *</Label>
                              <Input
                                id="betreiberOrt"
                                value={formData.step1.betreiberOrt}
                                onChange={(e) => setStep1({ betreiberOrt: e.target.value })}
                                placeholder="Musterstadt"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="betreiberEmail">Betreiber_E-Mail *</Label>
                              <Input
                                id="betreiberEmail"
                                type="email"
                                value={formData.step1.betreiberEmail}
                                onChange={(e) => setStep1({ betreiberEmail: e.target.value })}
                                placeholder="max.mustermann@email.com"
                              />
                            </div>
                            <div>
                              <Label htmlFor="betreiberTelefon">Betreiber_Telefon</Label>
                              <Input
                                id="betreiberTelefon"
                                value={formData.step1.betreiberTelefon}
                                onChange={(e) => setStep1({ betreiberTelefon: e.target.value })}
                                placeholder="+49 123 456789"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Betreiber */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Anlagenbetreiber</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="betreiberName">Name oder Firma *</Label>
                        <Input
                          id="betreiberName"
                          value={formData.step2.betreiberName}
                          onChange={(e) => setStep2({ betreiberName: e.target.value })}
                          placeholder="Max Mustermann oder Firma GmbH"
                        />
                      </div>
                      <div>
                        <Label htmlFor="betreiberFirma">Betreiber-Straße</Label>
                        <Input
                          id="betreiberStrasse"
                          value={formData.step2.betreiberStrasse}
                          onChange={(e) => setStep2({ betreiberStrasse: e.target.value })}
                          placeholder="Musterstraße 1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <Label htmlFor="betreiberPlz">PLZ</Label>
                        <Input
                          id="betreiberPlz"
                          value={formData.step2.betreiberPlz}
                          onChange={(e) => setStep2({ betreiberPlz: e.target.value })}
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <Label htmlFor="betreiberOrt">Ort</Label>
                        <Input
                          id="betreiberOrt"
                          value={formData.step2.betreiberOrt}
                          onChange={(e) => setStep2({ betreiberOrt: e.target.value })}
                          placeholder="Musterstadt"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <Label htmlFor="betreiberEmail">E-Mail *</Label>
                        <Input
                          id="betreiberEmail"
                          type="email"
                          value={formData.step2.betreiberEmail}
                          onChange={(e) => setStep2({ betreiberEmail: e.target.value })}
                          placeholder="max@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="betreiberTelefon">Telefon</Label>
                        <Input
                          id="betreiberTelefon"
                          value={formData.step2.betreiberTelefon}
                          onChange={(e) => setStep2({ betreiberTelefon: e.target.value })}
                          placeholder="0123 456789"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Installateur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="installateurName">Installateur Name</Label>
                        <Input
                          id="installateurName"
                          value={formData.step2.installateurName}
                          onChange={(e) => setStep2({ installateurName: e.target.value })}
                          placeholder="Installateur Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="installateurFirma">Installateur Firma</Label>
                        <Input
                          id="installateurFirma"
                          value={formData.step2.installateurFirma}
                          onChange={(e) => setStep2({ installateurFirma: e.target.value })}
                          placeholder="Solar GmbH"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Standort */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Anlagenstandort</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="anlagenstandortStrasse">Straße und Hausnummer *</Label>
                        <Input
                          id="anlagenstandortStrasse"
                          value={formData.step3.anlagenstandortStrasse}
                          onChange={(e) => setStep3({ anlagenstandortStrasse: e.target.value })}
                          placeholder="Anlagenstraße 123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="anlagenstandortPlz">PLZ *</Label>
                        <Input
                          id="anlagenstandortPlz"
                          value={formData.step3.anlagenstandortPlz}
                          onChange={(e) => setStep3({ anlagenstandortPlz: e.target.value })}
                          placeholder="12345"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <Label htmlFor="anlagenstandortOrt">Ort</Label>
                        <Input
                          id="anlagenstandortOrt"
                          value={formData.step3.anlagenstandortOrt}
                          onChange={(e) => setStep3({ anlagenstandortOrt: e.target.value })}
                          placeholder="Anlagenstadt"
                        />
                      </div>
                      <div>
                        <Label htmlFor="netzanschlussnummer">Netzanschlussnummer</Label>
                        <Input
                          id="netzanschlussnummer"
                          value={formData.step3.netzanschlussnummer}
                          onChange={(e) => setStep3({ netzanschlussnummer: e.target.value })}
                          placeholder="NA123456"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zaehlpunkt">Zählpunkt</Label>
                      <Input
                        id="zaehlpunkt"
                        value={formData.step3.zaehlpunkt}
                        onChange={(e) => setStep3({ zaehlpunkt: e.target.value })}
                        placeholder="ZP123456"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Abschluss */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Zusammenfassung</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>EEG-Anlage:</strong> {formData.step1.eegAnlage} ({formData.step1.eegKategorie})</p>
                      <p><strong>Leistung:</strong> {formData.step1.gesamtleistung} kWp</p>
                      <p><strong>Betreiber:</strong> {formData.step2.betreiberName}</p>
                      <p><strong>Standort:</strong> {formData.step3.anlagenstandortStrasse}, {formData.step3.anlagenstandortPlz} {formData.step3.anlagenstandortOrt}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Bankdaten</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="kontoinhaber">Kontoinhaber</Label>
                        <Input
                          id="kontoinhaber"
                          value={formData.step4.kontoinhaber}
                          onChange={(e) => setStep4({ kontoinhaber: e.target.value })}
                          placeholder="Max Mustermann"
                        />
                      </div>
                      <div>
                        <Label htmlFor="iban">IBAN</Label>
                        <Input
                          id="iban"
                          value={formData.step4.iban}
                          onChange={(e) => setStep4({ iban: e.target.value })}
                          placeholder="DE89 3704 0044 0532 0130 00"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Steuerliche Angaben</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="kleinunternehmer"
                        checked={formData.step4.kleinunternehmerregelung}
                        onCheckedChange={(checked) => setStep4({
                          kleinunternehmerregelung: !!checked,
                          steuernummer: !!checked ? '' : formData.step4.steuernummer
                        })}
                      />
                      <Label htmlFor="kleinunternehmer" className="text-sm">
                        Kleinunternehmerregelung nach §19 UStG
                      </Label>
                    </div>

                    {!formData.step4.kleinunternehmerregelung && (
                      <div>
                        <Label htmlFor="steuernummer">Steuernummer</Label>
                        <Input
                          id="steuernummer"
                          value={formData.step4.steuernummer}
                          onChange={(e) => setStep4({ steuernummer: e.target.value })}
                          placeholder="12/345/67890"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="dsgvo"
                        checked={formData.step4.dsgvoAkzeptiert}
                        onCheckedChange={(checked) => setStep4({ dsgvoAkzeptiert: !!checked })}
                      />
                      <Label htmlFor="dsgvo" className="text-sm leading-relaxed">
                        Ich stimme der Verarbeitung meiner personenbezogenen Daten zu. *
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
                        Ich bestätige, dass alle Angaben korrekt sind. *
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSave}>
                    Speichern
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
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Antrag einreichen
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NeueAnlage;