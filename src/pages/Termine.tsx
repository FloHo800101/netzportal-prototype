import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const appointments = [
  {
    id: 1,
    title: "Inbetriebnahme PV-Anlage",
    date: "22.01.2025",
    time: "10:00 - 12:00 Uhr",
    location: "Musterstraße 15, 12345 Musterstadt",
    status: "Bestätigt",
    type: "Inbetriebnahme",
  },
  {
    id: 2,
    title: "Zählerwechsel",
    date: "05.02.2025",
    time: "14:00 - 15:00 Uhr",
    location: "Musterstraße 15, 12345 Musterstadt",
    status: "Geplant",
    type: "Zählerwechsel",
  },
];

const Termine = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Termine</h1>
            <p className="text-muted-foreground">Übersicht Ihrer Termine und Terminanfragen</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Abbrechen" : "Neuen Termin anfragen"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Terminanfrage</CardTitle>
              <CardDescription>Geben Sie Details für Ihre Terminanfrage ein</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grund">Grund der Anfrage</Label>
                  <Input id="grund" placeholder="z.B. Vor-Ort-Prüfung, Zählerwechsel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wunschtermin">Wunschtermin</Label>
                  <Input id="wunschtermin" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uhrzeit">Bevorzugte Uhrzeit</Label>
                  <Input id="uhrzeit" type="time" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anmerkungen">Anmerkungen</Label>
                  <Textarea id="anmerkungen" placeholder="Zusätzliche Informationen..." />
                </div>

                <Button type="submit" className="w-full">
                  Terminanfrage senden
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{appointment.title}</CardTitle>
                  <Badge variant={appointment.status === "Bestätigt" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                </div>
                <CardDescription>{appointment.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{appointment.location}</span>
                </div>
                <div className="pt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Verschieben
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Termine;
