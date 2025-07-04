import React, { useEffect, useMemo, createContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { createFetcher } from "../api/createFetcher";

type FetchFromBackendType = ReturnType<
  typeof createFetcher
>["fetchFromBackend"];
type UnsafeFetchFromBackendType = ReturnType<
  typeof createFetcher
>["unsafeFetchFromBackend"];

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  username: string | null;
  setUsername: (username: string) => void;
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkAuthentication: () => void;
  fetchFromBackend: FetchFromBackendType;
  unsafeFetchFromBackend: UnsafeFetchFromBackendType;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const [token, setToken] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null,
  );

  const { fetchFromBackend, unsafeFetchFromBackend } = useMemo(
    () => createFetcher(isLoaded, isAuthenticated, token),
    [token, navigate, isAuthenticated],
  ); // Maybe add isLoaded but prob. not needed because it only changes when token also changes from null to some value

  const checkAuthentication = () => {
    if (token === null) {
      setIsAuthenticated(false);
      return;
    }
    unsafeFetchFromBackend({
      method: "GET",
      endpoint: "auth/verify-token",
    }).then((response) => {
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else if (response.status === 401) {
        setToken(null);
        setIsAuthenticated(false);
      } else {
        throw new Error(
          "Unexpected error when verifying authentification; status: " +
            response.status +
            " Message: " +
            response.message,
        );
      }
    });
  };

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUsername) {
        setUsername(storedUsername);
      }

      setIsLoaded(true); // Ladezustand immer setzen
    };
    initializeAuth();
  }, []); // Läuft nur einmal

  useEffect(() => {
    if (isLoaded) {
      checkAuthentication();
    }
  }, [location.pathname, isLoaded]); // maybe add token here

  //ROUTING LOGIK
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isAuthenticated === null) {
      return;
    }

    const currenPath = location.pathname;

    if (isAuthenticated) {
      if (
        currenPath === "/" ||
        currenPath === "/login" ||
        currenPath === "/register"
      ) {
        navigate("/home");
      }
    } else {
      if (
        currenPath !== "/" &&
        currenPath !== "/login" &&
        currenPath !== "/register"
      ) {
        navigate("/");
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // CREATING CONTEXT
  const authContextValue = useMemo(
    () => ({
      token,
      setToken,
      username,
      setUsername,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthentication,
      fetchFromBackend,
      unsafeFetchFromBackend,
      isLoaded,
    }),
    [
      token,
      username,
      isAuthenticated,
      fetchFromBackend,
      unsafeFetchFromBackend,
      isLoaded,
    ],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
