import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const mockUseAuth = vi.fn();
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  it("affiche un loader tant que la session est en cours de chargement", () => {
    mockUseAuth.mockReturnValue({ user: null, roles: [], loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Contenu</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Contenu")).not.toBeInTheDocument();
  });

  it("redirige vers /auth si l'utilisateur n'est pas connecté", () => {
    mockUseAuth.mockReturnValue({ user: null, roles: [], loading: false });

    render(
      <MemoryRouter initialEntries={["/espace/admin"]}>
        <Routes>
          <Route
            path="/espace/admin"
            element={
              <ProtectedRoute>
                <div>Contenu admin</div>
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<div>Page de connexion</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Page de connexion")).toBeInTheDocument();
    expect(screen.queryByText("Contenu admin")).not.toBeInTheDocument();
  });

  it("affiche « Accès restreint » si le rôle de l'utilisateur ne correspond pas", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "jeune@goungue.com", role: "jeune" },
      roles: ["jeune"],
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute roles={["admin"]}>
          <div>Contenu admin</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/Accès restreint/)).toBeInTheDocument();
    expect(screen.queryByText("Contenu admin")).not.toBeInTheDocument();
  });

  it("affiche le contenu si l'utilisateur est connecté avec le bon rôle", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@goungue.com", role: "admin" },
      roles: ["admin"],
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute roles={["admin"]}>
          <div>Contenu admin</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Contenu admin")).toBeInTheDocument();
  });
});
