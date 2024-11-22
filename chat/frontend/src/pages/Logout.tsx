import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Logout() {
  const navigate = useNavigate();
  const isCalled = useRef(false); // UseRef para evitar chamadas duplicadas

  useEffect(() => {
    const handleLogout = () => {
      if (isCalled.current) return; // Evita múltiplas execuções
      isCalled.current = true;

      const estaAutenticado = localStorage.getItem("estaAutenticado") === "true";

      if (!estaAutenticado) {
        navigate("/login");
        return;
      }

      // Exibe o toast com opções de confirmação
      toast.info(
        <div>
          <p>Você tem certeza que deseja sair?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => {
                // Remove o status de autenticação e redireciona
                localStorage.removeItem("estaAutenticado");
                toast.dismiss(); // Fecha o toast
                navigate("/login");
              }}
              style={{
                backgroundColor: "#4e0eff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Sim
            </button>
            <button
              onClick={() => {
                toast.dismiss(); // Fecha o toast
                navigate(-1); // Volta para a página anterior
              }}
              style={{
                backgroundColor: "#997af0",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Não
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false, // Não fecha automaticamente
          closeOnClick: false, // Não fecha ao clicar fora
          draggable: false, // Não pode ser arrastado
          theme: "dark",
        }
      );
    };

    handleLogout();
  }, [navigate]);

  return null; // Componente não precisa renderizar nada
}
