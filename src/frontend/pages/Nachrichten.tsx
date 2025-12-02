import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AlertCircle, Calendar, TrendingUp, Zap, Wrench, CheckCircle, Clock, Archive, Send, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select as SelectComponent, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const defaultMessages = [
  {
    id: 1,
    title: "Geplante Netzwartung in Ihrem Gebiet",
    description: "Kurzzeitige Stromunterbrechung am 25.01.2025 zwischen 09:00-12:00 Uhr",
    date: "02.12.2025",
    time: "14:30",
    type: "warning",
    icon: Zap,
    read: false,
    priority: "hoch",
    category: "Wartung",
    sender: "Netzbetreiber Regional",
    details: "Liebe Kundinnen und Kunden, \n\nam Freitag, den 25.01.2025, führen wir in Ihrem Versorgungsgebiet (PLZ 12345, Musterstraße 1-50) planmäßige Wartungsarbeiten an unserem Stromnetz durch. \n\nZeitraum: 09:00 - 12:00 Uhr\nBetroffene Gebiete: Musterstraße 1-50, Beispielweg 10-30\n\nWir bitten um Ihr Verständnis für die kurzzeitigen Unannehmlichkeiten. Die Arbeiten sind notwendig, um die Versorgungssicherheit und -qualität weiterhin zu gewährleisten. \n\nBei Rückfragen stehen wir Ihnen gerne zur Verfügung.\n\nIhr Netzbetreiber-Team",
  },
  {
    id: 2,
    title: "Terminvorschlag für Inbetriebnahme",
    description: "Installateur Müller GmbH möchte einen Termin für die Inbetriebnahme Ihrer PV-Anlage vereinbaren",
    date: "01.12.2025",
    time: "16:45",
    type: "info",
    icon: Calendar,
    read: false,
    priority: "mittel",
    category: "Installateur",
    sender: "Müller GmbH (Installateur)",
    details: "Hallo,\n\ndie Installation Ihrer PV-Anlage (Antrag #ANT-2025-001) ist soweit abgeschlossen. Für die offizielle Inbetriebnahme und den Anschluss an das öffentliche Netz benötigen wir einen gemeinsamen Termin.\n\nVorgeschlagene Termine:\n• Montag, 09.12.2025, 10:00-12:00 Uhr\n• Dienstag, 10.12.2025, 14:00-16:00 Uhr\n• Mittwoch, 11.12.2025, 08:00-10:00 Uhr\n\nBitte bestätigen Sie einen der Termine oder schlagen Sie einen alternativen Zeitraum vor. Die Inbetriebnahme dauert ca. 1-2 Stunden.\n\nBeste Grüße,\nTeam Müller GmbH",
  },
  {
    id: 3,
    title: "Erhöhter Energieverbrauch festgestellt",
    description: "Ihr Stromverbrauch ist in den letzten 7 Tagen um 18% gestiegen",
    date: "30.11.2025",
    time: "08:15",
    type: "warning",
    icon: TrendingUp,
    read: true,
    priority: "niedrig",
    category: "Verbrauch",
    sender: "Automatisches System",
    details: "Liebe/r Kunde/in,\n\nunser Monitoring-System hat einen ungewöhnlich hohen Stromverbrauch in Ihrem Haushalt festgestellt:\n\n• Durchschnittlicher Verbrauch (November): 12,3 kWh/Tag\n• Aktueller Verbrauch (letzte 7 Tage): 14,5 kWh/Tag\n• Steigerung: +18%\n\nMögliche Ursachen:\n- Zusätzliche elektrische Geräte in Betrieb\n- Heizungsunterstützung bei kälteren Temperaturen\n- Defekte Geräte mit erhöhtem Stromverbrauch\n\nTipp: Prüfen Sie Ihre Geräte und nutzen Sie unseren Online-Verbrauchsrechner zur Analyse.",
  },
  {
    id: 4,
    title: "Netzprüfung erfolgreich abgeschlossen",
    description: "Die technische Prüfung für Ihre PV-Anlage wurde positiv beschieden",
    date: "28.11.2025",
    time: "11:20",
    type: "success",
    icon: CheckCircle,
    read: true,
    priority: "mittel",
    category: "Antrag",
    sender: "Netzbetreiber Regional",
    details: "Sehr geehrte Damen und Herren,\n\nwir freuen uns, Ihnen mitteilen zu können, dass die Netzverträglichkeitsprüfung für Ihre geplante PV-Anlage erfolgreich abgeschlossen wurde.\n\nPrüfungsergebnis:\n• Anschlusspunkt: Trafostation Musterstraße 15\n• Anschlussleistung: 8,5 kWp genehmigt\n• Netzverträglichkeit: Bestätigt\n• Messkonzept: Standardmessung mit intelligenten Messsystemen\n\nNächste Schritte:\n1. Auswahl und Beauftragung eines zertifizierten Installateurs\n2. Terminierung der Inbetriebnahme\n3. Anmeldung im Marktstammdatenregister\n\nBei Fragen stehen wir Ihnen gerne zur Verfügung.",
  },
  {
    id: 5,
    title: "Zählerwechsel erforderlich",
    description: "Ihr analoger Stromzähler muss bis zum 31.03.2025 durch einen digitalen Zähler ersetzt werden",
    date: "25.11.2025",
    time: "09:30",
    type: "info",
    icon: Wrench,
    read: true,
    priority: "hoch",
    category: "Zähler",
    sender: "Messstellenbetreiber",
    details: "Liebe Kundin, lieber Kunde,\n\nim Rahmen der Digitalisierung der Energiewende ist der Austausch Ihres analogen Stromzählers gegen einen modernen, digitalen Zähler erforderlich.\n\nWichtige Informationen:\n• Austauschtermin: bis spätestens 31.03.2025\n• Kosten: keine zusätzlichen Kosten für Sie\n• Dauer: ca. 30-45 Minuten\n• Kurze Stromunterbrechung während des Austauschs\n\nVorteile des digitalen Zählers:\n- Genauere Verbrauchsmessung\n- Fernauslesung möglich\n- Grundlage für Smart-Home-Anwendungen\n\nWir werden uns rechtzeitig mit Ihnen in Verbindung setzen, um einen Termin zu vereinbaren.",
  },
  {
    id: 6,
    title: "Neue Tarifoptionen verfügbar",
    description: "Entdecken Sie unsere neuen Stromtarife für PV-Anlagenbesitzer",
    date: "20.11.2025",
    time: "15:00",
    type: "info",
    icon: Zap,
    read: true,
    priority: "niedrig",
    category: "Tarife",
    sender: "Vertrieb & Marketing",
    details: "Liebe PV-Anlagenbesitzer,\n\nwir haben speziell für Sie neue, attraktive Tarifoptionen entwickelt:\n\n🌱 Grünstrom Plus:\n- 100% Ökostrom\n- Günstige kWh-Preise bei Eigenverbrauch über 60%\n- Bonus für Einspeisung in Schwachlastzeiten\n\n⚡ Smart Grid Tarif:\n- Variable Preise je nach Netzbelastung\n- App zur optimalen Verbrauchssteuerung\n- Bis zu 15% Ersparnis möglich\n\n💰 Communiy Tarif:\n- Teilen Sie Ihren Solarstrom mit Nachbarn\n- Höhere Vergütung als normale Einspeisung\n- Stärkung der lokalen Energiegemeinschaft\n\nInteresse? Kontaktieren Sie unseren Kundenservice oder nutzen Sie unseren Online-Tarifrechner.",
  },
];

