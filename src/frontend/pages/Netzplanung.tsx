import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, User, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

const mockInstallateure = [
  {
    id: 1,
    name: "Elektro Müller GmbH",
    address: "Hauptstraße 123, 12345 Musterstadt",
    phone: "+49 123 456789",
    email: "info@elektro-mueller.de",
    specialties: ["PV-Anlagen", "Hausanschlüsse"],
    rating: 4.8,
  },
  {
    id: 2,
    name: "Solar & Service AG",
    address: "Sonnenallee 45, 12345 Musterstadt", 
    phone: "+49 123 987654",
    email: "kontakt@solar-service.de",
    specialties: ["Photovoltaik", "Energiespeicher"],
    rating: 4.7,
  },
  {
    id: 3,
    name: "Energietechnik Nord",
    address: "Windweg 78, 12345 Musterstadt",
    phone: "+49 123 555666",
    email: "service@energie-nord.de", 
    specialties: ["Netzanschlüsse", "Smart Meter"],
    rating: 4.9,
  },
  {
    id: 4,
    name: "Elektro Installation Plus",
    address: "Stromstraße 12, 12345 Musterstadt",
    phone: "+49 123 777888",
    email: "info@elektro-plus.de",
    specialties: ["Hausinstallation", "PV-Wartung"],
    rating: 4.6,
  },
  {
    id: 5,
    name: "Green Energy Solutions",
    address: "Ökoweg 99, 12345 Musterstadt", 
    phone: "+49 123 444555",
    email: "hello@green-energy.de",
    specialties: ["Erneuerbare Energien", "Beratung"],
    rating: 4.8,
  },
];

const Netzplanung = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInstallateure, setFilteredInstallateure] = useState(mockInstallateure);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredInstallateure(mockInstallateure);
    } else {
      const filtered = mockInstallateure.filter(installateur =>
        installateur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        installateur.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        installateur.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredInstallateure(filtered);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Netzplanung</h1>
          <p className="text-muted-foreground">Installateur-Suche und Netzwerkplanung</p>
        </div>

        {/* Installateur Suche */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Installateur-Suche
            </CardTitle>
            <CardDescription>
              Finden Sie qualifizierte Installateure in Ihrer Nähe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Suchen nach Name, Ort oder Spezialisierung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="gap-2">
                <Search className="w-4 h-4" />
                Suchen
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {filteredInstallateure.length} Installateure gefunden
              </p>
              
              {filteredInstallateure.map((installateur) => (
                <Card key={installateur.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{installateur.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <span>⭐</span>
                              <span>{installateur.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{installateur.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{installateur.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{installateur.email}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {installateur.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-light text-primary text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="default" size="sm">
                          Kontaktieren
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Netzplanung Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Netzausbau planen</CardTitle>
              <CardDescription>Neue Netzabschnitte und Erweiterungen</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Planung starten</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kapazitäten prüfen</CardTitle>
              <CardDescription>Verfügbare Netzkapazitäten analysieren</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Analyse starten</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wartungsplanung</CardTitle>
              <CardDescription>Geplante Wartungsarbeiten verwalten</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Termine planen</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Netzplanung;