import { fetchFromBackend } from "../fetchBackend";

interface NewModuleResponse {
    id: number;
}

export const createNewModul = async (name: string): Promise<number> => {
    try {
            const response = await fetchFromBackend<NewModuleResponse>({
                method: "POST",
                endpoint: "data/course",
                body: {
                  id: null,
                  name: name
                },
            });

            if (typeof response.id === 'number') {
                return response.id;
            } else {
                throw new Error("No valid output from backend");
            }
        
        } catch (err) {
            console.error("Error while creating new Modul", err);
            throw err;
        }
}