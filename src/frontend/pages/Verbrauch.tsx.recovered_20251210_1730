import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp, Zap } from "lucide-react";

const monthlyData = [
  { month: "Jul", verbrauch: 245, einspeisung: 0 },
  { month: "Aug", verbrauch: 238, einspeisung: 0 },
  { month: "Sep", verbrauch: 267, einspeisung: 0 },
  { month: "Okt", verbrauch: 289, einspeisung: 0 },
  { month: "Nov", verbrauch: 312, einspeisung: 0 },
  { month: "Dez", verbrauch: 334, einspeisung: 0 },
  { month: "Jan", verbrauch: 298, einspeisung: 125 },
];

const Verbrauch = () => {
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
            <CardTitle>Verbrauchsverlauf</CardTitle>
            <CardDescription>Monatlicher Energieverbrauch und Einspeisung der letzten 7 Monate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="verbrauch" name="Verbrauch" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="einspeisung" name="Einspeisung" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
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
      </div>
    </div>
  );
};

export default Verbrauch;
