import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
} from "recharts";
import { TrendingDown, TrendingUp, Zap, ArrowLeft } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScenarioSimulator from "../components/ScenarioSimulator";
import { Button } from "../components/ui/button";

const monthlyData = [
  { month: "Jan", hausstrom: 120, wallbox: 48, waermepumpe: 130, einspeisung: 5, temp: 1, sun: 45 },
  { month: "Feb", hausstrom: 110, wallbox: 42, waermepumpe: 120, einspeisung: 10, temp: 3, sun: 70 },
  { month: "Mär", hausstrom: 115, wallbox: 46, waermepumpe: 100, einspeisung: 30, temp: 6, sun: 120 },
  { month: "Apr", hausstrom: 120, wallbox: 50, waermepumpe: 85, einspeisung: 60, temp: 10, sun: 160 },
  { month: "Mai", hausstrom: 130, wallbox: 56, waermepumpe: 75, einspeisung: 90, temp: 14, sun: 210 },
  { month: "Jun", hausstrom: 140, wallbox: 60, waermepumpe: 70, einspeisung: 120, temp: 17, sun: 240 },
  { month: "Jul", hausstrom: 120, wallbox: 60, waermepumpe: 65, einspeisung: 130, temp: 18, sun: 250 },
  { month: "Aug", hausstrom: 110, wallbox: 58, waermepumpe: 70, einspeisung: 120, temp: 19, sun: 220 },
  { month: "Sep", hausstrom: 130, wallbox: 50, waermepumpe: 87, einspeisung: 80, temp: 16, sun: 160 },
  { month: "Okt", hausstrom: 145, wallbox: 60, waermepumpe: 84, einspeisung: 40, temp: 11, sun: 100 },
  { month: "Nov", hausstrom: 160, wallbox: 72, waermepumpe: 80, einspeisung: 15, temp: 6, sun: 60 },
  { month: "Dez", hausstrom: 170, wallbox: 78, waermepumpe: 86, einspeisung: 5, temp: 2, sun: 40 },
];

// Generiere Tagesdaten für einen Monat basierend auf Monatswerten
const generateDailyData = (monthData: typeof monthlyData[0], daysInMonth: number) => {
  const dailyData = [];
  for (let day = 1; day <= daysInMonth; day++) {
    // Variiere die Tageswerte etwas (±20%)
    const variation = 0.8 + Math.random() * 0.4;
    dailyData.push({
      day: day.toString(),
      hausstrom: Math.round((monthData.hausstrom / daysInMonth) * variation * 10) / 10,
      wallbox: Math.round((monthData.wallbox / daysInMonth) * variation * 10) / 10,
      waermepumpe: Math.round((monthData.waermepumpe / daysInMonth) * variation * 10) / 10,
      einspeisung: Math.round((monthData.einspeisung / daysInMonth) * variation * 10) / 10,
      temp: monthData.temp + Math.round((Math.random() - 0.5) * 4)
    });
  }
  return dailyData;
};

