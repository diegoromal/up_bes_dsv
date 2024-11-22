import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Remove o status de autenticação e outros dados
      localStorage.removeItem("estaAutenticado");
      localStorage.removeItem("usuario");

      // Redireciona para a página de login
      navigate("/login");
    };

    handleLogout();
  }, [navigate]);

  return null; // Não renderiza nada na tela
}
