import React, { useEffect, useState } from "react";
import axios from "axios";

interface NewMessagesCounterProps {
  usuarioId: string | null; // ID do usuário logado
}

const NewMessagesCounter: React.FC<NewMessagesCounterProps> = ({ usuarioId }) => {
  const [novaMensagens, setNovaMensagens] = useState<number>(0);

  const fetchNovaMensagens = async () => {
    if (!usuarioId) return;

    try {
      const response = await axios.get(
        `http://localhost:5182/conversa/usuario/${usuarioId}`
      );
      const conversas = response.data;

      let contador = 0;

      for (const conversa of conversas) {
        const ultimoAcesso = parseInt(
          localStorage.getItem(`ultimoAcesso_${conversa.id}`) || "0",
          10
        );

        const mensagensResponse = await axios.get(
          `http://localhost:5182/mensagem/conversa/${conversa.id}`
        );
        const mensagens = mensagensResponse.data;

        if (
          mensagens.some(
            (mensagem: any) =>
              mensagem.usuarioId !== usuarioId &&
              new Date(mensagem.dataHora).getTime() > ultimoAcesso
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

  useEffect(() => {
    if (novaMensagens > 0) {
      document.title = `(${novaMensagens}) Chat`;
    } else {
      document.title = "Chat";
    }
  }, [novaMensagens]);

  useEffect(() => {
    fetchNovaMensagens(); // Busca inicial
    const interval = setInterval(fetchNovaMensagens, 100); // Atualiza a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  return null; // Não renderiza nada, apenas atualiza o título da página
};

export default NewMessagesCounter;
