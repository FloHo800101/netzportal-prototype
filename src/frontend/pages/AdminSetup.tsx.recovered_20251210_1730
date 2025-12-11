import { useState } from "react";
import { Button } from "@/frontend/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/frontend/components/ui/card";
import { useToast } from "@/frontend/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface SetupResult {
  email: string;
  action: string;
  error?: string;
  userId?: string;
  role?: string;
}

export default function AdminSetup() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SetupResult[]>([]);
  const { toast } = useToast();

  const setupTestUsers = async () => {
    setLoading(true);
    setResults([]);

    try {
      const { data, error } = await supabase.functions.invoke('setup-test-users', {
        body: {}
      });

      if (error) throw error;

      setResults(data.results || []);
      
      const successCount = data.results?.filter((r: SetupResult) => r.action === 'created').length || 0;
      const errorCount = data.results?.filter((r: SetupResult) => r.action === 'error').length || 0;

      if (errorCount === 0) {
        toast({
          title: "Erfolg!",
          description: `${successCount} Test-User erfolgreich erstellt.`,
        });
      } else {
        toast({
          title: "Teilweise erfolgreich",
          description: `${successCount} erstellt, ${errorCount} Fehler.`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Fehler:', error);
      toast({
        title: "Fehler",
        description: error.message || "Fehler beim Einrichten der Test-User",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Test-User Einrichtung</CardTitle>
          <CardDescription>
            Erstellen Sie die drei Test-User für das Portal mit einem Klick
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Folgende Test-User werden erstellt:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-2 py-1 rounded">mueller@test.de</span>
                  <span className="text-muted-foreground">Rolle: Kunde</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-2 py-1 rounded">schmidt@test.de</span>
                  <span className="text-muted-foreground">Rolle: Installateur</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-2 py-1 rounded">weber@test.de</span>
                  <span className="text-muted-foreground">Rolle: Kundenbetreuer</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Passwort für alle: <span className="font-mono bg-muted px-2 py-1 rounded">test123</span>
              </p>
            </div>

            <Button 
              onClick={setupTestUsers} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Test-User jetzt einrichten
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Ergebnisse:</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 border rounded-lg p-3"
                  >
                    {result.action === 'created' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-mono text-sm">{result.email}</div>
                      {result.action === 'created' ? (
                        <div className="text-sm text-muted-foreground">
                          Erfolgreich erstellt • Rolle: {result.role}
                        </div>
                      ) : result.action === 'deleted_existing' ? (
                        <div className="text-sm text-muted-foreground">
                          Bestehender User gelöscht
                        </div>
                      ) : (
                        <div className="text-sm text-destructive">
                          Fehler: {result.error}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
