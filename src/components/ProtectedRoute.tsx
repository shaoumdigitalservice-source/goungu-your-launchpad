import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { AppRole, useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface Props {
  children: ReactNode;
  roles?: AppRole[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { user, roles: userRoles, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (roles && roles.length > 0 && !roles.some((r) => userRoles.includes(r))) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl mb-2">Accès restreint</h1>
          <p className="text-muted-foreground">Cet espace est réservé aux profils : {roles.join(", ")}.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;