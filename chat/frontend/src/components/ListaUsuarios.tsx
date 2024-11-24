import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { Usuario, Chat, toastOptions } from "../utils/types";

export default function ListaUsuarios({
  usuarioId,
  onNovaConversa,
  onSelectChat,
}: {
  usuarioId: string;
  onNovaConversa: (chat: Chat) => void;
  onSelectChat: (chatId: string) => void;
}) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  const [listaVisivel, setListaVisivel] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<Usuario[]>("http://localhost:5182/usuario/todos");

        // Filtra o usuário atual para não aparecer na lista
        const usuariosFiltrados = response.data.filter((usuario) => usuario.id !== usuarioId);
        setUsuarios(usuariosFiltrados);
        setUsuariosFiltrados(usuariosFiltrados);
      } catch (error) {
        toast.error("Erro ao buscar usuários.", toastOptions);
      }
    };

    fetchUsuarios();
  }, [usuarioId]);

  useEffect(() => {
    const resultados = usuarios.filter((usuario) =>
      usuario.nome.toLowerCase().includes(busca.toLowerCase())
    );
    setUsuariosFiltrados(resultados);
  }, [busca, usuarios]);

  const handleNovaConversa = async (usuario: Usuario) => {
    const confirmar = window.confirm(`Deseja iniciar uma conversa com ${usuario.nome}?`);

    if (!confirmar) return;

    try {
      const response = await axios.post<Chat>("http://localhost:5182/conversa", {
        usuario1Id: usuarioId, // ID do usuário logado
        usuario2Id: usuario.id, // ID do usuário selecionado
      });

      const novaConversa = response.data;
      toast.success(`Conversa iniciada com ${usuario.nome}!`, toastOptions);

      onNovaConversa(novaConversa); // Atualiza a lista de conversas
      onSelectChat(novaConversa.id); // Redireciona para o chat recém-criado
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        const conversaExistente = error.response.data;
        console.log(conversaExistente);
        toast.info(`Conversa com ${usuario.nome} já existe.`, toastOptions);
        onSelectChat(conversaExistente.id); // Redireciona para a conversa existente
      } else {
        toast.error("Erro ao iniciar conversa.", toastOptions);
      }
    }
  };

  return (
    <Container>
      <Busca
        type="text"
        placeholder="Buscar usuário..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onFocus={() => setListaVisivel(true)} // Exibe a lista ao focar
        onBlur={() => setTimeout(() => setListaVisivel(false), 200)} // Esconde a lista após perder o foco
      />
      {listaVisivel && (
        <Lista>
          {usuariosFiltrados.map((usuario) => (
            <UsuarioItem key={usuario.id} onClick={() => handleNovaConversa(usuario)}>
              {usuario.nome}
            </UsuarioItem>
          ))}
        </Lista>
      )}
    </Container>
  );
}

// Estilização
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #997af0;
`;

const Busca = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: white;
  font-size: 1rem;
`;

const Lista = styled.div`
  max-height: 300px;
  overflow-y: auto;
  background-color: #131324;
  padding: 0.5rem;
  border-radius: 5px;
`;

const UsuarioItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  background-color: #4e0eff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #997af0;
  }
`;
