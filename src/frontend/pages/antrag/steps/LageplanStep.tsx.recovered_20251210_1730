import { MapPin } from "lucide-react";

export const LageplanStep = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Bitte markieren Sie den Standort der Erzeugungsanlage auf dem Lageplan.
      </p>

      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
          alt="Lageplan Platzhalter"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 shadow-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Standort markieren</span>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MapPin className="w-12 h-12 text-primary drop-shadow-lg animate-bounce" fill="hsl(var(--primary))" />
        </div>
      </div>

      <div className="bg-primary-light rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-sm">Hinweis</h4>
        <p className="text-sm text-muted-foreground">
          In der finalen Version können Sie hier interaktiv den Standort auf einer Karte markieren.
          Für diesen Prototypen ist ein Platzhalter dargestellt.
        </p>
      </div>
    </div>
  );
};
