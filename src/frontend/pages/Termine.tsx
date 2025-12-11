import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Send, 
  Inbox, 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  Edit,
  Building,
  Zap,
  Settings,
  FileText,
  AlertTriangle,
  Users,
  Wrench
} from "lucide-react";

const defaultReceivedAppointments = [
  {
    id: 1,
    title: "Inbetriebnahme PV-Anlage",
    proposedDate: "22.01.2025", 
    proposedTime: "10:00 - 12:00 Uhr",
    location: "Musterstraße 15, 12345 Musterstadt",
    status: "Bestätigt",
    type: "Inbetriebnahme",
    from: "Installateur Müller GmbH",
    direction: "received",
    description: "Gemeinsame Inbetriebnahme Ihrer 8,5 kWp PV-Anlage mit Netzanschluss und Funktionsprüfung",
    contact: "Herr Schmidt, Tel: 0123-456789"
  },
  {
    id: 2,
    title: "Zählerwechsel auf digitalen Zähler", 
    proposedDate: "05.02.2025",
    proposedTime: "14:00 - 15:30 Uhr",
    location: "Musterstraße 15, 12345 Musterstadt",
    status: "Vorgeschlagen",
    type: "Zählerwechsel", 
    from: "Messstellenbetreiber",
    direction: "received",
    description: "Austausch Ihres analogen Zählers gegen modernen digitalen Zähler (Smart Meter)",
    contact: "Servicecenter, Tel: 0800-123456"
  },
  {
    id: 3,
    title: "Netzverträglichkeitsprüfung vor Ort",
    proposedDate: "15.02.2025",
    proposedTime: "09:00 - 10:00 Uhr", 
    location: "Musterstraße 15, 12345 Musterstadt",
    status: "Vorgeschlagen",
    type: "Netzprüfung",
    from: "Netzbetreiber Regional",
    direction: "received", 
    description: "Vor-Ort-Prüfung der elektrischen Anschlüsse und Netzkapazität für geplante Anlagenerweiterung",
    contact: "Techniker Team, Tel: 0123-987654"
  }
];

const defaultSentRequests = [
  {
    id: 4,
    title: "Beratungstermin Direktvermarktung",
    preferredTimes: ["Montag 09:00-12:00", "Dienstag 14:00-17:00", "Mittwoch 10:00-13:00"],
    requestedDate: "KW 7/2025",
    type: "Beratung",
    to: "Kundenbetreuer", 
    direction: "sent",
    status: "Wartend",
    description: "Beratung zu Direktvermarktung meiner PV-Anlage ab 2025 - Optionen und Vergütungsmodelle",
    createdAt: "28.11.2025"
  },
  {
    id: 5,
    title: "Vor-Ort-Termin Störung Hausanschluss",
    preferredTimes: ["Heute ab 14:00", "Morgen ganztägig", "Übermorgen ganztägig"],
    requestedDate: "Dringend - diese Woche",
    type: "Störung",
    to: "Entstörungsdienst",
    direction: "sent", 
    status: "In Bearbeitung",
    description: "Intermittierende Spannungsschwankungen im Hausanschluss seit gestern Abend. Lichter flackern.",
    createdAt: "01.12.2025"
  }
];

const timeSlotOptions = [
  "Montag 08:00-12:00",
  "Montag 13:00-17:00", 
  "Dienstag 08:00-12:00",
  "Dienstag 13:00-17:00",
  "Mittwoch 08:00-12:00", 
  "Mittwoch 13:00-17:00",
  "Donnerstag 08:00-12:00",
  "Donnerstag 13:00-17:00",
  "Freitag 08:00-12:00",
  "Freitag 13:00-16:00",
  "Samstag 09:00-12:00 (Notdienst)"
];

const appointmentCategories = [
  { value: "installation", label: "Installation & Inbetriebnahme" },
  { value: "wartung", label: "Wartung & Störung" },
  { value: "beratung", label: "Beratung & Planung" },
  { value: "dokumentation", label: "Dokumentation & Prüfung" },
  { value: "sonstiges", label: "Sonstiges" }
];

