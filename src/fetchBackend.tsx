const API_URL = "http://localhost:3000";
const TOKEN = "1_UC9KTzb9PrVCQH9QtXx4LT7J6jq6pfFV"; //TODO: only for Testing

interface FetchOptions {
  method: "GET" | "POST" | "DELETE";
  endpoint: string;
  body?: any;
}

export async function fetchFromBackend<T>({ method, endpoint, body }: FetchOptions): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Fehler beim Abrufen (${method} ${endpoint}): ${response.status}`);
  }

  return response.json();
}
