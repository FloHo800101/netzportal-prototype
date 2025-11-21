import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const applications = [
  {
    id: "ANT-2025-001",
    title: "PV-Anlage 8,5 kWp",
    type: "Erzeugungsanlage",
    date: "12.01.2025",
    status: "In Prüfung",
    statusColor: "warning",
  },
  {
    id: "ANT-2024-287",
    title: "Leistungserhöhung Hausanschluss",
    type: "Leistungsänderung",
    date: "15.12.2024",
    status: "Freigegeben",
    statusColor: "success",
  },
];

const Antraege = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Anträge</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Anträge und Anmeldungen</p>
          </div>
          <Link to="/antrag/neue-anlage">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Neue Erzeugungsanlage anmelden
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{application.title}</CardTitle>
                      <CardDescription>
                        {application.type} • Antragsnummer: {application.id}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      application.statusColor === "success"
                        ? "default"
                        : application.statusColor === "warning"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      application.statusColor === "warning"
                        ? "bg-status-warning/10 text-status-warning border-status-warning"
                        : application.statusColor === "success"
                        ? "bg-status-success/10 text-status-success border-status-success"
                        : ""
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Eingereicht am {application.date}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Details ansehen
                    </Button>
                    <Button variant="outline" size="sm">
                      Status verfolgen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle>Weitere Antragsarten</CardTitle>
            <CardDescription>Weitere Dienstleistungen und Anträge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span>Hausanschluss</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span>Leistungsänderung</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span>Netzanschluss</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Antraege;
