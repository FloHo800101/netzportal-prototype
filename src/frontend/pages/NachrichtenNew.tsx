import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  CheckCircle2, 
  FileText, 
  Calendar, 
  CreditCard, 
  Zap, 
  Newspaper,
  Clock,
  AlertTriangle,
  Check,
  X,
  Send,
  MessageSquare
} from "lucide-react";

// Dummy-Daten für verschiedene Kategorien
const notificationsData = {
  todo: [
    {
      id: 1,
      title: "Zählerstand melden",
      description: "Bitte teilen Sie uns Ihren Zählerstand bis zum 31.12.2025 mit.",
      deadline: "31.12.2025",
      daysLeft: 20,
      priority: "high",
      action: { label: "Jetzt melden", link: "/zaehlerstand" }
    },
    {
      id: 2,
      title: "Vertrag digital unterschreiben",
      description: "Ihr Netzanschlussvertrag wartet auf Ihre digitale Unterschrift.",
      deadline: "15.01.2026",
      daysLeft: 35,
      priority: "medium",
      action: { label: "Unterschreiben", link: "/meine-anschluesse" }
    },
    {
      id: 3,
      title: "Dokumente für Antrag nachreichen",
      description: "Für Ihren Antrag PV-Anlage fehlen noch Lageplan und Gebäudeplan.",
      deadline: "20.12.2025",
      daysLeft: 9,
      priority: "high",
      action: { label: "Dokumente hochladen", link: "/antraege" }
    }
  ],
  antraege: [
    {
      id: 10,
      title: "PV-Anlage Antrag genehmigt",
      description: "Ihr Antrag für die PV-Anlage (8,5 kWp) wurde genehmigt. Sie können nun mit der Installation beginnen.",
      date: "08.12.2025",
      time: "14:30",
      type: "success",
      read: false
    },
    {
      id: 11,
      title: "Netzprüfung in Bearbeitung",
      description: "Die Netzverträglichkeitsprüfung für Ihre Wallbox läuft. Ergebnis in ca. 5-7 Werktagen.",
      date: "05.12.2025",
      time: "09:15",
      type: "info",
      read: true
    }
  ],
  termine: [
    {
      id: 20,
      title: "Terminvorschlag: Inbetriebnahme PV-Anlage",
      description: "Installateur Müller GmbH schlägt Montag, 22.01.2025, 10:00-12:00 Uhr vor.",
      date: "10.12.2025",
      time: "16:45",
      type: "action",
      read: false,
      actions: [
        { label: "Zusagen", variant: "default" },
        { label: "Absagen", variant: "outline" }
      ]
    },
    {
      id: 21,
      title: "Termin bestätigt: Zählerwechsel",
      description: "Ihr Termin am 18.12.2025 um 14:00 Uhr wurde bestätigt.",
      date: "09.12.2025",
      time: "11:20",
      type: "success",
      read: true
    }
  ],
  rechnungen: [
    {
      id: 30,
      title: "Neue Rechnung verfügbar",
      description: "Ihre Rechnung für November 2025 (89,40 €) steht zum Download bereit.",
      date: "01.12.2025",
      time: "08:00",
      type: "info",
      read: false,
      action: { label: "Rechnung ansehen", link: "#" }
    },
    {
      id: 31,
      title: "Zahlung eingegangen",
      description: "Vielen Dank! Ihre Zahlung über 89,40 € wurde verbucht.",
      date: "28.11.2025",
      time: "10:15",
      type: "success",
      read: true
    }
  ],
  anlagen: [
    {
      id: 40,
      title: "Geplante Netzwartung in Ihrem Gebiet",
      description: "Kurzzeitige Stromunterbrechung am 25.01.2025 zwischen 09:00-12:00 Uhr.",
      date: "02.12.2025",
      time: "14:30",
      type: "warning",
      read: false
    },
    {
      id: 41,
      title: "PV-Anlage: Unterdurchschnittliche Leistung",
      description: "Ihre PV-Anlage hat in den letzten 7 Tagen 15% unter dem Durchschnitt produziert.",
      date: "30.11.2025",
      time: "08:15",
      type: "warning",
      read: true
    }
  ],
  news: [
    {
      id: 50,
      title: "Neue Förderprogramme für Wärmepumpen",
      description: "Ab 2025 gelten neue, attraktive Förderkonditionen für Wärmepumpen-Installation.",
      date: "05.12.2025",
      time: "10:00",
      type: "info",
      read: false
    },
    {
      id: 51,
      title: "Neue Tarifoptionen verfügbar",
      description: "Entdecken Sie unsere neuen Stromtarife für PV-Anlagenbesitzer mit bis zu 15% Ersparnis.",
      date: "20.11.2025",
      time: "15:00",
      type: "info",
      read: true
    }
  ],
  postausgang: [
    {
      id: 60,
      title: "Serviceanfrage: MaStR Registrierung",
      description: "Anfrage zur MaStR Registrierung für PV-Anlage (Zähler: 5555666677) gesendet.",
      date: "11.12.2025",
      time: "09:15",
      type: "service",
      status: "Wartend",
      recipient: "Kundenbetreuer"
    },
    {
      id: 61,
      title: "Terminanfrage: Beratung Direktvermarktung",
      description: "Terminanfrage für Beratungsgespräch zu Direktvermarktungsoptionen gestellt.",
      date: "10.12.2025",
      time: "14:20",
      type: "appointment",
      status: "In Bearbeitung",
      recipient: "Kundenbetreuer"
    },
    {
      id: 62,
      title: "Zählerstand gemeldet",
      description: "Zählerstand für Hausanschluss (1234567890): 12.543 kWh übermittelt.",
      date: "09.12.2025",
      time: "16:45",
      type: "meterreading",
      status: "Bestätigt",
      recipient: "Messstellenbetreiber"
    },
    {
      id: 63,
      title: "Serviceanfrage: Rechnungskorrektur",
      description: "Anfrage zur Korrektur der Rechnung vom November 2025 gesendet.",
      date: "05.12.2025",
      time: "11:30",
      type: "service",
      status: "Beantwortet",
      recipient: "Buchhaltung"
    }
  ]
};

