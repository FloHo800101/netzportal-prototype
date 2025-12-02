import { Card, CardContent, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { Input } from "@/frontend/components/ui/input";
import { Label } from "@/frontend/components/ui/label";
import { Checkbox } from "@/frontend/components/ui/checkbox";
import { useState, useEffect } from "react";

interface AuszahlungseinstellungenStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function AuszahlungseinstellungenStep({ data, onDataChange }: AuszahlungseinstellungenStepProps) {
  const [formData, setFormData] = useState({
    payout_iban: data?.payout_iban || '',
    payout_kontoinhaber: data?.payout_kontoinhaber || '',
    payout_kleinunternehmer: data?.payout_kleinunternehmer || false,
    payout_steuernummer: data?.payout_steuernummer || '',
    ...data
  });

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Clear Steuernummer when Kleinunternehmerregelung is disabled
  useEffect(() => {
    if (!formData.payout_kleinunternehmer && formData.payout_steuernummer) {
      setFormData(prev => ({ ...prev, payout_steuernummer: '' }));
    }
  }, [formData.payout_kleinunternehmer]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bankverbindung für Einspeisevergütung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="payout_kontoinhaber">Kontoinhaber</Label>
            <Input
              id="payout_kontoinhaber"
              value={formData.payout_kontoinhaber}
              onChange={(e) => updateField('payout_kontoinhaber', e.target.value)}
              placeholder="Max Mustermann"
            />
          </div>

          <div>
            <Label htmlFor="payout_iban">IBAN</Label>
            <Input
              id="payout_iban"
              value={formData.payout_iban}
              onChange={(e) => updateField('payout_iban', e.target.value)}
              placeholder="DE89 3704 0044 0532 0130 00"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Steuerliche Angaben</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="payout_kleinunternehmer"
              checked={formData.payout_kleinunternehmer}
              onCheckedChange={(checked) => updateField('payout_kleinunternehmer', checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="payout_kleinunternehmer"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Kleinunternehmerregelung nach § 19 UStG
              </Label>
              <p className="text-xs text-muted-foreground">
                Sie sind berechtigt, die Kleinunternehmerregelung anzuwenden
              </p>
            </div>
          </div>

          {formData.payout_kleinunternehmer && (
            <div>
              <Label htmlFor="payout_steuernummer">Steuernummer</Label>
              <Input
                id="payout_steuernummer"
                value={formData.payout_steuernummer}
                onChange={(e) => updateField('payout_steuernummer', e.target.value)}
                placeholder="12/345/67890"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ihre Steuernummer vom Finanzamt (für Kleinunternehmer erforderlich)
              </p>
            </div>
          )}

          {!formData.payout_kleinunternehmer && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Hinweis:</strong> Ohne Kleinunternehmerregelung sind Sie zur Umsatzsteuer verpflichtet. 
                Weitere steuerliche Angaben werden dann vom Finanzamt angefordert.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wichtige Informationen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p>Die Einspeisevergütung wird monatlich auf das angegebene Konto überwiesen</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p>Steuerliche Änderungen können jederzeit nachträglich gemeldet werden</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <p>Bei Fragen zur Kleinunternehmerregelung wenden Sie sich an Ihr Finanzamt</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}