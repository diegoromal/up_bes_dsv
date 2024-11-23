import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast, type ToastOptions } from "react-toastify";
import Sidebar from "./Sidebar"; // Importa o componente que combina ListaUsuarios e ListaChats
import type { Usuario } from "../components/types";
import { useNavigate } from "react-router";
import Conversa from "./Conversa";

export default function ChatMain() {
  const [chatSelecionado, setChatSelecionado] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario>();

  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Busca o usuário atual do localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("usuario");
    if (!storedUsername) {      
      toast.error("Usuário não autenticado. Faça login novamente.", toastOptions);
      return;
    }

    const fetchUsuarioAtual = async () => {
      try {
        const response = await axios.get("http://localhost:5182/usuario/todos");
        const usuarios = response.data;

        const usuario = usuarios.find((u: { usuario: string }) => u.usuario === storedUsername);
        if (usuario) {
          setUsuario(usuario);
        } else {
          toast.error("Usuário não encontrado. Faça login novamente.", toastOptions)
        }
      } catch (error) {
        toast.error("Erro ao buscar usuário. Tente novamente.", toastOptions)
        }
      }

      fetchUsuarioAtual();
    }, []);

  if (!usuario) {
    return <Loading>Carregando...</Loading>; // Exibe um estado de carregamento enquanto o usuário é carregado
  }

  return (
    <ChatContainer>
      <Sidebar usuarioId={usuario.id} onSelectChat={setChatSelecionado} />
      <MainChatArea>
        {chatSelecionado ? (
          <Conversa conversaId={chatSelecionado} usuarioId={usuario.id} />
        ) : (
          <MensagemPlaceholder>Selecione um chat para começar</MensagemPlaceholder>
        )}
      </MainChatArea>
    </ChatContainer>
  );
}

// Estilização
const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainChatArea = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
  background-color: #131324;
  display: flex;
  flex-direction: column;
`;

const MensagemPlaceholder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #997af0;
  font-size: 1.5rem;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: white;
  background-color: #131324;
`;
