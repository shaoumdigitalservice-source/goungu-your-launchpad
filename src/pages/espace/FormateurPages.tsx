import { GraduationCap, Users, BookOpen, Calendar, User } from "lucide-react";
import ComingSoon from "./ComingSoon";

const items = [
  { to: "/espace/formateur", label: "Tableau de bord", icon: GraduationCap },
  { to: "/espace/formateur/cohortes", label: "Cohortes", icon: Users },
  { to: "/espace/formateur/modules", label: "Modules", icon: BookOpen },
  { to: "/espace/formateur/agenda", label: "Agenda", icon: Calendar },
  { to: "/espace/profil", label: "Mon profil", icon: User },
];

export const FormateurCohortes = () => <ComingSoon title="Cohortes" role="Formateur" roles={["formateur", "admin"]} items={items} pageLabel="Cohortes" />;
export const FormateurModules = () => <ComingSoon title="Modules" role="Formateur" roles={["formateur", "admin"]} items={items} pageLabel="Modules" />;
export const FormateurAgenda = () => <ComingSoon title="Agenda" role="Formateur" roles={["formateur", "admin"]} items={items} pageLabel="Agenda" />;
