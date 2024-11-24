import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { Chat, Mensagem, toastOptions, Usuario } from "../utils/types";

export default function ListaChats({
  usuarioId,
  chatAbertoId,
  onSelectChat,
}: {
  usuarioId: string;
  chatAbertoId: string | null; // Chat atualmente aberto
  onSelectChat: (chatId: string) => void;
}) {
  const [chats, setChats] = useState<(Chat & { ultimaMensagem?: Mensagem; naoLidas: number; nomeUsuario: string })[]>([]);

  // Recupera o último acesso ao chat do localStorage
  const getUltimoAcesso = (chatId: string): number => {
    const timestamp = localStorage.getItem(`ultimoAcesso_${chatId}`);
    return timestamp ? parseInt(timestamp, 10) : 0;
  };

  // Atualiza o último acesso ao chat no localStorage
  const updateUltimoAcesso = (chatId: string) => {
    localStorage.setItem(`ultimoAcesso_${chatId}`, Date.now().toString());
  };

  // Função para buscar os chats e calcular notificações
  const fetchChats = async () => {
    try {
      const response = await axios.get<Chat[]>(`http://localhost:5182/conversa/usuario/${usuarioId}`);
      const chatsData = response.data;

      const chatsComDetalhes = await Promise.all(
        chatsData.map(async (chat) => {
          try {
            const outroUsuarioId = chat.usuario1Id === usuarioId ? chat.usuario2Id : chat.usuario1Id;
            const usuarioResponse = await axios.get<Usuario>(`http://localhost:5182/usuario/${outroUsuarioId}`);
            const nomeUsuario = usuarioResponse.data.nome;

            const mensagensResponse = await axios.get<Mensagem[]>(
              `http://localhost:5182/mensagem/conversa/${chat.id}`
            );
            const mensagensOrdenadas = mensagensResponse.data.sort(
              (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
            );
            const ultimaMensagem = mensagensOrdenadas[mensagensOrdenadas.length - 1];

            // Atualiza o último acesso se o chat está aberto
            if (chat.id === chatAbertoId) {
              updateUltimoAcesso(chat.id);
            }

            const ultimoAcesso = getUltimoAcesso(chat.id);
            const naoLidas = mensagensOrdenadas.filter(
              (mensagem) =>
                mensagem.usuarioId !== usuarioId && new Date(mensagem.dataHora).getTime() > ultimoAcesso
            ).length;

            return { ...chat, ultimaMensagem, naoLidas, nomeUsuario };
          } catch (error) {
            toast.error(`Erro ao buscar informações para o chat ${chat.id}`, toastOptions);
            return { ...chat, ultimaMensagem: undefined, naoLidas: 0, nomeUsuario: "Usuário Desconhecido" };
          }
        })
      );

      chatsComDetalhes.sort((a, b) => {
        const dataA = a.ultimaMensagem ? new Date(a.ultimaMensagem.dataHora).getTime() : 0;
        const dataB = b.ultimaMensagem ? new Date(b.ultimaMensagem.dataHora).getTime() : 0;
        return dataB - dataA;
      });

      setChats(chatsComDetalhes);
    } catch (error) {
      toast.error("Erro ao buscar chats.", toastOptions);
    }
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 100); // Atualiza a lista de chats a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [usuarioId, chatAbertoId]);

  return (
    <ListaContainer>
      <h3>Chats em Andamento:</h3>
      {chats.map((chat) => (
        <ChatItem key={chat.id} onClick={() => onSelectChat(chat.id)}>
          <div>
            <UsuarioNome>{chat.nomeUsuario}</UsuarioNome>
          </div>
          {chat.naoLidas > 0 && <Badge>{chat.naoLidas}</Badge>}
        </ChatItem>
      ))}
    </ListaContainer>
  );
}

// Estilização
const ListaContainer = styled.div`
  margin-top: 1rem;
`;

const ChatItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  background-color: #4e0eff;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #997af0;
  }
`;

const UsuarioNome = styled.span`
  font-weight: bold;
`;

const Badge = styled.span`
  background-color: red;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
`;

const UltimaMensagem = styled.p`
  font-size: 0.8rem;
  opacity: 0.8;
  margin: 0;
`;
