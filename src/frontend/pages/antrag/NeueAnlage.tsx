import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BasisdatenStep } from "./steps/BasisdatenStep";
import { LageplanStep } from "./steps/LageplanStep";
import { NetzpruefungStep } from "./steps/NetzpruefungStep";
import { FreigabeStep } from "./steps/FreigabeStep";
import { InbetriebnahmeStep } from "./steps/InbetriebnahmeStep";
import { MarktstammdatenStep } from "./steps/MarktstammdatenStep";
import { AbschlussStep } from "./steps/AbschlussStep";

const steps = [
  { id: 1, title: "Basisdaten der Anlage", component: BasisdatenStep },
  { id: 2, title: "Lageplan", component: LageplanStep },
  { id: 3, title: "Netzverträglichkeitsprüfung", component: NetzpruefungStep },
  { id: 4, title: "Freigabe durch Netzbetreiber", component: FreigabeStep },
  { id: 5, title: "Inbetriebnahme koordinieren", component: InbetriebnahmeStep },
  { id: 6, title: "Marktstammdatenregister", component: MarktstammdatenStep },
  { id: 7, title: "Abschluss", component: AbschlussStep },
];

const NeueAnlage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const CurrentStepComponent = steps.find((s) => s.id === currentStep)?.component || BasisdatenStep;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
              <CardDescription>Schritt {currentStep} von {steps.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent />

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    Weiter
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={() => (window.location.href = "/")}>Zum Dashboard</Button>
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
