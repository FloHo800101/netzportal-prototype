import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

type MapPoint = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  desc: string;
  type: "stoerung" | "ausbau";
};

// sample points near Berlin — replace with real geo coordinates as needed
const POINTS: MapPoint[] = [
  { id: "p1", lat: 52.5208, lng: 13.4049, title: "Geplante Netzwartung", desc: "Geplante Versorgungstrennung am 03.12.2025, 08:00-10:00", type: "stoerung" },
  { id: "p2", lat: 52.515, lng: 13.35, title: "Netzausbau: Umspannstation", desc: "Neubau Umspannstation für Kapazitätserweiterung 2026", type: "ausbau" },
  { id: "p3", lat: 52.55, lng: 13.45, title: "Kurzfristige Störung", desc: "Lokale Störung — Team unterwegs", type: "stoerung" },
  { id: "p4", lat: 52.48, lng: 13.4, title: "Kabelverlegung", desc: "Neue Erdkabel für bessere Versorgungssicherheit ab März 2025", type: "ausbau" },
  { id: "p5", lat: 52.53, lng: 13.38, title: "Wartungsarbeiten", desc: "Routinemäßige Wartung am 05.12.2025, 14:00-16:00", type: "stoerung" },
];

export default function Netzkarte() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Interactive Map Component - Simplified version
  const InteractiveMap = () => (
    <div className="w-full h-[600px] rounded overflow-hidden relative bg-gradient-to-br from-blue-50 to-green-50">
      {!mapLoaded ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Karte wird geladen...</p>
          </div>
        </div>
      ) : (
        <>
          {/* SVG Map representation */}
          <div className="w-full h-full relative bg-gradient-to-br from-green-100 via-blue-50 to-green-200">
            {/* Street grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6b7280" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Rivers/waterways */}
            <svg className="absolute inset-0 w-full h-full">
              <path d="M0,300 Q200,280 400,300 T800,320" stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.6"/>
              <path d="M100,150 Q300,140 500,160 T900,180" stroke="#3b82f6" strokeWidth="4" fill="none" opacity="0.4"/>
            </svg>

            {/* Main roads */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="0" y1="200" x2="100%" y2="180" stroke="#6b7280" strokeWidth="3" opacity="0.7"/>
              <line x1="0" y1="400" x2="100%" y2="420" stroke="#6b7280" strokeWidth="3" opacity="0.7"/>
              <line x1="200" y1="0" x2="220" y2="100%" stroke="#6b7280" strokeWidth="3" opacity="0.7"/>
              <line x1="600" y1="0" x2="580" y2="100%" stroke="#6b7280" strokeWidth="3" opacity="0.7"/>
            </svg>

            {/* Network points */}
            {POINTS.map((point, index) => {
              // Convert lat/lng to pixel coordinates (simplified)
              const x = ((point.lng - 13.2) / 0.6) * 100; // percentage
              const y = ((52.6 - point.lat) / 0.15) * 100; // percentage
              const isActive = activeId === point.id;
              
              return (
                <div
                  key={point.id}
                  className={`absolute cursor-pointer transition-transform hover:scale-125 ${isActive ? 'scale-150' : ''}`}
                  style={{
                    left: `${Math.max(5, Math.min(90, x))}%`,
                    top: `${Math.max(10, Math.min(85, y))}%`,
                  }}
                  onClick={() => setActiveId(activeId === point.id ? null : point.id)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                      point.type === 'stoerung' ? 'bg-red-500' : 'bg-blue-500'
                    } ${isActive ? 'ring-4 ring-yellow-300' : ''}`}
                  >
                    <div className="w-full h-full rounded-full animate-ping opacity-20 bg-current"></div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border z-10 min-w-[200px]">
                      <h4 className="font-semibold text-sm text-gray-800">{point.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{point.desc}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">
                        {point.type === 'stoerung' ? '🔴 Störung/Wartung' : '🔵 Netzausbau'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm border">
        <h4 className="font-medium text-sm mb-2">Berlin Netzgebiet</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Störungen / Wartung</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Netzausbau</span>
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm border text-xs text-gray-600">
        <p>📍 Klicke auf die Punkte für Details</p>
      </div>
    </div>
  );

  // Simple fallback map using CSS Grid
  const MapFallback = () => (
    <div className="w-full h-[600px] bg-gray-100 rounded overflow-hidden relative">
      <div className="absolute inset-4 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold mb-4">Interaktive Netzkarte</h3>
          <div className="space-y-4">
            {POINTS.map((point) => (
              <div 
                key={point.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  point.type === 'stoerung' 
                    ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                } ${activeId === point.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveId(activeId === point.id ? null : point.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-sm">{point.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{point.desc}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    point.type === 'stoerung' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                </div>
                
                {activeId === point.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Koordinaten: {point.lat}, {point.lng}
                    </p>
                    <p className="text-xs text-gray-600">
                      Typ: {point.type === 'stoerung' ? 'Störung/Wartung' : 'Netzausbau'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm border">
        <h4 className="font-medium text-sm mb-2">Legende</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Störungen / Wartung</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Netzausbau</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Netzkarte</h1>
          <p className="text-muted-foreground">Geplante Störungen und Netzausbau in Ihrer Umgebung. Klicken Sie auf einen Punkt für Details.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Netzinformationen</CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveMap />
          </CardContent>
        </Card>

        {/* Status Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aktuelle Störungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {POINTS.filter(p => p.type === 'stoerung').map(point => (
                  <div key={point.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-sm">{point.title}</h4>
                      <p className="text-xs text-muted-foreground">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Geplanter Netzausbau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {POINTS.filter(p => p.type === 'ausbau').map(point => (
                  <div key={point.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <h4 className="font-medium text-sm">{point.title}</h4>
                      <p className="text-xs text-muted-foreground">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}