import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import ReactDOM from 'react-dom/client';

import { Outlet } from "react-router"

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

export default function Root() {
  return <Outlet />;
}