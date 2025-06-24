import { fetchFromBackend } from "../fetchBackend";

export const logout = async () => {
    try {
            await fetchFromBackend({
                method: "POST",
                endpoint: "auth/logout",
                body: {},
            });

        } catch (err) {
            console.error("Logout not possible", err);
            throw err;
        }
}