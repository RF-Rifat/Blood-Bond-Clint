import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import Provider from "./pages/auth/Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            {" "}
            <App />
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
