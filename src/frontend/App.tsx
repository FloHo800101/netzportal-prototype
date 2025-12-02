import { Toaster } from "@/frontend/components/ui/toaster";
import { Toaster as Sonner } from "@/frontend/components/ui/sonner";
import { TooltipProvider } from "@/frontend/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/frontend/components/ui/sidebar";
import { AppSidebar } from "@/frontend/components/AppSidebar";
import { AuthProvider } from "@/frontend/contexts/AuthContext";
import { ProtectedRoute } from "@/frontend/components/ProtectedRoute";
import { RoleSwitcher } from "@/frontend/components/RoleSwitcher";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Zaehlerstand from "./pages/Zaehlerstand";
import Nachrichten from "./pages/Nachrichten";
import Termine from "./pages/Termine";
import Verbrauch from "./pages/Verbrauch";
import Antraege from "./pages/Antraege";
import MeineDaten from "./pages/MeineDaten";
import Rechtliches from "./pages/Rechtliches";
import Netzplanung from "./pages/Netzplanung";
import NeueAnlage from "./pages/antrag/NeueAnlage";
import AdminSetup from "./pages/AdminSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
                            <Route path="/nachrichten" element={<Nachrichten />} />
                            <Route path="/termine" element={<Termine />} />
                            <Route path="/verbrauch" element={<Verbrauch />} />
                            <Route path="/antraege" element={<Antraege />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
