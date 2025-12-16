import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sun, Cloud, CloudRain, Zap, Clock, Waves, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface HourlyData {
  hour: string;
  weather: "sunny" | "cloudy" | "rainy";
  temp: number;
  production: number;
  baseConsumption: number;
  heatPump?: number;
  wallbox?: number;
  washing?: boolean;
  netBalance: number;
  recommendation: "ideal" | "good" | "avoid";
}

// Mock data for next 3 days, hourly
const mockHourlyData: HourlyData[] = [
  // Tag 1 (Heute)
  { hour: "06:00", weather: "cloudy", temp: 2, production: 0, baseConsumption: 1.2, heatPump: 2.5, netBalance: -3.7, recommendation: "avoid" },
  { hour: "07:00", weather: "cloudy", temp: 3, production: 0.5, baseConsumption: 1.8, heatPump: 2.8, netBalance: -4.1, recommendation: "avoid" },
  { hour: "08:00", weather: "sunny", temp: 5, production: 2.2, baseConsumption: 2.1, heatPump: 2.5, netBalance: -2.4, recommendation: "good" },
  { hour: "09:00", weather: "sunny", temp: 8, production: 4.5, baseConsumption: 1.9, heatPump: 1.8, netBalance: 0.8, recommendation: "ideal" },
  { hour: "10:00", weather: "sunny", temp: 10, production: 6.8, baseConsumption: 1.7, heatPump: 1.5, netBalance: 3.6, recommendation: "ideal" },
  { hour: "11:00", weather: "sunny", temp: 12, production: 8.2, baseConsumption: 1.6, heatPump: 1.2, netBalance: 5.4, recommendation: "ideal" },
  { hour: "12:00", weather: "sunny", temp: 14, production: 9.1, baseConsumption: 1.5, heatPump: 1.0, netBalance: 6.6, recommendation: "ideal" },
  { hour: "13:00", weather: "sunny", temp: 15, production: 8.9, baseConsumption: 1.4, heatPump: 0.8, netBalance: 6.7, recommendation: "ideal" },
  { hour: "14:00", weather: "cloudy", temp: 14, production: 6.2, baseConsumption: 1.6, heatPump: 1.1, netBalance: 3.5, recommendation: "ideal" },
  { hour: "15:00", weather: "cloudy", temp: 12, production: 3.8, baseConsumption: 1.8, heatPump: 1.5, netBalance: 0.5, recommendation: "good" },
  { hour: "16:00", weather: "cloudy", temp: 10, production: 1.9, baseConsumption: 2.2, heatPump: 2.0, netBalance: -2.3, recommendation: "avoid" },
  { hour: "17:00", weather: "cloudy", temp: 8, production: 0.8, baseConsumption: 2.8, heatPump: 2.5, netBalance: -4.5, recommendation: "avoid" },
];

const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case "sunny": return <Sun className="w-4 h-4 text-yellow-500" />;
    case "cloudy": return <Cloud className="w-4 h-4 text-gray-500" />;
    case "rainy": return <CloudRain className="w-4 h-4 text-blue-500" />;
    default: return <Sun className="w-4 h-4" />;
  }
};

