import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
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
import { ChatBotTaskDialog } from "../components/ChatBotTaskDialog";
import { ChatBot } from "../components/ChatBot";

// Rollenbasierte Dummy-Benachrichtigungen
export const notificationsByRole = {
  kunde: {
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
      // ...bestehende Einträge für Kunde...
    ],
    termine: [
      // ...bestehende Einträge für Kunde...
    ],
    rechnungen: [
      // ...bestehende Einträge für Kunde...
    ],
    anlagen: [
      // ...bestehende Einträge für Kunde...
    ],
    news: [
      // ...bestehende Einträge für Kunde...
    ],
    posteingang: [
      {
        id: 1001,
        title: "Vertragsbestätigung erhalten",
        description: "Ihr Netzanschlussvertrag wurde bestätigt. Sie finden das Dokument im Bereich 'Anschlüsse & Verträge'.",
        date: "10.12.2025",
        read: false
      },
      {
        id: 1002,
        title: "Neue Rechnung verfügbar",
        description: "Ihre Rechnung für November 2025 steht zum Download bereit.",
        date: "05.12.2025",
        read: true
      },
      {
        id: 1003,
        title: "Wartungsankündigung",
        description: "Am 20.12.2025 findet eine planmäßige Wartung im Netzgebiet statt. Es kann zu kurzen Unterbrechungen kommen.",
        date: "03.12.2025",
        read: false
      },
      {
        id: 1004,
        title: "Information zu neuem Tarif",
        description: "Ab Januar 2026 steht Ihnen ein neuer, günstigerer Stromtarif zur Verfügung.",
        date: "01.12.2025",
        read: true
      },
      {
        id: 1005,
        title: "Zählerwechsel angekündigt",
        description: "Ihr Stromzähler wird am 22.12.2025 durch einen digitalen Zähler ersetzt.",
        date: "30.11.2025",
        read: false
      }
    ],
    postausgang: [
      {
        id: 2001,
        title: "Zählerstand übermittelt",
        description: "Sie haben am 12.12.2025 einen neuen Zählerstand gemeldet.",
        date: "12.12.2025"
      },
      {
        id: 2002,
        title: "Dokumente für Antrag hochgeladen",
        description: "Sie haben am 09.12.2025 neue Dokumente für Ihren Antrag eingereicht.",
        date: "09.12.2025"
      }
    ],
  },
  installateur: {
    todo: [
      {
        id: 101,
        title: "Inbetriebnahme melden",
        description: "Bitte melden Sie die Inbetriebnahme der PV-Anlage (Kunde: Familie Sommer, Standort: Musterstraße 12) bis zum 20.12.2025.",
        deadline: "20.12.2025",
        daysLeft: 8,
        priority: "high",
        action: { label: "Jetzt melden", link: "/antraege/installateur" }
      },
      {
        id: 102,
        title: "Informationen zu Antrag nachreichen",
        description: "Bitte ergänzen Sie die technischen Daten zur Wallbox im Antrag von Herrn Winter (Standort: Hauptstraße 5).",
        deadline: "18.12.2025",
        daysLeft: 6,
        priority: "medium",
        action: { label: "Jetzt nachreichen", link: "/antraege/installateur" }
      },
      {
        id: 103,
        title: "Terminvorschlag für Inbetriebnahme erhalten",
        description: "Kunde Familie Herbst schlägt den 22.12.2025, 10:00 Uhr für die Inbetriebnahme vor.",
        deadline: "22.12.2025",
        daysLeft: 10,
        priority: "low",
        action: { label: "Termin bestätigen", link: "/termine" }
      }
    ],
    antraege: [
      // ...spezifische Einträge für Installateur...
    ],
    termine: [
      // ...spezifische Einträge für Installateur...
    ],
    rechnungen: [],
    anlagen: [],
    news: [],
    postausgang: [],
  },
  kundenbetreuer: {
    todo: [
      {
        id: 201,
        title: "Antrag prüfen",
        description: "Bitte prüfen Sie den neuen Antrag von Familie Sommer (PV-Anlage, 8,5 kWp).",
        deadline: "16.12.2025",
        daysLeft: 4,
        priority: "high",
        action: { label: "Antrag prüfen", link: "/antraege" }
      }
    ],
    antraege: [
      // ...spezifische Einträge für Kundenbetreuer...
    ],
    termine: [
      // ...spezifische Einträge für Kundenbetreuer...
    ],
    rechnungen: [],
    anlagen: [],
    news: [],
    postausgang: [],
  },
};

const NachrichtenNew = () => {
  const { activeRole } = useAuth();
  const [activeTab, setActiveTab] = useState("todo");
  const [eingangFilter, setEingangFilter] = useState("alle");
  const [notifications, setNotifications] = useState(notificationsByRole[activeRole]);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [chatBotContext, setChatBotContext] = useState("");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskType, setTaskType] = useState("");

  // Wenn sich die Rolle ändert, Benachrichtigungen neu laden
  useEffect(() => {
    setNotifications(notificationsByRole[activeRole]);
  }, [activeRole]);

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

  const handleChatBotTask = (type: string, context: string) => {
    setTaskType(type);
    setChatBotContext(context);
    setTaskDialogOpen(true);
  };

  const handleSendToChatBot = (question: string) => {
    setChatBotContext(question);
    setChatBotOpen(true);
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
                    <Button
                      className="ml-auto bg-gradient-to-r from-blue-500 to-fuchsia-600 text-white shadow-md hover:from-blue-600 hover:to-fuchsia-700"
                      onClick={() => {
                        // Aufgaben-Typ bestimmen
                        let type = "";
                        if (todo.title.toLowerCase().includes("zählerstand")) type = "zaehlerstand";
                        else if (todo.title.toLowerCase().includes("vertrag")) type = "vertrag";
                        else if (todo.title.toLowerCase().includes("dokument")) type = "dokumente";
                        handleChatBotTask(type, todo.title + " - " + todo.description);
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Fragen an den Chatbot
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

        <ChatBotTaskDialog
          open={taskDialogOpen}
          onClose={() => setTaskDialogOpen(false)}
          context={chatBotContext}
          taskType={taskType}
          onSend={handleSendToChatBot}
        />
        {chatBotOpen && (
          <ChatBot
            initialMessage={chatBotContext ? chatBotContext : undefined}
            onClose={() => setChatBotOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NachrichtenNew;
