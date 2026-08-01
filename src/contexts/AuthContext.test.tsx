import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Sonde qui expose l'état du contexte pour les assertions.
function Probe() {
  const { user, loading, signOut } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user ? user.email : "none"}</span>
      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("charge le profil via le cookie de session au montage (pas de localStorage)", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ email: "jeune@goungue.com", prenom: "J", nom: "N", role: "jeune" }),
    });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId("loading").textContent).toBe("false"));
    expect(screen.getByTestId("user").textContent).toBe("jeune@goungue.com");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/utilisateurs/moi"),
      expect.objectContaining({ credentials: "include" })
    );
  });

  it("reste déconnecté si le cookie est absent ou invalide (401)", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ ok: false, status: 401 });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId("loading").textContent).toBe("false"));
    expect(screen.getByTestId("user").textContent).toBe("none");
  });

  it("signOut appelle /session/logout (credentials include) puis vide la session locale", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ email: "jeune@goungue.com", prenom: "J", nom: "N", role: "jeune" }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ message: "Déconnecté" }) });

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );
    await waitFor(() => expect(screen.getByTestId("user").textContent).toBe("jeune@goungue.com"));

    await act(async () => {
      screen.getByText("logout").click();
    });

    await waitFor(() => expect(screen.getByTestId("user").textContent).toBe("none"));
    expect(fetchMock).toHaveBeenLastCalledWith(
      expect.stringContaining("/session/logout"),
      expect.objectContaining({ method: "POST", credentials: "include" })
    );
  });
});
