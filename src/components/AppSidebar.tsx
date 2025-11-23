import { LayoutDashboard, Gauge, Bell, Calendar, TrendingUp, FileText, User, Scale } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/zaehlerstand", icon: Gauge, label: "Zählerstand" },
  { to: "/nachrichten", icon: Bell, label: "Nachrichten" },
  { to: "/termine", icon: Calendar, label: "Termine" },
  { to: "/verbrauch", icon: TrendingUp, label: "Verbrauch" },
  { to: "/antraege", icon: FileText, label: "Anträge" },
  { to: "/meine-daten", icon: User, label: "Meine Daten" },
  { to: "/rechtliches", icon: Scale, label: "Rechtliches" },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

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
            <span className="text-xl font-semibold text-foreground">Netzportal</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
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
    </Sidebar>
  );
}
