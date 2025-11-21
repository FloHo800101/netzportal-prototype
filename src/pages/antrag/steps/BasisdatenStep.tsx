import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const BasisdatenStep = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="anlagenart">Anlagenart</Label>
        <Select defaultValue="pv">
          <SelectTrigger id="anlagenart">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pv">Photovoltaik (PV)</SelectItem>
            <SelectItem value="wind">Windkraft</SelectItem>
            <SelectItem value="bhkw">BHKW</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="leistung">Leistung (kWp)</Label>
        <Input id="leistung" type="number" placeholder="z.B. 8.5" step="0.1" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="speicher" />
        <Label htmlFor="speicher" className="text-sm font-normal cursor-pointer">
          Batteriespeicher vorhanden
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse / Liegenschaft</Label>
        <Input id="adresse" placeholder="Straße, Hausnummer" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="plz">PLZ</Label>
          <Input id="plz" placeholder="12345" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ort">Ort</Label>
          <Input id="ort" placeholder="Musterstadt" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Kontaktdaten Antragsteller</Label>
        <Input id="name" placeholder="Vor- und Nachname" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" type="email" placeholder="ihre.email@beispiel.de" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefon">Telefon</Label>
        <Input id="telefon" type="tel" placeholder="+49 123 456789" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="installateur">Installateur (optional)</Label>
        <Input id="installateur" placeholder="Name des Installateurs" />
      </div>
    </div>
  );
};
