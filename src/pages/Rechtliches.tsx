import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Scale, FileText, Shield, Lock } from "lucide-react";

const Rechtliches = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rechtliche Informationen</h1>
          <p className="text-muted-foreground">Wichtige rechtliche Dokumente und Hinweise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">AGB</CardTitle>
              <CardDescription>Allgemeine Geschäftsbedingungen</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Datenschutz</CardTitle>
              <CardDescription>Datenschutzerklärung</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Impressum</CardTitle>
              <CardDescription>Anbieterkennzeichnung</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Sicherheit</CardTitle>
              <CardDescription>Sicherheitsrichtlinien</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Häufig gestellte rechtliche Fragen</CardTitle>
            <CardDescription>Antworten auf wichtige Rechtsfragen</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Wie werden meine Daten geschützt?</AccordionTrigger>
                <AccordionContent>
                  Ihre Daten werden nach den höchsten Datenschutzstandards (DSGVO) verarbeitet und gespeichert. 
                  Alle Übertragungen erfolgen verschlüsselt, und wir geben Ihre Daten nur mit Ihrer ausdrücklichen 
                  Einwilligung oder aufgrund gesetzlicher Verpflichtungen an Dritte weiter.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Welche Rechte habe ich als Kunde?</AccordionTrigger>
                <AccordionContent>
                  Als Kunde haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, 
                  Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. 
                  Sie können diese Rechte jederzeit über unser Kontaktformular oder per E-Mail geltend machen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Was passiert bei einem Anbieterwechsel?</AccordionTrigger>
                <AccordionContent>
                  Bei einem Anbieterwechsel übernehmen wir die Kündigung bei Ihrem bisherigen Versorger. 
                  Ihre Versorgung ist während des gesamten Wechselprozesses gesichert. Der Wechsel ist für Sie kostenlos, 
                  und es entstehen keine Versorgungslücken.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Wie lange sind Verträge gültig?</AccordionTrigger>
                <AccordionContent>
                  Die Mindestvertragslaufzeit beträgt in der Regel 12 Monate. Nach Ablauf der Mindestlaufzeit 
                  verlängert sich der Vertrag automatisch um jeweils ein weiteres Jahr, sofern er nicht mit einer 
                  Frist von 6 Wochen zum Ende der Laufzeit gekündigt wird.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Welche Pflichten habe ich bei der Einspeisung?</AccordionTrigger>
                <AccordionContent>
                  Als Betreiber einer Einspeiseanlage müssen Sie die Anlage beim Netzbetreiber anmelden und 
                  im Marktstammdatenregister registrieren. Sie sind verpflichtet, die technischen Anschlussbedingungen 
                  einzuhalten und die Anlage regelmäßig warten zu lassen. Bei Änderungen an der Anlage muss der 
                  Netzbetreiber informiert werden.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Wichtige Hinweise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Gesetzliche Informationspflichten</h3>
              <p className="text-sm text-muted-foreground">
                Als Netzbetreiber unterliegen wir besonderen gesetzlichen Informationspflichten nach § 12 EnWG. 
                Alle relevanten Informationen zu Netznutzungsentgelten, technischen Anschlussbedingungen und 
                Netzanschlussverträgen finden Sie in unserem Downloadbereich.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Streitbeilegung</h3>
              <p className="text-sm text-muted-foreground">
                Für die Beilegung von Streitigkeiten steht Ihnen die Schlichtungsstelle Energie e.V. zur Verfügung. 
                Die Kontaktdaten finden Sie auf unserer Website. Wir sind zur Teilnahme am Schlichtungsverfahren 
                verpflichtet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rechtliches;
