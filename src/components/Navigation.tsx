import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, Gauge, Bell, Calendar, TrendingUp, FileText } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/zaehlerstand", icon: Gauge, label: "Zählerstand" },
  { to: "/nachrichten", icon: Bell, label: "Nachrichten" },
  { to: "/termine", icon: Calendar, label: "Termine" },
  { to: "/verbrauch", icon: TrendingUp, label: "Verbrauch" },
  { to: "/antraege", icon: FileText, label: "Anträge" },
];

export const Navigation = () => {
  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Netzportal</span>
          </div>
          
          <div className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                activeClassName="bg-primary-light text-primary font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