const getRecommendationColor = (rec: string) => {
  switch (rec) {
    case "ideal": return "bg-green-100 text-green-700 border-green-300";
    case "good": return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "avoid": return "bg-red-100 text-red-700 border-red-300";
    default: return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

export default function ScenarioSimulator() {
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [washingScheduled, setWashingScheduled] = useState<string[]>([]);

  const scheduleWashing = (hour: string) => {
    if (washingScheduled.includes(hour)) {
      setWashingScheduled(washingScheduled.filter(h => h !== hour));
    } else {
      setWashingScheduled([...washingScheduled, hour]);
    }
  };

  const getOptimalHours = () => {
    return mockHourlyData
      .filter(d => d.recommendation === "ideal")
      .slice(0, 3)
      .map(d => d.hour);
  };

  const optimalHours = getOptimalHours();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Szenariosimulation
        </CardTitle>
        <CardDescription>
          Für heute: Wetter, Stromerzeugung und -verbrauch. Optimieren Sie den Zeitpunkt für energieintensive Geräte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Optimal times summary */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Optimale Zeiten heute</h4>
                <p className="text-sm text-green-700 mt-1">
                  Beste Zeiten für Waschmaschine: {optimalHours.join(", ")} (höchste Eigenverbrauchsquote)
                </p>
                <div className="flex gap-2 mt-2">
                  {optimalHours.map((hour) => (
                    <Button
                      key={hour}
                      size="sm"
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-100"
                      onClick={() => scheduleWashing(hour)}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {hour}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hourly forecast table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Zeit</th>
                  <th className="text-left py-2 px-2">Wetter</th>
                  <th className="text-left py-2 px-2">Temp</th>
                  <th className="text-left py-2 px-2">Erzeugung</th>
                  <th className="text-left py-2 px-2">Verbrauch</th>
                  <th className="text-left py-2 px-2">Bilanz</th>
                  <th className="text-left py-2 px-2">Empfehlung</th>
                  <th className="text-left py-2 px-2">Waschmaschine</th>
                </tr>
              </thead>
              <tbody>
                {mockHourlyData.slice(0, 12).map((data, idx) => {
                  const totalConsumption = data.baseConsumption + (data.heatPump || 0) + (data.wallbox || 0);
                  const isScheduled = washingScheduled.includes(data.hour);
                  
                  return (
                    <tr 
                      key={idx} 
                      className={`border-b hover:bg-gray-50 cursor-pointer ${selectedHour === data.hour ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedHour(selectedHour === data.hour ? null : data.hour)}
                    >
                      <td className="py-2 px-2 font-medium">{data.hour}</td>
                      <td className="py-2 px-2">{getWeatherIcon(data.weather)}</td>
                      <td className="py-2 px-2">{data.temp}°C</td>
                      <td className="py-2 px-2 text-green-600">{data.production.toFixed(1)} kW</td>
                      <td className="py-2 px-2">{totalConsumption.toFixed(1)} kW</td>
                      <td className={`py-2 px-2 font-medium ${data.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.netBalance >= 0 ? '+' : ''}{data.netBalance.toFixed(1)} kW
                      </td>
                      <td className="py-2 px-2">
                        <Badge className={getRecommendationColor(data.recommendation)}>
                          {data.recommendation === 'ideal' ? 'Optimal' : 
                           data.recommendation === 'good' ? 'Gut' : 'Vermeiden'}
                        </Badge>
                      </td>
                      <td className="py-2 px-2">
                        <Button
                          size="sm"
                          variant={isScheduled ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            scheduleWashing(data.hour);
                          }}
                        >
                          <Waves className="w-3 h-3 mr-1" />
                          {isScheduled ? 'Geplant' : 'Timer'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected hour details */}
          {selectedHour && (() => {
            const hourData = mockHourlyData.find(d => d.hour === selectedHour);
            if (!hourData) return null;
            
            return (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Details für {selectedHour}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Wetter:</span>
                    <div className="flex items-center gap-1 mt-1">
                      {getWeatherIcon(hourData.weather)}
                      <span>{hourData.temp}°C</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">PV-Erzeugung:</span>
                    <div className="text-green-600 font-medium">{hourData.production.toFixed(1)} kW</div>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Grundlast:</span>
                    <div>{hourData.baseConsumption.toFixed(1)} kW</div>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Wärmepumpe:</span>
                    <div>{(hourData.heatPump || 0).toFixed(1)} kW</div>
                  </div>
                </div>
                
                {hourData.recommendation === 'avoid' && (
                  <div className="mt-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                    <span className="text-sm text-orange-700">
                      Hoher Netzbezug erwartet. Energieintensive Geräte nach Möglichkeit verschieben.
                    </span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Scheduled washing summary */}
          {washingScheduled.length > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Geplante Waschgänge</h4>
              <div className="flex flex-wrap gap-2">
                {washingScheduled.map(hour => (
                  <Badge key={hour} variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Waves className="w-3 h-3 mr-1" />
                    {hour}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                Geschätzte Ersparnis: ~{(washingScheduled.length * 0.4).toFixed(1)} € bei optimalem Timing
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}