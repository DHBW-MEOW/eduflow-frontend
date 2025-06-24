import { StrictMode, useContext, useState, createContext, useEffect } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import ReactDOM from 'react-dom/client';
import { Outlet } from "react-router"
import { fetchFromBackend } from './fetchBackend.tsx';
import { useNavigate } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <html lang="en">
//     <head>
//       <meta charSet="UTF-8" />
//       <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Vite + React + TS</title>
//     </head>
//     <body>
//       <div id="root"></div>
//       <script type="module" src="/src/root.tsx"></script>
//     </body>
//   </html>
// 
// )
// 

type AccountContextType = {
  authenticated: boolean;
  checkAuthentication?: () => void;
  token: string | undefined;
};

const AccountContext = createContext<AccountContextType>({
  authenticated: false,
  checkAuthentication: () => {},
  token: undefined
});

export default function Root() {
  const navigation = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  // Runs when the component mounts to the dom
  useEffect(() => {
    if(token !== undefined) {
      console.log("Token is set, user is authenticated");
      checkAuthentication();
      return;
    }
    console.log("Root component mounted; Running getting local storage value for authentication");
    const localToken = localStorage.getItem('token'); 
    if (localToken === null || localToken === undefined || localToken === "" ){
      console.log("No token found in local storage, user is not authenticated");
      setAuthenticated(false);
      setToken("");
      navigation("/");
    } else {
      console.log("Token found in local storage");
      setToken(localToken);
      checkAuthentication();
    }
  }, []);

  const checkAuthentication = async () => {
    try {
      await fetchFromBackend({
        method: "GET",
        endpoint: "data/course",
    })
    } catch (error: unknown) {
      if (error instanceof Error) {
        if(error.message.includes("401")){
          console.error("Unauthorized access, user is not authenticated");
          setAuthenticated(false);
          navigation("/");
          localStorage.removeItem('token'); 
        }
      } else {
        throw error
      }
    }
    setAuthenticated(true);
  };

  const contextValue = {
    authenticated,
    checkAuthentication: checkAuthentication,
    token
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <Outlet />
    </AccountContext.Provider>
  );
}