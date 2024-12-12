import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { AuthProvider } from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <ToastContainer />
  </AuthProvider>
);
