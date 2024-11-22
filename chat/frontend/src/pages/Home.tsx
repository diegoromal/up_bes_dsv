import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo!</h1>
      <button onClick={() => navigate("/logout")}>Logout</button>
    </div>
  );
}