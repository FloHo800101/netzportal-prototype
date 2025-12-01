import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type AppRole = "kunde" | "installateur" | "kundenbetreuer";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  activeRole: AppRole;
  setActiveRole: (role: AppRole) => void;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [activeRole, setActiveRole] = useState<AppRole>("kunde");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer role fetching
          setTimeout(async () => {
            try {
              const { data: roleData } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", session.user.id)
                .single();
              
              const fetchedRole = roleData?.role as AppRole || null;
              setRole(fetchedRole);
              if (fetchedRole) {
                setActiveRole(fetchedRole);
              }
            } catch (error) {
              console.error("Error fetching role:", error);
            }
          }, 0);
        } else {
          setRole(null);
          setActiveRole("kunde");
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          try {
            const { data: roleData } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .single();
            
            const fetchedRole = roleData?.role as AppRole || null;
            setRole(fetchedRole);
            if (fetchedRole) {
              setActiveRole(fetchedRole);
            }
          } catch (error) {
            console.error("Error fetching role:", error);
          }
          setLoading(false);
        }, 0);
      } else {
        setActiveRole("kunde");
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
    setActiveRole("kunde");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, session, role, activeRole, setActiveRole, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