const Verbrauch = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [showHausstrom, setShowHausstrom] = useState(true);
  const [showWallbox, setShowWallbox] = useState(true);
  const [showWaermepumpe, setShowWaermepumpe] = useState(true);
  const [showEinspeisung, setShowEinspeisung] = useState(true);
  const [showTemp, setShowTemp] = useState(true);

  const STORAGE_KEY = "verbrauch:visibility";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          if (typeof parsed.hausstrom === "boolean") setShowHausstrom(parsed.hausstrom);
          if (typeof parsed.wallbox === "boolean") setShowWallbox(parsed.wallbox);
          if (typeof parsed.waermepumpe === "boolean") setShowWaermepumpe(parsed.waermepumpe);
          if (typeof parsed.einspeisung === "boolean") setShowEinspeisung(parsed.einspeisung);
          if (typeof parsed.temp === "boolean") setShowTemp(parsed.temp);
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      const obj = {
        hausstrom: showHausstrom,
        wallbox: showWallbox,
        waermepumpe: showWaermepumpe,
        einspeisung: showEinspeisung,
        temp: showTemp,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (e) {}
  }, [showHausstrom, showWallbox, showWaermepumpe, showEinspeisung, showTemp]);

  const totalConsumption = useMemo(() => {
    return monthlyData.map((d) => ({
      ...d,
      verbrauch:
        (showHausstrom ? d.hausstrom : 0) + (showWallbox ? d.wallbox : 0) + (showWaermepumpe ? d.waermepumpe : 0),
    }));
  }, [showHausstrom, showWallbox, showWaermepumpe]);

  const totalDailyConsumption = useMemo(() => {
    return dailyData.map((d) => ({
      ...d,
      verbrauch:
        (showHausstrom ? d.hausstrom : 0) + (showWallbox ? d.wallbox : 0) + (showWaermepumpe ? d.waermepumpe : 0),
    }));
  }, [dailyData, showHausstrom, showWallbox, showWaermepumpe]);

  const navigate = useNavigate();

  // expose monthlyData for the month-detail page to read (quick hack for this prototype)
  useEffect(() => {
    try {
      (window as any).__VERBRAUCH_MONTHLY__ = monthlyData;
    } catch (e) {}
  }, []);

  const onMonthClick = (data: any) => {
    const monthData = monthlyData.find(m => m.month === data.month);
    if (monthData) {
      setSelectedMonth(data.month);
      // Bestimme Anzahl der Tage im Monat (vereinfacht)
      const daysInMonth = data.month === "Feb" ? 28 : 
                          ["Apr", "Jun", "Sep", "Nov"].includes(data.month) ? 30 : 31;
      setDailyData(generateDailyData(monthData, daysInMonth));
    }
  };

  const onBackToMonthly = () => {
    setSelectedMonth(null);
    setDailyData([]);
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Energieverbrauch</h1>
          <p className="text-muted-foreground">Übersicht Ihres Energieverbrauchs und Ihrer Einspeisung</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Verbrauch heute</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.2 kWh</div>
              <p className="text-xs text-status-warning flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +2.1% zum Vortag
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Verbrauch letzter Monat</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">298 kWh</div>
              <p className="text-xs text-status-success flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" />
                -10.8% zum Vormonat
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Einspeisung letzter Monat</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125 kWh</div>
              <p className="text-xs text-muted-foreground mt-1">Seit Inbetriebnahme PV-Anlage</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {selectedMonth ? `Tagesansicht ${selectedMonth}` : "Verbrauchsverlauf"}
                </CardTitle>
                <CardDescription>
                  {selectedMonth 
                    ? `Täglicher Energieverbrauch und Einspeisung im ${selectedMonth}` 
                    : "Monatlicher Energieverbrauch und Einspeisung der letzten 12 Monate"}
                </CardDescription>
              </div>
              {selectedMonth && (
                <Button variant="outline" size="sm" onClick={onBackToMonthly} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Monatsansicht
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <button
                className={`px-3 py-1 rounded-full text-sm ${showHausstrom ? "bg-chart-1 text-white" : "bg-muted-foreground text-foreground"}`}
                onClick={() => setShowHausstrom((s) => !s)}
              >
                Hausstrom
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${showWallbox ? "bg-chart-3 text-white" : "bg-muted-foreground text-foreground"}`}
                onClick={() => setShowWallbox((s) => !s)}
              >
                Wallbox
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${showWaermepumpe ? "bg-chart-4 text-white" : "bg-muted-foreground text-foreground"}`}
                onClick={() => setShowWaermepumpe((s) => !s)}
              >
                Wärmepumpe
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${showEinspeisung ? "bg-chart-2 text-white" : "bg-muted-foreground text-foreground"}`}
                onClick={() => setShowEinspeisung((s) => !s)}
              >
                Einspeisung
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${showTemp ? "bg-accent text-white" : "bg-muted-foreground text-foreground"}`}
                onClick={() => setShowTemp((s) => !s)}
              >
                Temperatur
              </button>
            </div>

            <ResponsiveContainer width="100%" height={420}>
              <ComposedChart data={selectedMonth ? totalDailyConsumption : totalConsumption}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey={selectedMonth ? "day" : "month"} className="text-xs" />
                <YAxis
                  className="text-xs"
                  yAxisId="left"
                  label={{ value: "kWh", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                  className="text-xs"
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "°C", angle: 90, position: "insideRight" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />

                {showHausstrom && (
                  <Bar 
                    dataKey="hausstrom" 
                    name="Hausstrom" 
                    stackId="a" 
                    fill="hsl(var(--chart-1))" 
                    radius={[4, 4, 0, 0]} 
                    yAxisId="left" 
                    onClick={(d: any) => !selectedMonth && onMonthClick(d)}
                    cursor={selectedMonth ? "default" : "pointer"}
                  />
                )}
                {showWallbox && (
                  <Bar 
                    dataKey="wallbox" 
                    name="Wallbox" 
                    stackId="a" 
                    fill="hsl(var(--chart-3))" 
                    radius={[4, 4, 0, 0]} 
                    yAxisId="left" 
                    onClick={(d: any) => !selectedMonth && onMonthClick(d)}
                    cursor={selectedMonth ? "default" : "pointer"}
                  />
                )}
                {showWaermepumpe && (
                  <Bar 
                    dataKey="waermepumpe" 
                    name="Wärmepumpe" 
                    stackId="a" 
                    fill="hsl(var(--chart-4))" 
                    radius={[4, 4, 0, 0]} 
                    yAxisId="left" 
                    onClick={(d: any) => !selectedMonth && onMonthClick(d)}
                    cursor={selectedMonth ? "default" : "pointer"}
                  />
                )}

                {showEinspeisung && (
                  <Bar 
                    dataKey="einspeisung" 
                    name="Einspeisung" 
                    fill="hsl(var(--chart-2))" 
                    radius={[4, 4, 0, 0]} 
                    yAxisId="left" 
                    onClick={(d: any) => !selectedMonth && onMonthClick(d)}
                    cursor={selectedMonth ? "default" : "pointer"}
                  />
                )}

                {showTemp && <Line type="monotone" dataKey="temp" name="Ø-Temperatur" stroke="hsl(var(--accent))" strokeWidth={2} yAxisId="right" />}
                <Line type="monotone" dataKey="sun" name="Sonnenstunden" stroke="#fbbf24" strokeWidth={2} yAxisId="right" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Geschätzte Kosten</CardTitle>
            <CardDescription>Basierend auf Ihrem aktuellen Verbrauch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Verbrauch Januar (298 kWh)</span>
                <span className="font-medium">89,40 €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Einspeisung Januar (125 kWh)</span>
                <span className="font-medium text-status-success">- 10,00 €</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="font-medium">Voraussichtliche Kosten</span>
                <span className="text-xl font-bold">79,40 €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <ScenarioSimulator />
      </div>
    </div>
  );
};

export default Verbrauch;
