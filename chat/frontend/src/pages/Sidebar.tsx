import React, { useState } from "react";
import styled from "styled-components";
import ListaUsuarios from "./ListaUsuarios";
import ListaChats from "./ListaChats";
import UserActions from "./UserActions";

export default function Sidebar({
  usuarioId,
  onSelectChat,
}: {
  usuarioId: string;
  onSelectChat: (chatId: string) => void;
}) {
  const [chatAbertoId, setChatAbertoId] = useState<string | null>(null);

  const handleSelectChat = (chatId: string) => {
    setChatAbertoId(chatId); // Atualiza o chat atualmente aberto
    onSelectChat(chatId);
  };

  return (
    <SidebarContainer>
      <UserActionsContainer>
        <UserActions usuarioId={usuarioId} />
      </UserActionsContainer>
      <ListaUsuariosContainer>
        <ListaUsuarios
          usuarioId={usuarioId}
          onNovaConversa={() => {}}
          onSelectChat={handleSelectChat}
        />
      </ListaUsuariosContainer>
      <ListaChatsContainer>
        <ListaChats
          usuarioId={usuarioId}
          chatAbertoId={chatAbertoId}
          onSelectChat={handleSelectChat}
        />
      </ListaChatsContainer>
    </SidebarContainer>
  );
}

// Estilização
const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #131324;
  color: white;
  height: 100vh;
  overflow: hidden;
  border-right: 1px solid #ddd;
`;

const UserActionsContainer = styled.div`
  background-color: #4e0eff;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const ListaUsuariosContainer = styled.div`
  background-color: #997af0;
`;

const ListaChatsContainer = styled.div`
  text-align: center;
  background-color: #131324;
  border-top: 1px solid #ddd;
`;
