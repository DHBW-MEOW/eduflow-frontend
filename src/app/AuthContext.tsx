import React, {useCallback, useEffect, useMemo, createContext } from "react";
//import { useAuth } from "../../app/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { createFetcher } from "../api/createFetcher";

type FetchFromBackendType = ReturnType<typeof createFetcher>["fetchFromBackend"];
type UnsafeFetchFromBackendType = ReturnType<typeof createFetcher>["unsafeFetchFromBackend"];

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    const [token, setToken] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
    

    const {fetchFromBackend, unsafeFetchFromBackend} = useMemo(() => createFetcher(token, navigate), [token, navigate])
    
    const checkAuthentication = () => {
        console.log("Token:", token);
        if (token === null) {
            console.log("No token available, user is not authenticated");
            setIsAuthenticated(false);
            return;
        }
        console.log("Checking authentication with token:", token);
        unsafeFetchFromBackend({
            method: "GET",
            endpoint: "auth/verify-token",
        })
            .then((response) => {
                if(response.status === 200){
                    console.log("Authentication was verified sucessfully");
                    setIsAuthenticated(true);
                }else if(response.status === 401){
                    console.log("User is not authenticated");
                    //navigate("/");
                    //setToken(null);
                    //setUsername(null);
                    setIsAuthenticated(false);
                }else{
                    throw new Error("Unexpected error when verifying authentification; status: " + response.status + " Message: " + response.message) 
                }
            })
    };
    
    useEffect(() => {
        const initializeAuth = () => {
            const storedToken = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");

            if (storedToken) {
                console.log("Setting token from storage:", storedToken);
                setToken(storedToken);
            }

            if (storedUsername) {
                console.log("Setting username from storage:", storedUsername);
                setUsername(storedUsername);
            }

            setIsLoaded(true); // Ladezustand immer setzen
            console.log("Loading complete");
        };
        initializeAuth();
    }, []); // Läuft nur einmal

    useEffect(() => {
        if (isLoaded){
            console.log("Token and Username are set, checking authentication");
            checkAuthentication();
        }
    }, [location.pathname, isLoaded]) // maybe add token here

    //ROUTING LOGIK
    useEffect(() => {
        if (!isLoaded) {
            console.log("AuthProvider is not loaded yet, skipping navigation.");
            return;
        }

        if (isAuthenticated === null) {
            console.log("isAuthenticated is null, skipping navigation.");
            return;
        }

        const currenPath = location.pathname;
        console.log("Current path:", currenPath);
        console.log("Is authenticated:", isAuthenticated);

        if (isAuthenticated) {
            console.log("User is authenticated");
            if (currenPath === "/" || currenPath === "/login" || currenPath === "/register") {
                console.log("User is authenticated and currently on start area, navigating to home page");
                navigate("/home");
            }
        } else {
            console.log("User is not authenticated");
            if (currenPath !== "/" && currenPath !== "/login" && currenPath !== "/register") {
                console.log("User is not authenticated and currently not on start area, navigating to start page");
                navigate("/");
            }
        }
    }, [isAuthenticated, location.pathname, navigate]);



    // CREATING CONTEXT
    const authContextValue = useMemo(() => ({
        token,
        setToken,
        username,
        setUsername,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthentication,
        fetchFromBackend,
        unsafeFetchFromBackend,
        isLoaded
    }), [token, username, isAuthenticated, fetchFromBackend, unsafeFetchFromBackend, isLoaded]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}