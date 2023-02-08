import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LoadingScreen from "./components/LoadingScreen";
import AuthProvider from "./context/AuthContext";
import MenuContext from "./context/MenuContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <MenuContext>
          <Suspense fallback={<LoadingScreen />}>
            <App />
          </Suspense>
        </MenuContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
