import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { Mensagem } from "../components/types";

export default function Conversa({
  conversaId,
  usuarioId,
}: {
  conversaId: string;
  usuarioId: string;
}) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState<string>("");

  // Referência para o contêiner que rola
  const mensagensEndRef = useRef<HTMLDivElement | null>(null);

  // Função para rolar até o final instantaneamente
  const scrollToBottom = () => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // Função para buscar mensagens
  const fetchMensagens = async () => {
    try {
      const response = await axios.get<Mensagem[]>(
        `http://localhost:5182/mensagem/conversa/${conversaId}`
      );
      const mensagensOrdenadas = response.data.sort(
        (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
      );
      setMensagens(mensagensOrdenadas);
      scrollToBottom(); // Rola para o final ao carregar as mensagens
    } catch (error) {
      toast.error("Erro ao buscar mensagens.");
    }
  };

  // Carrega as mensagens ao montar o componente
  useEffect(() => {
    fetchMensagens();
  }, [conversaId]);

  // Atualiza as mensagens periodicamente
  useEffect(() => {
    const interval = setInterval(fetchMensagens, 100); // Verifica novas mensagens a cada 5 segundos
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [conversaId]);

  // Função para enviar nova mensagem
  const handleEnviarMensagem = async () => {
    if (!novaMensagem.trim()) {
      toast.warning("A mensagem não pode estar vazia.");
      return;
    }

    try {
      const response = await axios.post<Mensagem>(
        "http://localhost:5182/mensagem",
        {
          conteudo: novaMensagem,
          conversaId,
          usuarioId,
        }
      );

      setMensagens((prev) => [...prev, response.data]);
      setNovaMensagem(""); // Limpa o campo de entrada
      scrollToBottom(); // Rola para o final ao enviar uma mensagem
    } catch (error) {
      toast.error("Erro ao enviar mensagem.");
    }
  };

  // Função para enviar mensagem ao pressionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Impede o comportamento padrão de envio do formulário
      handleEnviarMensagem();
    }
  };

  return (
    <Container>
      <MensagensContainer>
        {mensagens.map((mensagem) => (
          <MensagemCard
            key={mensagem.id}
            isEnviada={mensagem.usuarioId === usuarioId}
          >
            <Conteudo>{mensagem.conteudo}</Conteudo>
            <DataHora>
              {new Date(mensagem.dataHora).toLocaleString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </DataHora>
          </MensagemCard>
        ))}
        <div ref={mensagensEndRef} /> {/* Referência para rolar até o final */}
      </MensagensContainer>
      <InputContainer>
        <MensagemInput
          type="text"
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          onKeyDown={handleKeyDown} // Adiciona o evento de pressionar Enter
        />
        <EnviarButton onClick={handleEnviarMensagem}>Enviar</EnviarButton>
      </InputContainer>
    </Container>
  );
}

// Estilização
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MensagensContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* Adiciona barra de rolagem */
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const MensagemCard = styled.div<{ isEnviada: boolean }>`
  align-self: ${(props) => (props.isEnviada ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isEnviada ? "#4e0eff" : "#997af0")};
  color: white;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  max-width: 60%; /* Limita a largura do card */
  word-wrap: break-word; /* Quebra as palavras longas */
  overflow-wrap: break-word; /* Garante compatibilidade com navegadores */
  white-space: pre-wrap; /* Respeita as quebras de linha */
  line-height: 1.5; /* Melhora a legibilidade */
`;


const Conteudo = styled.p`
  margin: 0;
`;

const DataHora = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  text-align: right;
  opacity: 0.7;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #ddd;
`;

const MensagemInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const EnviarButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4e0eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #997af0;
  }
`;
