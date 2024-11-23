import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot
import { BrowserRouter as Router } from "react-router-dom"; // Importa o Router
import App from "./App";
import "./index.css";

const container = document.getElementById("root");

// Garante que o container exista antes de criar o root
if (container) {
  const root = ReactDOM.createRoot(container); // Substitui ReactDOM.render
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}
