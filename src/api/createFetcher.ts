import type { NavigateFunction } from "react-router";

interface FetchOptions {
  method: "GET" | "POST" | "DELETE";
  endpoint: string;
  body?: any;
}

async function fetchAPIURL(): Promise<string> {
  const response = await fetch('/api_endpoint.txt');

  return response.text();
}


export type FetchFromBackendType = ReturnType<typeof createFetcher>["fetchFromBackend"];

export const createFetcher = (isLoaded: boolean, isAuthenticated: boolean | null, token: string | null, navigate: NavigateFunction) => {
    async function fetchFromBackend<T>({ method, endpoint, body }: FetchOptions): Promise<T> {
        if(!isLoaded || !isAuthenticated){
          console.log("stopping fecht because it is not loaded")
          console.log("isLoaded: ", isLoaded, " isAuthenticated: ", isAuthenticated)
          return Promise.resolve([] as T);
        }
        const api = await fetchAPIURL();
        console.log("Starting Fetch")
        const response = await fetch(`${api}/${endpoint}`, {
            method,
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
           },
           body: body ? JSON.stringify(body) : undefined,
         });
         if(response.status == 401 && !isLoaded){
          console.log("My special case has happend!!!!")
          console.log(Promise.resolve([] as T));
          return Promise.resolve([] as T);
         }else if (!response.ok) {
           throw new Error(`Error when calling (${method} ${endpoint}): ${response.status}`);
         }
         
         //console.log("Answer: ", response.json());
         return response.json();
    }
    async function unsafeFetchFromBackend({ method, endpoint, body }: FetchOptions): Promise<T> {
        const api = await fetchAPIURL();
        
        const response = await fetch(`${api}/${endpoint}`, {
            method,
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
           },
           body: body ? JSON.stringify(body) : undefined,
         });
        return response;
    }

    return { fetchFromBackend, unsafeFetchFromBackend } ;
};