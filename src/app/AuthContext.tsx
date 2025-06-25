import React, {useCallback, useEffect, useMemo, createContext } from "react";
//import { fetchFromBackend } from "../fetchBackend";
import { useNavigate } from "react-router";
import { createFetcher } from "../api/createFetcher";

type FetchFromBackendType = ReturnType<typeof createFetcher>["fetchFromBackend"];
type UnsafeFetchFromBackendType = ReturnType<typeof createFetcher>["unsafeFetchFromBackend"];

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    username: string | null;
    setUsername: (username: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    checkAuthentication: () => void;
    fetchFromBackend: FetchFromBackendType;
    unsafeFetchFromBackend: UnsafeFetchFromBackendType;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    const [token, setToken] = React.useState<string | null>(null);
    const [username, setUsername] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    

    const {fetchFromBackend, unsafeFetchFromBackend} = useMemo(() => createFetcher(token, navigate), [token, navigate])
    
    useEffect(() => {
        const initializeAuth = () => {
            if(token === null){
                const storedToken = localStorage.getItem("token");
                console.log("Stored Token:", storedToken);
                setToken(storedToken)
            }
            if(username === null){
                const storedUsername = localStorage.getItem("username");
                console.log("Stored Username:", storedUsername);
                setUsername(storedUsername)
            }
            setIsLoaded(true);
            console.log("Loading complete")
        }
        if (!isLoaded){
            initializeAuth();
            setIsLoaded(true);
        }
    });
    // useEffect(() => {
    //     if(token){
    //         console.log("Token and Username are set, checking authentication");
    //         checkAuthentication();
    //     }
    // }, [navigate])
    // useEffect(() => {
    //     if(isAuthenticated){
    //         console.log("User is authenticated, navigating to home");
    //         navigate("/home");
    //     }
    // }, [isAuthenticated, navigate])

    const checkAuthentication = useCallback(() => {
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
                    setToken(null);
                    setUsername(null);
                    setIsAuthenticated(false);
                }else{
                    throw new Error("Unexpected error when verifying authentification; status: " + response.status + " Message: " + response.message) 
                }
            })
    }, [token, navigate]);

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
        <AuthContext.Provider
            value={authContextValue}
        >
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