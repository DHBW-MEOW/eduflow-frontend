import type { FetchFromBackendType } from "./createFetcher";

export const logout = async (unsafeFetchFromBackend: FetchFromBackendType) => {
  try {
    await unsafeFetchFromBackend({
      method: "POST",
      endpoint: "auth/logout",
      body: {},
    });
  } catch (err) {
    console.error("Logout not possible", err);
    throw err;
  }
};
