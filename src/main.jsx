import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
//import { AuthProvider } from "./auth/AuthContext.jsx";
import { ApiProvider } from "./api/ApiContext.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
createRoot(document.getElementById("root")).render(
  <ApiProvider>
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
   
  </ApiProvider>
);