const appointmentReasons: Record<string, Array<{ value: string; label: string }>> = {
  installation: [
    { value: "inbetriebnahme-pv", label: "Inbetriebnahme PV-Anlage" },
    { value: "inbetriebnahme-wp", label: "Inbetriebnahme Wärmepumpe" },
    { value: "inbetriebnahme-wallbox", label: "Inbetriebnahme Wallbox" },
    { value: "zaehlerwechsel", label: "Zählerwechsel / Zählertausch" },
    { value: "netzanschluss-neubau", label: "Netzanschluss Neubau" },
    { value: "leistungserhoehung", label: "Leistungserhöhung bestehender Anschluss" }
  ],
  wartung: [
    { value: "zaehlerablesung", label: "Zählerablesung vor Ort" },
    { value: "stoerung", label: "Störungsbehebung / Technischer Defekt" },
    { value: "wartung-hak", label: "Wartung Hausanschlusskasten" },
    { value: "spannungspruefung", label: "Spannungsprobleme / Netzqualität prüfen" }
  ],
  beratung: [
    { value: "beratung-netzanschluss", label: "Beratungsgespräch Netzanschluss" },
    { value: "vor-ort-begehung", label: "Vor-Ort-Begehung / Standortprüfung" },
    { value: "machbarkeitspruefung", label: "Technische Machbarkeitsprüfung" },
    { value: "netzanschlussberechnung", label: "Netzanschlussberechnung" }
  ],
  dokumentation: [
    { value: "abnahme", label: "Abnahme nach Installation" },
    { value: "messstellenbetrieb", label: "Messstellenbetrieb prüfen" },
    { value: "einspeisemanagement", label: "Einspeisemanagement-Einstellung" },
    { value: "zaehlerschrank", label: "Zählerschrank-Modernisierung" }
  ],
  sonstiges: [
    { value: "baustelle", label: "Baustellenversorgung (temporär)" },
    { value: "zufahrt", label: "Grundstückszufahrt / Netzbauarbeiten" },
    { value: "demontage", label: "Demontage Anschluss (bei Rückbau)" },
    { value: "kabelschaden", label: "Kabelschaden / Tiefbauarbeiten" }
  ]
};

