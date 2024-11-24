import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import ChatMain from "./components/ChatMain";

export default function App() {
  const [novaMensagens, setNovaMensagens] = useState<number>(0);
  const usuarioId = localStorage.getItem("usuarioId"); // ID do usuário logado

  // Função para buscar o número de conversas com mensagens novas
  const fetchNovaMensagens = async () => {
    if (!usuarioId) return;

    try {
      const response = await axios.get(`http://localhost:5182/conversa/usuario/${usuarioId}`);
      const conversas = response.data;

      let contador = 0;

      for (const conversa of conversas) {
        const ultimoAcesso = parseInt(localStorage.getItem(`ultimoAcesso_${conversa.id}`) || "0", 10);

        const mensagensResponse = await axios.get(
          `http://localhost:5182/mensagem/conversa/${conversa.id}`
        );
        const mensagens = mensagensResponse.data;

        // Incrementa o contador apenas para conversas com mensagens novas
        if (
          mensagens.some(
            (mensagem: any) =>
              mensagem.usuarioId !== usuarioId && new Date(mensagem.dataHora).getTime() > ultimoAcesso
          )
        ) {
          contador++;
        }
      }

      setNovaMensagens(contador);
    } catch (error) {
      console.error("Erro ao buscar mensagens novas:", error);
    }
  };

  // Atualiza o título da página com o número de mensagens novas
  useEffect(() => {
    if (novaMensagens > 0) {
      document.title = `(${novaMensagens}) Novas Mensagens - Chat`;
    } else {
      document.title = "Chat";
    }
  }, [novaMensagens]);

  // Atualiza o contador periodicamente
  useEffect(() => {
    fetchNovaMensagens(); // Busca inicial
    const interval = setInterval(fetchNovaMensagens, 100); // Atualiza a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatMain />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
