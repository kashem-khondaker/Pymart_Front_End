import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContxt.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
