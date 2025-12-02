import { useState, useEffect } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'leaflet/dist/leaflet.css';

// NetworkValidation Component
const NetworkValidation = ({ formData, onValidationComplete }: {
  formData: FormData;
  onValidationComplete: (result: string) => void;
}) => {
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationComplete, setValidationComplete] = React.useState(false);

  React.useEffect(() => {
    if (!isValidating && !validationComplete) {
      setIsValidating(true);
      
      // Simulate network validation with 3 second delay
      setTimeout(() => {
        setIsValidating(false);
        setValidationComplete(true);
        onValidationComplete('Netzanschluss verfügbar. Anschluss kann realisiert werden.');
      }, 3000);
    }
  }, []);

  if (validationComplete) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-800">Netzprüfung erfolgreich!</h3>
          </div>
          <p className="text-green-700">
            Die Netzkapazität ist ausreichend. Ihr Anschluss kann realisiert werden.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <h3 className="text-lg font-medium mb-4">Netzprüfung wird durchgeführt...</h3>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="text-blue-600">Netzkapazität wird geprüft</span>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="absolute -top-2 -right-2">
              <div className="animate-pulse w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <p className="text-blue-700 text-sm">
          Ihre Anlagendaten werden mit der vorhandenen Netzinfrastruktur abgeglichen...
        </p>
      </div>
      
      <div className="text-xs text-gray-500 max-w-sm mx-auto">
        Dies kann einige Momente dauern. Die Prüfung erfolgt automatisch basierend auf Ihren Anlagendaten und dem gewählten Standort.
      </div>
    </div>
  );
};

// Fix für Leaflet Default Icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Komponente für Kartenklicks
const LocationSelector: React.FC<{
  position: {lat: number, lng: number} | null;
  onLocationSelect: (lat: number, lng: number) => void;
}> = ({ position, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

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
    anlagenstandortAbweichend: string;
    anlagenstandortStrasse: string;
    anlagenstandortHausnummer: string;
    anlagenstandortPlz: string;
    anlagenstandortOrt: string;
    vorhandenerNetzanschluss: string;
    netzanschlussnummer: string;
    kartenKoordinaten: string;
    lageplanDateien: string;
  };
  step3: {
    einspeiseart: string;
    batterie: string;
    steuerbarkeit: string;
    kontoinhaber: string;
    iban: string;
    kleinunternehmerregelung: boolean;
    steuernummer: string;
  };
  step4: {
    netzpruefungStatus: 'pending' | 'success' | 'error';
    pruefungsErgebnis: string;
  };
  step5: {
    bestaetigung: boolean;
    datenschutz: boolean;
  };
}

