import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router";
import router from "./router/Router";
import { AuthProvider } from "./context/AuthContext";
import LoginAndSignUpContextProvider from "./context/LoginAndSignUpContext";
import ThemeContextProvider from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthProvider>
        <LoginAndSignUpContextProvider>
          <RouterProvider router={router} />
        </LoginAndSignUpContextProvider>
      </AuthProvider>
    </ThemeContextProvider>
  </StrictMode>
);
