const TOKEN = "1_4ALf8NHEKRoAfO54SXR89zJelvaYAAM8"; //TODO: only for Testing

interface FetchOptions {
  method: "GET" | "POST" | "DELETE";
  endpoint: string;
  body?: any;
}

// get api url from our text file (for deploying the backend with dynamic url (default is still http://localhost:3000))
async function fetchAPIURL(): Promise<string> {
  const response = await fetch('/api_endpoint.txt');

  return response.text();
}

export async function fetchFromBackend<T>({ method, endpoint, body }: FetchOptions): Promise<T> {
  const api_url = await fetchAPIURL();

  const response = await fetch(`${api_url}/${endpoint}`, {
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