const Termine = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("received");
  const [receivedAppointments, setReceivedAppointments] = useState(defaultReceivedAppointments);
  const [sentRequests, setSentRequests] = useState(defaultSentRequests);
  const [newRequest, setNewRequest] = useState({
    title: "",
    category: "",
    reason: "",
    description: "",
    urgency: "normal",
    preferredTimes: [] as string[],
    to: ""
  });

  // Lade Daten aus localStorage oder verwende Default-Daten
  useEffect(() => {
    const savedReceived = localStorage.getItem('receivedAppointments');
    const savedSent = localStorage.getItem('sentRequests');
    
    if (savedReceived) {
      try {
        setReceivedAppointments(JSON.parse(savedReceived));
      } catch {
        localStorage.setItem('receivedAppointments', JSON.stringify(defaultReceivedAppointments));
      }
    } else {
      localStorage.setItem('receivedAppointments', JSON.stringify(defaultReceivedAppointments));
    }

    if (savedSent) {
      try {
        setSentRequests(JSON.parse(savedSent));
      } catch {
        localStorage.setItem('sentRequests', JSON.stringify(defaultSentRequests));
      }
    } else {
      localStorage.setItem('sentRequests', JSON.stringify(defaultSentRequests));
    }
  }, []);

  const updateReceivedAppointments = (appointments: typeof receivedAppointments) => {
    setReceivedAppointments(appointments);
    localStorage.setItem('receivedAppointments', JSON.stringify(appointments));
  };

  const updateSentRequests = (requests: typeof sentRequests) => {
    setSentRequests(requests);
    localStorage.setItem('sentRequests', JSON.stringify(requests));
  };

  const handleTimeSlotChange = (timeSlot: string, checked: boolean) => {
    if (checked) {
      setNewRequest(prev => ({
        ...prev,
        preferredTimes: [...prev.preferredTimes, timeSlot]
      }));
    } else {
      setNewRequest(prev => ({
        ...prev,
        preferredTimes: prev.preferredTimes.filter(time => time !== timeSlot)
      }));
    }
  };

  const submitRequest = () => {
    const selectedCategory = appointmentCategories.find(c => c.value === newRequest.category);
    const selectedReason = appointmentReasons[newRequest.category]?.find(r => r.value === newRequest.reason);
    
    const request = {
      id: Date.now(),
      title: newRequest.title,
      preferredTimes: newRequest.preferredTimes,
      requestedDate: newRequest.urgency === "urgent" ? "Dringend - diese Woche" : "Nach Verfügbarkeit",
      type: `${selectedCategory?.label} - ${selectedReason?.label}`,
      to: newRequest.to,
      direction: "sent",
      status: "Wartend",
      description: newRequest.description,
      createdAt: new Date().toLocaleDateString('de-DE')
    };

    const updated = [request, ...sentRequests];
    updateSentRequests(updated);
    setNewRequest({ 
      title: "", 
      category: "",
      reason: "",
      description: "", 
      urgency: "normal", 
      preferredTimes: [], 
      to: "" 
    });
    setIsDialogOpen(false);
  };

  const confirmAppointment = (id: number) => {
    const updated = receivedAppointments.map(apt => 
      apt.id === id ? { ...apt, status: "Bestätigt" } : apt
    );
    updateReceivedAppointments(updated);
  };

  const declineAppointment = (id: number) => {
    const updated = receivedAppointments.map(apt => 
      apt.id === id ? { ...apt, status: "Abgelehnt" } : apt
    );
    updateReceivedAppointments(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Meine Termine</h1>
            <p className="text-muted-foreground">Terminübersicht und Terminanfragen</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Send className="w-4 h-4" />
                Terminanfrage stellen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-blue-600" />
                  Neue Terminanfrage stellen
                </DialogTitle>
                <DialogDescription>
                  Stellen Sie hier Ihre Terminanfrage für verschiedene Services
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Erste Zeile: Kategorie und Termingrund nebeneinander */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategorie</Label>
                    <Select 
                      value={newRequest.category} 
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value, reason: "" }))}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Kategorie wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        {appointmentCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="reason">Termingrund</Label>
                    <Select 
                      value={newRequest.reason} 
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, reason: value }))}
                      disabled={!newRequest.category}
                    >
                      <SelectTrigger id="reason">
                        <SelectValue placeholder={newRequest.category ? "Termingrund wählen..." : "Zuerst Kategorie wählen"} />
                      </SelectTrigger>
                      <SelectContent>
                        {newRequest.category && appointmentReasons[newRequest.category]?.map((reason) => (
                          <SelectItem key={reason.value} value={reason.value}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Zweite Zeile: Betreff */}
                <div>
                  <Label htmlFor="title">Betreff</Label>
                  <Input
                    id="title"
                    type="text"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="z.B. Terminvereinbarung für Inbetriebnahme"
                  />
                </div>
                
                <div>
                  <Label htmlFor="recipient">Empfänger</Label>
                  <Select 
                    value={newRequest.to} 
                    onValueChange={(value) => setNewRequest(prev => ({ ...prev, to: value }))}
                  >
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="An wen richtet sich Ihre Anfrage?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="netzbetreiber">Netzbetreiber (Stadtwerke Muster)</SelectItem>
                      <SelectItem value="messstellenbetreiber">Messstellenbetreiber</SelectItem>
                      <SelectItem value="installateur">Installateur XYZ GmbH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Bitte beschreiben Sie Ihr Anliegen..."
                  />
                </div>

                <div>
                  <Label>Dringlichkeit</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="normal"
                        checked={newRequest.urgency === "normal"}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                        className="mr-2"
                      />
                      Normal (nach Verfügbarkeit)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={newRequest.urgency === "urgent"}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                        className="mr-2"
                      />
                      Dringend (diese Woche)
                    </label>
                  </div>
                </div>

                <div>
                  <Label>
                    Wunschzeiten ({newRequest.preferredTimes.length} ausgewählt)
                  </Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {timeSlotOptions.map((slot) => (
                      <label key={slot} className="flex items-center space-x-2 text-sm">
                        <Checkbox
                          checked={newRequest.preferredTimes.includes(slot)}
                          onCheckedChange={(checked) => handleTimeSlotChange(slot, !!checked)}
                        />
                        <span>{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={submitRequest}
                    disabled={!newRequest.title || !newRequest.category || !newRequest.reason || !newRequest.to}
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Anfrage senden
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Abbrechen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("received")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "received" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Inbox className="w-4 h-4 mr-2 inline" />
              Erhaltene Termine ({receivedAppointments.filter(apt => apt.status !== "Abgelehnt").length})
            </button>
            <button
              onClick={() => setActiveTab("sent")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "sent" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Send className="w-4 h-4 mr-2 inline" />
              Meine Anfragen ({sentRequests.length})
            </button>
          </div>
        </div>

        {/* Tab Content - Erhaltene Termine */}
        {activeTab === "received" && (
          <div className="space-y-6">
            {receivedAppointments.filter(apt => apt.status !== "Abgelehnt").length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Inbox className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Keine erhaltenen Termine</h3>
                  <p className="text-gray-600">Sie haben noch keine Terminvorschläge erhalten.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {receivedAppointments.filter(apt => apt.status !== "Abgelehnt").map((appointment) => (
                  <Card key={appointment.id} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            <Inbox className="w-5 h-5 mr-2 text-green-600" />
                            {appointment.title}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="w-4 h-4 mr-1" />
                            Von: {appointment.from}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={appointment.status === "Bestätigt" ? "default" : "secondary"}
                          className={appointment.status === "Bestätigt" ? "bg-green-100 text-green-800" : ""}
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.proposedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{appointment.proposedTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700">{appointment.description}</p>
                      </div>
                      
                      {appointment.status === "Vorgeschlagen" && (
                        <div className="pt-4 flex gap-2 border-t">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => confirmAppointment(appointment.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Bestätigen
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => declineAppointment(appointment.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Ablehnen
                          </Button>
                        </div>
                      )}
                      
                      {appointment.status === "Bestätigt" && (
                        <div className="pt-4 flex gap-2 border-t">
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Nachricht senden
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            Zum Kalender
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content - Gesendete Anfragen */}
        {activeTab === "sent" && (
          <div className="space-y-6">
            {sentRequests.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Send className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Keine gesendeten Anfragen</h3>
                  <p className="text-gray-600 mb-4">Sie haben noch keine Terminanfragen gestellt.</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Send className="w-4 h-4 mr-2" />
                    Erste Anfrage stellen
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sentRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            <Send className="w-5 h-5 mr-2 text-blue-600" />
                            {request.title}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="w-4 h-4 mr-1" />
                            An: {request.to === "netzbetreiber" ? "Stadtwerke Muster" : 
                                 request.to === "messstellenbetreiber" ? "Messstellenbetreiber" : "Installateur XYZ GmbH"}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={request.status === "Bestätigt" ? "default" : "secondary"}
                          className={request.status === "Wartend" ? "bg-yellow-100 text-yellow-800" : ""}
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Angefragt am: {request.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{request.requestedDate}</span>
                      </div>
                      
                      {request.preferredTimes.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm font-medium mb-1">Wunschzeiten:</p>
                          <p className="text-sm text-blue-700">{request.preferredTimes.join(", ")}</p>
                        </div>
                      )}
                      
                      {request.description && (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-700">{request.description}</p>
                        </div>
                      )}

                      <div className="pt-4 flex gap-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Nachfragen
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Bearbeiten
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Termine;
