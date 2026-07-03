import { Construction } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import EspaceLayout, { Section } from "./EspaceLayout";
import { AppRole } from "@/contexts/AuthContext";

interface Props {
  title: string;
  role: string;
  roles: AppRole[];
  items: { to: string; label: string; icon: any }[];
  pageLabel: string;
}

const ComingSoon = ({ title, role, roles, items, pageLabel }: Props) => (
  <ProtectedRoute roles={roles}>
    <EspaceLayout title={title} role={role} items={items}>
      <Section title={pageLabel}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Construction className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="font-semibold mb-1">Cette section arrive bientôt</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Nous travaillons activement sur "{pageLabel}". Revenez prochainement pour découvrir cette fonctionnalité.
          </p>
        </div>
      </Section>
    </EspaceLayout>
  </ProtectedRoute>
);

export default ComingSoon;
