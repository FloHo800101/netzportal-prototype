import { useAuth } from "@/frontend/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/frontend/components/ui/select";
import { UserCog } from "lucide-react";

type AppRole = "kunde" | "installateur" | "kundenbetreuer";

const roleLabels: Record<AppRole, string> = {
  kunde: "Kunde",
  installateur: "Installateur",
  kundenbetreuer: "Kundenbetreuer",
};

export function RoleSwitcher() {
  const { activeRole, setActiveRole } = useAuth();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
      <UserCog className="w-4 h-4 text-muted-foreground" />
      <Select value={activeRole} onValueChange={(value) => setActiveRole(value as AppRole)}>
        <SelectTrigger className="w-[160px] h-8 border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="kunde">{roleLabels.kunde}</SelectItem>
          <SelectItem value="installateur">{roleLabels.installateur}</SelectItem>
          <SelectItem value="kundenbetreuer">{roleLabels.kundenbetreuer}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