const Nachrichten = () => {
  console.log("Nachrichten component is rendering");
  const [messages, setMessages] = useState(defaultMessages);
  const [selectedMessage, setSelectedMessage] = useState(defaultMessages[0]);
  const [filter, setFilter] = useState("alle");
  const [categoryFilter, setCategoryFilter] = useState("alle");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    reason: "",
    message: ""
  });

  // Lade Nachrichten aus localStorage oder verwende Default-Daten
  useEffect(() => {
    const saved = localStorage.getItem('userMessages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
        setSelectedMessage(parsed[0] || defaultMessages[0]);
      } catch {
        setMessages(defaultMessages);
        localStorage.setItem('userMessages', JSON.stringify(defaultMessages));
      }
    } else {
      localStorage.setItem('userMessages', JSON.stringify(defaultMessages));
    }
  }, []);

  // Speichere Änderungen in localStorage
  const updateMessages = (newMessages: typeof messages) => {
    setMessages(newMessages);
    localStorage.setItem('userMessages', JSON.stringify(newMessages));
  };

  // Nachricht als gelesen markieren
  const markAsRead = (messageId: number) => {
    const updated = messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    updateMessages(updated);
  };

  // Alle als gelesen markieren
  const markAllAsRead = () => {
    const updated = messages.map(msg => ({ ...msg, read: true }));
    updateMessages(updated);
  };

  // Nachricht archivieren (entfernen)
  const archiveMessage = (messageId: number) => {
    const updated = messages.filter(msg => msg.id !== messageId);
    updateMessages(updated);
    if (selectedMessage.id === messageId && updated.length > 0) {
      setSelectedMessage(updated[0]);
    }
  };

  // Gefilterte Nachrichten
  const filteredMessages = messages.filter(msg => {
    let matchesFilter = true;
    if (filter === "ungelesen") matchesFilter = !msg.read;
    if (filter === "wichtig") matchesFilter = msg.priority === "hoch";
    
    let matchesCategory = true;
    if (categoryFilter !== "alle") matchesCategory = msg.category === categoryFilter;
    
    return matchesFilter && matchesCategory;
  });

  // Alle verfügbaren Kategorien
  const availableCategories = [...new Set(messages.map(msg => msg.category))];

  // Neue Nachricht senden
  const sendMessage = () => {
    const messageData = {
      id: Date.now(),
      title: `Anfrage: ${newMessage.reason}`,
      description: newMessage.subject,
      date: new Date().toLocaleDateString('de-DE'),
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      type: "info",
      icon: MessageSquare,
      read: true,
      priority: "mittel",
      category: "Eigene Anfrage",
      sender: "Sie",
      details: `Anfrage an: ${newMessage.recipient}\nBetreff: ${newMessage.subject}\nGrund: ${newMessage.reason}\n\n${newMessage.message}`
    };
    
    const updated = [messageData, ...messages];
    updateMessages(updated);
    setSelectedMessage(messageData);
    setIsComposeOpen(false);
    setNewMessage({ recipient: "", subject: "", reason: "", message: "" });
  };

  // Ungelesene Nachrichten zählen
  const unreadCount = messages.filter(msg => !msg.read).length;

  const selectMessage = (message: typeof messages[0]) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Meine Benachrichtigungen</h1>
              <p className="text-muted-foreground">
                Alle wichtigen Mitteilungen auf einen Blick 
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount} ungelesen
                  </Badge>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  Alle als gelesen markieren
                </Button>
              )}
              <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Neue Nachricht
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Neue Nachricht senden</DialogTitle>
                    <DialogDescription>
                      Senden Sie eine Nachricht an Ihren Installateur oder Kundenbetreuer
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="recipient">An</Label>
                      <SelectComponent onValueChange={(value) => setNewMessage(prev => ({ ...prev, recipient: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Empfänger auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="installateur">Installateur (Müller GmbH)</SelectItem>
                          <SelectItem value="kundenbetreuer">Kundenbetreuer</SelectItem>
                        </SelectContent>
                      </SelectComponent>
                    </div>
                    <div>
                      <Label htmlFor="reason">Grund der Anfrage</Label>
                      <SelectComponent onValueChange={(value) => setNewMessage(prev => ({ ...prev, reason: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Grund auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Steuerliche Behandlung">Steuerliche Behandlung</SelectItem>
                          <SelectItem value="MaStR Registrierung">MaStR Registrierung</SelectItem>
                          <SelectItem value="Betreiberwechsel">Betreiberwechsel</SelectItem>
                          <SelectItem value="Rechnungskorrektur">Rechnungskorrektur</SelectItem>
                          <SelectItem value="Direktvermarktung">Direktvermarktung</SelectItem>
                          <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                        </SelectContent>
                      </SelectComponent>
                    </div>
                    <div>
                      <Label htmlFor="subject">Betreff</Label>
                      <input
                        id="subject"
                        className="w-full px-3 py-2 border border-border rounded-md"
                        placeholder="Kurze Beschreibung Ihres Anliegens"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Nachricht</Label>
                      <Textarea
                        id="message"
                        placeholder="Beschreiben Sie Ihr Anliegen detailliert..."
                        className="min-h-[120px]"
                        value={newMessage.message}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                        Abbrechen
                      </Button>
                      <Button 
                        onClick={sendMessage}
                        disabled={!newMessage.recipient || !newMessage.subject || !newMessage.reason || !newMessage.message}
                      >
                        Senden
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-2">
              <Button 
                variant={filter === "alle" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("alle")}
              >
                Alle ({messages.length})
              </Button>
              <Button 
                variant={filter === "ungelesen" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("ungelesen")}
              >
                Ungelesen ({unreadCount})
              </Button>
              <Button 
                variant={filter === "wichtig" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("wichtig")}
              >
                Wichtig ({messages.filter(m => m.priority === "hoch").length})
              </Button>
            </div>
            
            {/* Kategorie Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={categoryFilter === "alle" ? "default" : "outline"} 
                size="sm"
                onClick={() => setCategoryFilter("alle")}
              >
                Alle Kategorien
              </Button>
              {availableCategories.map(category => (
                <Button 
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category} ({messages.filter(m => m.category === category).length})
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {filteredMessages.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Archive className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Keine Nachrichten in dieser Kategorie</p>
                </CardContent>
              </Card>
            ) : (
              filteredMessages.map((message) => {
              const Icon = message.icon;
              return (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage.id === message.id ? "border-primary shadow-sm" : ""
                  } ${!message.read ? "border-l-4 border-l-blue-500" : ""}`}
                  onClick={() => selectMessage(message)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          message.type === "warning"
                            ? "bg-orange-100 dark:bg-orange-900/20"
                            : message.type === "success"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-blue-100 dark:bg-blue-900/20"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            message.type === "warning"
                              ? "text-orange-600 dark:text-orange-400"
                              : message.type === "success"
                              ? "text-green-600 dark:text-green-400"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <CardTitle className={`text-sm ${!message.read ? 'font-bold' : ''}`}>
                            {message.title}
                          </CardTitle>
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{message.date} • {message.time}</p>
                          <Badge 
                            variant={message.priority === "hoch" ? "destructive" : message.priority === "mittel" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {message.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">Von: {message.sender}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{message.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })
            )}
          </div>

          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedMessage.type === "warning"
                            ? "bg-orange-100 dark:bg-orange-900/20"
                            : selectedMessage.type === "success"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-blue-100 dark:bg-blue-900/20"
                        }`}
                      >
                        <selectedMessage.icon
                          className={`w-6 h-6 ${
                            selectedMessage.type === "warning"
                              ? "text-orange-600 dark:text-orange-400"
                              : selectedMessage.type === "success"
                              ? "text-green-600 dark:text-green-400"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{selectedMessage.title}</CardTitle>
                        <CardDescription className="mb-3">{selectedMessage.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>{selectedMessage.date} • {selectedMessage.time}</span>
                          <Badge 
                            variant={selectedMessage.priority === "hoch" ? "destructive" : selectedMessage.priority === "mittel" ? "default" : "secondary"}
                          >
                            {selectedMessage.category}
                          </Badge>
                          <Badge variant="outline">
                            {selectedMessage.priority} Priorität
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Von: {selectedMessage.sender}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      Archivieren
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {selectedMessage.details.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Wählen Sie eine Nachricht aus, um sie anzuzeigen</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nachrichten;
