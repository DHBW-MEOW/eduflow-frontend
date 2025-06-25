import type { FetchFromBackendType } from "./createFetcher";

export const logout = async (fetchFromBackend: FetchFromBackendType) => {
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