const NachrichtenNew = () => {
  const [activeTab, setActiveTab] = useState("todo");
  const [eingangFilter, setEingangFilter] = useState("alle");
  const [notifications, setNotifications] = useState(notificationsData);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "text-green-600 bg-green-50";
      case "warning": return "text-orange-600 bg-orange-50";
      case "info": return "text-blue-600 bg-blue-50";
      case "action": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return <Badge variant="destructive">Dringend</Badge>;
    if (priority === "medium") return <Badge variant="outline">Normal</Badge>;
    return null;
  };

  const markAsRead = (category: string, id: number) => {
    setNotifications(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].map((item: any) =>
        item.id === id ? { ...item, read: true } : item
      )
    }));
  };

  const completeTodo = (id: number) => {
    setNotifications(prev => ({
      ...prev,
      todo: prev.todo.filter(item => item.id !== id)
    }));
  };

  const unreadCount = {
    todo: notifications.todo.length,
    postausgang: notifications.postausgang.length,
    eingang: notifications.antraege.filter(n => !n.read).length +
             notifications.termine.filter(n => !n.read).length +
             notifications.rechnungen.filter(n => !n.read).length +
             notifications.anlagen.filter(n => !n.read).length +
             notifications.news.filter(n => !n.read).length,
    // Für Filter-Badges
    antraege: notifications.antraege.filter(n => !n.read).length,
    termine: notifications.termine.filter(n => !n.read).length,
    rechnungen: notifications.rechnungen.filter(n => !n.read).length,
    anlagen: notifications.anlagen.filter(n => !n.read).length,
    news: notifications.news.filter(n => !n.read).length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meine Benachrichtigungen</h1>
          <p className="text-muted-foreground">Übersicht über Aufgaben, Mitteilungen und Neuigkeiten</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="todo" className="relative">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Zu erledigen
              {unreadCount.todo > 0 && (
                <Badge className="ml-2" variant="destructive">{unreadCount.todo}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="postausgang" className="relative">
              <Send className="w-4 h-4 mr-2" />
              Postausgang
              {unreadCount.postausgang > 0 && (
                <Badge className="ml-2" variant="secondary">{unreadCount.postausgang}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="eingang" className="relative">
              <FileText className="w-4 h-4 mr-2" />
              Eingang
              {unreadCount.eingang > 0 && (
                <Badge className="ml-2" variant="secondary">{unreadCount.eingang}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Zu erledigen Tab */}
          <TabsContent value="todo" className="space-y-4 mt-6">
            {notifications.todo.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Alles erledigt!</h3>
                  <p className="text-muted-foreground">Sie haben keine offenen Aufgaben.</p>
                </CardContent>
              </Card>
            ) : (
              notifications.todo.map((todo) => (
                <Card key={todo.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{todo.title}</CardTitle>
                          {getPriorityBadge(todo.priority)}
                        </div>
                        <CardDescription>{todo.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Frist: {todo.deadline}</span>
                      {todo.daysLeft <= 10 && (
                        <Badge variant="outline" className="ml-2">
                          {todo.daysLeft === 0 ? "Heute" : `in ${todo.daysLeft} Tagen`}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button onClick={() => window.location.href = todo.action.link}>
                      {todo.action.label}
                    </Button>
                    <Button variant="outline" onClick={() => completeTodo(todo.id)}>
                      <Check className="w-4 h-4 mr-2" />
                      Als erledigt markieren
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Postausgang Tab */}
          <TabsContent value="postausgang" className="space-y-4 mt-6">
            {notifications.postausgang.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Send className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Noch keine Anfragen gesendet</h3>
                  <p className="text-muted-foreground">Ihre gesendeten Serviceanfragen und Terminanfragen erscheinen hier.</p>
                </CardContent>
              </Card>
            ) : (
              notifications.postausgang.map((item) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case "Bestätigt": return "bg-green-100 text-green-800";
                    case "Beantwortet": return "bg-blue-100 text-blue-800";
                    case "In Bearbeitung": return "bg-yellow-100 text-yellow-800";
                    case "Wartend": return "bg-gray-100 text-gray-800";
                    default: return "bg-gray-100 text-gray-800";
                  }
                };

                const getTypeIcon = (type: string) => {
                  switch (type) {
                    case "service": return <MessageSquare className="w-5 h-5" />;
                    case "appointment": return <Calendar className="w-5 h-5" />;
                    case "meterreading": return <Zap className="w-5 h-5" />;
                    default: return <Send className="w-5 h-5" />;
                  }
                };

                const getTypeLabel = (type: string) => {
                  switch (type) {
                    case "service": return "Serviceanfrage";
                    case "appointment": return "Terminanfrage";
                    case "meterreading": return "Zählerstandsmeldung";
                    default: return "Anfrage";
                  }
                };

                return (
                  <Card key={item.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-1">
                                {getTypeLabel(item.type)}
                              </Badge>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                            </div>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Gesendet: {item.date} um {item.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          <span>An: {item.recipient}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details ansehen
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* Eingang Tab mit Filtern */}
          <TabsContent value="eingang" className="space-y-4 mt-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6 p-4 bg-muted/30 rounded-lg">
              <Button 
                variant={eingangFilter === "alle" ? "default" : "outline"} 
                size="sm"
                onClick={() => setEingangFilter("alle")}
              >
                Alle
                <Badge className="ml-2" variant="secondary">{unreadCount.eingang}</Badge>
              </Button>
              <Button 
                variant={eingangFilter === "antraege" ? "default" : "outline"} 
                size="sm"
                onClick={() => setEingangFilter("antraege")}
              >
                <FileText className="w-4 h-4 mr-1" />
                Anträge
                {unreadCount.antraege > 0 && (
                  <Badge className="ml-2" variant="secondary">{unreadCount.antraege}</Badge>
                )}
              </Button>
              <Button 
                variant={eingangFilter === "termine" ? "default" : "outline"} 
                size="sm"
                onClick={() => setEingangFilter("termine")}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Termine
                {unreadCount.termine > 0 && (
                  <Badge className="ml-2" variant="secondary">{unreadCount.termine}</Badge>
                )}
              </Button>
              <Button 
                variant={eingangFilter === "rechnungen" ? "default" : "outline"} 
                size="sm"
                onClick={() => setEingangFilter("rechnungen")}
              >
                <CreditCard className="w-4 h-4 mr-1" />
                Rechnungen
                {unreadCount.rechnungen > 0 && (
                  <Badge className="ml-2" variant="secondary">{unreadCount.rechnungen}</Badge>
                )}
              </Button>
              <Button 
                variant={eingangFilter === "anlagen" ? "default" : "outline"} 
                size="sm"
                onClick={() => setEingangFilter("anlagen")}
              >
                <Zap className="w-4 h-4 mr-1" />
                Anlagen
                {unreadCount.anlagen > 0 && (
                  <Badge className="ml-2" variant="secondary">{unreadCount.anlagen}</Badge>
                )}
              </Button>
              <Button 
                variant={eingangFilter === "news" ? "default" : "outline"} 
                size="sm"
                onClick={() => setEingangFilter("news")}
              >
                <Newspaper className="w-4 h-4 mr-1" />
                News
                {unreadCount.news > 0 && (
                  <Badge className="ml-2" variant="secondary">{unreadCount.news}</Badge>
                )}
              </Button>
            </div>

            {/* Anträge */}
            {(eingangFilter === "alle" || eingangFilter === "antraege") && notifications.antraege.map((item) => (
              <Card key={`eingang-antraege-${item.id}`} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        <FileText className="w-3 h-3 mr-1" />
                        Antrag
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                      {item.type === "info" && <FileText className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('antraege', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {/* Termine */}
            {(eingangFilter === "alle" || eingangFilter === "termine") && notifications.termine.map((item) => (
              <Card key={`eingang-termine-${item.id}`} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Termin
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type === "action" && <Calendar className="w-5 h-5" />}
                      {item.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                {item.actions && (
                  <CardContent className="flex gap-2">
                    {item.actions.map((action: any, idx: number) => (
                      <Button key={idx} variant={action.variant || "default"} size="sm">
                        {action.label}
                      </Button>
                    ))}
                  </CardContent>
                )}
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('termine', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {/* Rechnungen */}
            {(eingangFilter === "alle" || eingangFilter === "rechnungen") && notifications.rechnungen.map((item) => (
              <Card key={`eingang-rechnungen-${item.id}`} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        <CreditCard className="w-3 h-3 mr-1" />
                        Rechnung
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type === "info" && <CreditCard className="w-5 h-5" />}
                      {item.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                {item.action && (
                  <CardContent>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = item.action.link}>
                      {item.action.label}
                    </Button>
                  </CardContent>
                )}
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('rechnungen', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {/* Anlagen */}
            {(eingangFilter === "alle" || eingangFilter === "anlagen") && notifications.anlagen.map((item) => (
              <Card key={`eingang-anlagen-${item.id}`} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        <Zap className="w-3 h-3 mr-1" />
                        Anlage
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type === "warning" && <AlertTriangle className="w-5 h-5" />}
                      {item.type === "info" && <Zap className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('anlagen', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}

            {/* News */}
            {(eingangFilter === "alle" || eingangFilter === "news") && notifications.news.map((item) => (
              <Card key={`eingang-news-${item.id}`} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">
                        <Newspaper className="w-3 h-3 mr-1" />
                        News
                      </Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      <Newspaper className="w-5 h-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('news', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Anträge Tab */}
          <TabsContent value="antraege" className="space-y-4 mt-6">
            {notifications.antraege.map((item) => (
              <Card key={item.id} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                      {item.type === "info" && <FileText className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('antraege', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Termine Tab */}
          <TabsContent value="termine" className="space-y-4 mt-6">
            {notifications.termine.map((item) => (
              <Card key={item.id} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                </CardHeader>
                {item.actions && (
                  <CardContent>
                    <div className="flex gap-2">
                      {item.actions.map((action, idx) => (
                        <Button key={idx} variant={action.variant as any}>
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                )}
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('termine', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Rechnungen Tab */}
          <TabsContent value="rechnungen" className="space-y-4 mt-6">
            {notifications.rechnungen.map((item) => (
              <Card key={item.id} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                  </div>
                </CardHeader>
                {item.action && (
                  <CardContent>
                    <Button variant="outline" onClick={() => window.location.href = item.action.link}>
                      {item.action.label}
                    </Button>
                  </CardContent>
                )}
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('rechnungen', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Anlagen Tab */}
          <TabsContent value="anlagen" className="space-y-4 mt-6">
            {notifications.anlagen.map((item) => (
              <Card key={item.id} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      {item.type === "warning" && <AlertTriangle className="w-5 h-5" />}
                      {item.type === "info" && <Zap className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('anlagen', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-4 mt-6">
            {notifications.news.map((item) => (
              <Card key={item.id} className={!item.read ? "border-l-4 border-l-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                      <Newspaper className="w-5 h-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.date} um {item.time}</span>
                  </div>
                  {!item.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead('news', item.id)}>
                      Als gelesen markieren
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NachrichtenNew;
