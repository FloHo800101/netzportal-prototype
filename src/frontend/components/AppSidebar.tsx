import { LayoutDashboard, Gauge, Bell, Calendar, TrendingUp, FileText, User, Scale, LogOut, Network } from "lucide-react";
import { NavLink } from "@/frontend/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/frontend/contexts/AuthContext";
import { Button } from "@/frontend/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/frontend/components/ui/sidebar";

type AppRole = "kunde" | "installateur" | "kundenbetreuer";

const navigationItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true, roles: ["kunde", "installateur", "kundenbetreuer"] as AppRole[] },
  { to: "/zaehlerstand", icon: Gauge, label: "Zählerstand", roles: ["kunde"] as AppRole[] },
  { to: "/nachrichten", icon: Bell, label: "Nachrichten", roles: ["kunde", "installateur", "kundenbetreuer"] as AppRole[] },
  { to: "/termine", icon: Calendar, label: "Termine", roles: ["kunde", "installateur", "kundenbetreuer"] as AppRole[] },
  { to: "/verbrauch", icon: TrendingUp, label: "Verbrauch", roles: ["kunde"] as AppRole[] },
  { to: "/antraege", icon: FileText, label: "Anträge", roles: ["kunde", "installateur", "kundenbetreuer"] as AppRole[] },
  { to: "/netzplanung", icon: Network, label: "Netzplanung", roles: ["kundenbetreuer"] as AppRole[] },
  { to: "/meine-daten", icon: User, label: "Meine Daten", roles: ["kunde", "installateur", "kundenbetreuer"] as AppRole[] },
  { to: "/rechtliches", icon: Scale, label: "Rechtliches", roles: ["kunde"] as AppRole[] },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { user, activeRole, signOut } = useAuth();

  const isActive = (path: string, end?: boolean) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground">Netzportal</span>
              <span className="text-xs text-muted-foreground">v2.1.0</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems
                .filter((item) => item.roles.includes(activeRole))
                .map((item) => {
                  const active = isActive(item.to, item.end);
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton asChild isActive={active}>
                        <NavLink
                          to={item.to}
                          end={item.end}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          activeClassName="bg-primary-light text-primary font-medium"
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span>{item.label}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          {open && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
            title="Abmelden"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
