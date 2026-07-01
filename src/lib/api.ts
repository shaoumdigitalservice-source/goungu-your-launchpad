const API_BASE_URL = "http://localhost:8082/api";

export async function envoyerCandidature(data: {
  name: string;
  email: string;
  phone: string;
  programme: string;
  motivation: string;
}) {
  const response = await fetch(`${API_BASE_URL}/candidatures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de la candidature");
  }

  return response.json();
}

export async function envoyerMessageContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi du message");
  }

  return response.json();
}