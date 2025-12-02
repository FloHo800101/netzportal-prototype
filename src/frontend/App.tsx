import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleSwitcher } from "./components/RoleSwitcher";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Zaehlerstand from "./pages/Zaehlerstand";
import Nachrichten from "./pages/Nachrichten";
import NachrichtenTest from "./pages/NachrichtenTest";
import NachrichtenSimple from "./pages/NachrichtenSimple";
import Termine from "./pages/Termine";
import Verbrauch from "./pages/Verbrauch";
import Antraege from "./pages/Antraege";
import MeineDaten from "./pages/MeineDaten";
import MeineAnschluesse from "./pages/MeineAnschluesse";
import Rechtliches from "./pages/Rechtliches";
import Netzplanung from "./pages/Netzplanung";
import Netzkarte from "./pages/Netzkarte";
import NeueAnlage from "./pages/antrag/NeueAnlage";
import InstallerView from "./pages/antraege/InstallerView";
import AdminSetup from "./pages/AdminSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <div className="flex-1 flex flex-col">
                        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
                          <SidebarTrigger />
                          <div className="flex-1" />
                          <RoleSwitcher />
                        </header>
                        <main className="flex-1">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/zaehlerstand" element={<Zaehlerstand />} />
                            <Route path="/nachrichten-test" element={<NachrichtenTest />} />
                            <Route path="/nachrichten-simple" element={<NachrichtenSimple />} />
                            <Route path="/nachrichten" element={<NachrichtenSimple />} />
                            <Route path="/termine" element={<Termine />} />
                            <Route path="/verbrauch" element={<Verbrauch />} />
                            <Route path="/meine-anschluesse" element={<MeineAnschluesse />} />
                            <Route path="/antraege" element={<Antraege />} />
                            <Route path="/antraege/installateur" element={<InstallerView />} />
                            <Route path="/netzkarte" element={<Netzkarte />} />
                            <Route path="/netzplanung" element={<Netzplanung />} />
                            <Route path="/meine-daten" element={<MeineDaten />} />
                            <Route path="/rechtliches" element={<Rechtliches />} />
                            <Route path="/antrag/neue-anlage" element={<NeueAnlage />} />
                            <Route path="/admin/setup" element={<AdminSetup />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