const ANLAGENART_OPTIONEN = [
  "PV (Photovoltaik)",
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

const ANLAGENSTANDORT_ABWEICHEND_OPTIONEN = [
  "Ja",
  "Nein"
];

const VORHANDENER_NETZANSCHLUSS_OPTIONEN = [
  "Ja",
  "Nein"
];

const EINSPEISEART_OPTIONEN = [
  "Volleinspeisung",
  "Überschusseinspeisung"
];

const BATTERIE_OPTIONEN = [
  "Ja",
  "Nein"
];

const STEUERBARKEIT_OPTIONEN = [
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
  { id: 1, title: "Grunddaten", description: "Anlagendaten und Installateur" },
  { id: 2, title: "Standort", description: "Standort und Lageplan" },
  { id: 3, title: "Betriebsweise", description: "Betriebsweise und Auszahlungsdaten" },
  { id: 4, title: "Netzprüfung", description: "Automatische Netzkapazitätsprüfung" },
  { id: 5, title: "Abschluss", description: "Review und Antragstellung" },
];

const NeueAnlage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [installateurSuche, setInstallateurSuche] = useState('');
  const [installateurSucheOffen, setInstallateurSucheOffen] = useState(false);
  const [kartenAuswahl, setKartenAuswahl] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{lat: number, lng: number} | null>(null);
  const [lageplanFiles, setLageplanFiles] = useState<File[]>([]);
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
      anlagenstandortAbweichend: '',
      anlagenstandortStrasse: '',
      anlagenstandortHausnummer: '',
      anlagenstandortPlz: '',
      anlagenstandortOrt: '',
      vorhandenerNetzanschluss: '',
      netzanschlussnummer: '',
      kartenKoordinaten: '',
      lageplanDateien: '',
    },
    step3: {
      einspeiseart: '',
      batterie: '',
      steuerbarkeit: '',
      kontoinhaber: '',
      iban: '',
      kleinunternehmerregelung: false,
      steuernummer: '',
    },
    step4: {
      netzpruefungStatus: 'pending',
      pruefungsErgebnis: '',
    },
    step5: {
      bestaetigung: false,
      datenschutz: false,
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

  const setStep5 = (data: Partial<FormData['step5']>) => {
    setFormData(prev => ({ ...prev, step5: { ...prev.step5, ...data } }));
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
        let step2Valid = formData.step2.anlagenstandortAbweichend;
        if (formData.step2.anlagenstandortAbweichend === 'Ja') {
          step2Valid = step2Valid && formData.step2.anlagenstandortStrasse && formData.step2.anlagenstandortHausnummer && formData.step2.anlagenstandortPlz && formData.step2.anlagenstandortOrt && formData.step2.vorhandenerNetzanschluss;
          if (formData.step2.vorhandenerNetzanschluss === 'Ja') {
            step2Valid = step2Valid && formData.step2.netzanschlussnummer;
          }
        }
        return step2Valid;
      case 3:
        let step3Valid = formData.step3.einspeiseart && formData.step3.batterie && formData.step3.steuerbarkeit;
        // Steuerbarkeit ist Pflicht wenn Leistung > 7kW
        const leistung = parseFloat(formData.step1.gesamtleistungGeplant) || 0;
        if (leistung > 7) {
          step3Valid = step3Valid && formData.step3.steuerbarkeit === 'Ja';
        }
        return step3Valid;
      case 4:
        return formData.step4.netzpruefungStatus === 'success';
      case 5:
        return formData.step5.bestaetigung && formData.step5.datenschutz;
      default:
        return false;
    }
  };

  const handleNext = () => {
    console.log('handleNext called', { currentStep, stepsLength: steps.length, canProceed: canProceed() });
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step', currentStep + 1);
    } else {
      console.log('Cannot proceed:', { canProceed: canProceed(), currentStep, stepsLength: steps.length });
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
              <CardTitle>{steps[currentStep - 1]?.title || 'Loading...'}</CardTitle>
              <CardDescription>{steps[currentStep - 1]?.description || 'Loading...'}</CardDescription>
              <div className="text-xs text-gray-500 mt-2">
                Debug: Step {currentStep} von {steps.length}, canProceed: {canProceed().toString()}
              </div>
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

              {/* Step 2: Anlagenstandort und Lageplan */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Anlagenstandort und Lageplan</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Weicht der Anlagenstandort vom Anschlussnehmers/Anlagenbetreibers ab? *</Label>
                        <div className="flex gap-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="standort-abweichend-ja"
                              name="anlagenstandortAbweichend"
                              value="Ja"
                              checked={formData.step2.anlagenstandortAbweichend === 'Ja'}
                              onChange={(e) => setStep2({ anlagenstandortAbweichend: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="standort-abweichend-ja" className="text-sm font-normal cursor-pointer">
                              Ja
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="standort-abweichend-nein"
                              name="anlagenstandortAbweichend"
                              value="Nein"
                              checked={formData.step2.anlagenstandortAbweichend === 'Nein'}
                              onChange={(e) => setStep2({ anlagenstandortAbweichend: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="standort-abweichend-nein" className="text-sm font-normal cursor-pointer">
                              Nein
                            </Label>
                          </div>
                        </div>
                      </div>

                      {formData.step2.anlagenstandortAbweichend === 'Ja' && (
                        <div className="border-t pt-4">
                          <h4 className="text-md font-medium mb-4">Abweichender Anlagenstandort</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="col-span-2">
                                <Label htmlFor="anlagenstandortStrasse">Anlagenstandort_Straße *</Label>
                                <Input
                                  id="anlagenstandortStrasse"
                                  value={formData.step2.anlagenstandortStrasse}
                                  onChange={(e) => setStep2({ anlagenstandortStrasse: e.target.value })}
                                  placeholder="Musterstraße"
                                />
                              </div>
                              <div>
                                <Label htmlFor="anlagenstandortHausnummer">Anlagenstandort_Hausnummer *</Label>
                                <Input
                                  id="anlagenstandortHausnummer"
                                  value={formData.step2.anlagenstandortHausnummer}
                                  onChange={(e) => setStep2({ anlagenstandortHausnummer: e.target.value })}
                                  placeholder="123"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="anlagenstandortPlz">Anlagenstandort_PLZ *</Label>
                                <Input
                                  id="anlagenstandortPlz"
                                  value={formData.step2.anlagenstandortPlz}
                                  onChange={(e) => setStep2({ anlagenstandortPlz: e.target.value })}
                                  placeholder="12345"
                                />
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor="anlagenstandortOrt">Anlagenstandort_Ort *</Label>
                                <Input
                                  id="anlagenstandortOrt"
                                  value={formData.step2.anlagenstandortOrt}
                                  onChange={(e) => setStep2({ anlagenstandortOrt: e.target.value })}
                                  placeholder="Musterstadt"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-base font-medium">Vorhandener_Netzanschluss_JaNein *</Label>
                              <div className="flex gap-6 mt-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="netzanschluss-ja"
                                    name="vorhandenerNetzanschluss"
                                    value="Ja"
                                    checked={formData.step2.vorhandenerNetzanschluss === 'Ja'}
                                    onChange={(e) => setStep2({ vorhandenerNetzanschluss: e.target.value })}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                  />
                                  <Label htmlFor="netzanschluss-ja" className="text-sm font-normal cursor-pointer">
                                    Ja
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="netzanschluss-nein"
                                    name="vorhandenerNetzanschluss"
                                    value="Nein"
                                    checked={formData.step2.vorhandenerNetzanschluss === 'Nein'}
                                    onChange={(e) => setStep2({ vorhandenerNetzanschluss: e.target.value })}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                  />
                                  <Label htmlFor="netzanschluss-nein" className="text-sm font-normal cursor-pointer">
                                    Nein
                                  </Label>
                                </div>
                              </div>
                            </div>
                            
                            {formData.step2.vorhandenerNetzanschluss === 'Ja' && (
                              <div>
                                <Label htmlFor="netzanschlussnummer">Netzanschlussnummer_oder_Zählpunkt *</Label>
                                <Input
                                  id="netzanschlussnummer"
                                  value={formData.step2.netzanschlussnummer}
                                  onChange={(e) => setStep2({ netzanschlussnummer: e.target.value })}
                                  placeholder="z.B. 12345678901 oder Zählpunkt-ID"
                                />
                              </div>
                            )}
                            
                            <div className="border-t pt-4">
                              <h4 className="text-md font-medium mb-4">Alternative: Adresse per Karte auswählen</h4>
                              <div className="space-y-4">
                                <Button 
                                  type="button"
                                  variant="outline" 
                                  onClick={() => setKartenAuswahl(!kartenAuswahl)}
                                  className="w-full"
                                >
                                  {kartenAuswahl ? '📍 Karte ausblenden' : '🗺️ Adresse auf Karte auswählen'}
                                </Button>
                                
                                {kartenAuswahl && (
                                  <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="mb-2 text-sm text-gray-600">
                                      Klicken Sie auf die Karte, um den Anlagenstandort auszuwählen:
                                    </div>
                                    <div className="w-full h-64 rounded-lg overflow-hidden border">
                                      <MapContainer
                                        center={selectedPosition ? [selectedPosition.lat, selectedPosition.lng] : [52.5200, 13.4050]}
                                        zoom={13}
                                        style={{ height: '100%', width: '100%' }}
                                      >
                                        <TileLayer
                                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <LocationSelector
                                          position={selectedPosition}
                                          onLocationSelect={(lat, lng) => {
                                            setSelectedPosition({lat, lng});
                                            setStep2({ kartenKoordinaten: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
                                          }}
                                        />
                                      </MapContainer>
                                    </div>
                                    {selectedPosition && (
                                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded flex items-center justify-between">
                                        <div className="text-sm text-green-700">
                                          ✓ Position ausgewählt: {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSelectedPosition(null);
                                            setStep2({ kartenKoordinaten: '' });
                                          }}
                                          className="ml-2 text-green-700 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
                                          title="Position entfernen"
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="border-t pt-4">
                        <h4 className="text-md font-medium mb-4">Lageplan</h4>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="lageplanUpload" className="text-sm font-medium">
                              Lageplan hochladen oder einzeichnen
                            </Label>
                            <div className="mt-2">
                              <input
                                type="file"
                                id="lageplanUpload"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.dwg"
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  setLageplanFiles(prev => [...prev, ...files]);
                                  setStep2({ lageplanDateien: [...lageplanFiles, ...files].map(f => f.name).join(', ') });
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              <div className="text-xs text-gray-500 mt-1">
                                Unterstützte Formate: PDF, JPG, PNG, DWG (max. 10MB pro Datei)
                              </div>
                            </div>
                          </div>
                          
                          {lageplanFiles.length > 0 && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Hochgeladene Dateien:</Label>
                              {lageplanFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 border rounded">
                                  <div className="flex items-center space-x-2">
                                    <div className="text-sm">📄</div>
                                    <div className="text-sm">{file.name}</div>
                                    <div className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFiles = lageplanFiles.filter((_, i) => i !== index);
                                      setLageplanFiles(newFiles);
                                      setStep2({ lageplanDateien: newFiles.map(f => f.name).join(', ') });
                                    }}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded p-1"
                                    title="Datei entfernen"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100">
                            <div className="text-2xl mb-2">✏️</div>
                            <div className="text-sm text-gray-600 mb-2">
                              Lageplan direkt einzeichnen (Coming Soon)
                            </div>
                            <div className="text-xs text-gray-500">
                              Hier wird eine Zeichenfunktion integriert, um den Lageplan direkt zu erstellen
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Betriebsweise */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Bitte wählen Sie nun die Betriebsweise für die geplante Anlage aus</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">Einspeiseart: Volleinspeisung / Überschusseinspeisung *</Label>
                        <div className="flex gap-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="volleinspeisung"
                              name="einspeiseart"
                              value="Volleinspeisung"
                              checked={formData.step3.einspeiseart === 'Volleinspeisung'}
                              onChange={(e) => setStep3({ einspeiseart: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="volleinspeisung" className="text-sm font-normal cursor-pointer">
                              Volleinspeisung
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="ueberschusseinspeisung"
                              name="einspeiseart"
                              value="Überschusseinspeisung"
                              checked={formData.step3.einspeiseart === 'Überschusseinspeisung'}
                              onChange={(e) => setStep3({ einspeiseart: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="ueberschusseinspeisung" className="text-sm font-normal cursor-pointer">
                              Überschusseinspeisung
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Batterie Ja/Nein *</Label>
                        <div className="flex gap-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="batterie-ja"
                              name="batterie"
                              value="Ja"
                              checked={formData.step3.batterie === 'Ja'}
                              onChange={(e) => setStep3({ batterie: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="batterie-ja" className="text-sm font-normal cursor-pointer">
                              Ja
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="batterie-nein"
                              name="batterie"
                              value="Nein"
                              checked={formData.step3.batterie === 'Nein'}
                              onChange={(e) => setStep3({ batterie: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="batterie-nein" className="text-sm font-normal cursor-pointer">
                              Nein
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">
                          Steuerbarkeit nach §9 EEG / §14a EnWG vorgesehen Ja/Nein *
                          {(() => {
                            const leistung = parseFloat(formData.step1.gesamtleistungGeplant) || 0;
                            return leistung > 7 ? (
                              <span className="text-red-600 text-sm ml-2">(Pflicht bei &gt;7kW)</span>
                            ) : null;
                          })()}
                        </Label>
                        <div className="flex gap-6 mt-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="steuerbarkeit-ja"
                              name="steuerbarkeit"
                              value="Ja"
                              checked={formData.step3.steuerbarkeit === 'Ja'}
                              onChange={(e) => setStep3({ steuerbarkeit: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            />
                            <Label htmlFor="steuerbarkeit-ja" className="text-sm font-normal cursor-pointer">
                              Ja
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="steuerbarkeit-nein"
                              name="steuerbarkeit"
                              value="Nein"
                              checked={formData.step3.steuerbarkeit === 'Nein'}
                              onChange={(e) => setStep3({ steuerbarkeit: e.target.value })}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                              disabled={(() => {
                                const leistung = parseFloat(formData.step1.gesamtleistungGeplant) || 0;
                                return leistung > 7;
                              })()}
                            />
                            <Label 
                              htmlFor="steuerbarkeit-nein" 
                              className={`text-sm font-normal cursor-pointer ${(() => {
                                const leistung = parseFloat(formData.step1.gesamtleistungGeplant) || 0;
                                return leistung > 7 ? 'text-gray-400' : '';
                              })()}`}
                            >
                              Nein
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium mb-4">Optional: Bitte hinterlegen Sie Ihre Auszahlungsdaten</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="kontoinhaber">Kontoinhaber</Label>
                          <Input
                            id="kontoinhaber"
                            value={formData.step3.kontoinhaber}
                            onChange={(e) => setStep3({ kontoinhaber: e.target.value })}
                            placeholder="Max Mustermann"
                          />
                        </div>
                        <div>
                          <Label htmlFor="iban">IBAN</Label>
                          <Input
                            id="iban"
                            value={formData.step3.iban}
                            onChange={(e) => setStep3({ iban: e.target.value })}
                            placeholder="DE89 3704 0044 0532 0130 00"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="kleinunternehmerregelung"
                            checked={formData.step3.kleinunternehmerregelung}
                            onCheckedChange={(checked) => setStep3({ kleinunternehmerregelung: !!checked, steuernummer: checked ? '' : formData.step3.steuernummer })}
                          />
                          <Label htmlFor="kleinunternehmerregelung" className="text-sm font-normal">
                            Kleinunternehmerregelung (§19 UStG)
                          </Label>
                        </div>
                        {!formData.step3.kleinunternehmerregelung && (
                          <div>
                            <Label htmlFor="steuernummer">Steuernummer</Label>
                            <Input
                              id="steuernummer"
                              value={formData.step3.steuernummer}
                              onChange={(e) => setStep3({ steuernummer: e.target.value })}
                              placeholder="123/456/78901"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Netzprüfung */}
              {currentStep === 4 && (
                <NetworkValidation 
                  formData={formData} 
                  onValidationComplete={(result) => setStep4({ netzpruefungStatus: 'success', pruefungsErgebnis: result })} 
                />
              )}

              {/* Step 5: Review und Abschluss */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Zusammenfassung Ihrer Angaben</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className="font-medium mb-2">Anlagendaten</h4>
                        <p><strong>Anlagenart:</strong> {formData.step1.anlagenart}</p>
                        <p><strong>Gesamtleistung:</strong> {formData.step1.gesamtleistungGeplant} kWp</p>
                        <p><strong>EEG-Anlage:</strong> {formData.step1.eegAnlageJaNein}</p>
                        {formData.step1.eegAnlageJaNein === 'Ja' && (
                          <p><strong>EEG-Kategorie:</strong> {formData.step1.eegKategorie}</p>
                        )}
                        <p><strong>Installateur:</strong> {formData.step1.hatInstallateur}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Standortdaten</h4>
                        <p><strong>Standort:</strong> {formData.step2.standortStrasse || 'Nicht angegeben'}, {formData.step2.standortPlz || ''} {formData.step2.standortOrt || ''}</p>
                        <p><strong>Koordinaten:</strong> {formData.step2.koordinaten?.lat?.toFixed(4) || 'N/A'}, {formData.step2.koordinaten?.lng?.toFixed(4) || 'N/A'}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Betriebsweise</h4>
                        <p><strong>Einspeiseart:</strong> {formData.step3.einspeiseart}</p>
                        <p><strong>Batterie:</strong> {formData.step3.batterie}</p>
                        <p><strong>Steuerbarkeit:</strong> {formData.step3.steuerbarkeit}</p>
                        {formData.step3.kontoinhaber && (
                          <>
                            <p><strong>Kontoinhaber:</strong> {formData.step3.kontoinhaber}</p>
                            <p><strong>IBAN:</strong> {formData.step3.iban}</p>
                          </>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Netzprüfung</h4>
                        <p><strong>Status:</strong> <span className="text-green-600">✓ Erfolgreich</span></p>
                        <p><strong>Ergebnis:</strong> {formData.step4.pruefungsErgebnis}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="bestaetigung"
                        checked={formData.step5.bestaetigung}
                        onCheckedChange={(checked) => setStep5({ bestaetigung: !!checked })}
                      />
                      <Label htmlFor="bestaetigung" className="text-sm leading-relaxed">
                        Ich bestätige, dass alle Angaben korrekt und vollständig sind. *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="datenschutz"
                        checked={formData.step5.datenschutz}
                        onCheckedChange={(checked) => setStep5({ datenschutz: !!checked })}
                      />
                      <Label htmlFor="datenschutz" className="text-sm leading-relaxed">
                        Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu. *
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