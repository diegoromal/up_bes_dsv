import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { toastOptions, type UsuarioEdit } from "../utils/types";

export default function UserActions({ usuarioId }: { usuarioId: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [dadosUsuario, setDadosUsuario] = useState<UsuarioEdit | null>(null);

  // Abrir e fechar o modal principal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Abrir e fechar o modal de edição
  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  // Buscar dados do usuário para edição
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get<UsuarioEdit>(`http://localhost:5182/usuario/${usuarioId}`);
        setDadosUsuario(response.data);
      } catch (error) {
        toast.error("Erro ao buscar dados do usuário.", toastOptions);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  // Função para editar o perfil
  const handleEditProfile = async () => {
    if (!dadosUsuario) return;

    if (!dadosUsuario.senha || dadosUsuario.senha.trim() === "") {
        toast.error("Preencha uma senha válida.", toastOptions);
        return;
      }

    try {
      await axios.put(`http://localhost:5182/usuario/${usuarioId}`, dadosUsuario);
      toast.success("Perfil atualizado com sucesso!", toastOptions);
      toggleEditModal(); // Fecha o modal de edição
      toggleModal(); // Fecha o modal principal
    } catch (error) {
      toast.error("Erro ao atualizar o perfil.", toastOptions);
    }
  };

  // Função para excluir conta
  const handleDeleteAccount = async () => {
    if (window.confirm("Você tem certeza que deseja excluir sua conta?")) {
      try {
        await axios.delete(`http://localhost:5182/usuario/${usuarioId}`);
        toast.success("Conta excluída com sucesso!", toastOptions);
        localStorage.clear();
        window.location.href = "/login"; // Redireciona para o login
      } catch (error) {
        toast.error("Erro ao excluir conta.", toastOptions);
      }
    }
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.clear();
    toast.info("Você saiu da sua conta.", toastOptions);
    window.location.href = "/login"; // Redireciona para o login
  };

  return (
    <Container>
      <ActionButton onClick={toggleModal}>Gerenciar Conta</ActionButton>

      {/* Modal Principal */}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h3>Gerenciar Conta</h3>
            <Button onClick={toggleEditModal}>Editar Perfil</Button>
            <Button danger onClick={handleDeleteAccount}>
              Excluir Conta
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
            <CloseButton onClick={toggleModal}>Fechar</CloseButton>
          </ModalContent>
        </Modal>
      )}

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <Modal>
          <ModalContent>
            <h3>Editar Perfil</h3>
            <Form>
              <label>Nome</label>
              <Input
                type="text"
                value={dadosUsuario?.nome || ""}
                onChange={(e) => setDadosUsuario({ ...dadosUsuario!, nome: e.target.value })}
              />
              <label>Usuário</label>
              <Input
                type="text"
                value={dadosUsuario?.usuario || ""}
                onChange={(e) => setDadosUsuario({ ...dadosUsuario!, usuario: e.target.value })}
              />
              <label>Senha</label>
              <Input
                type="password"
                value={dadosUsuario?.senha || ""}
                onChange={(e) => setDadosUsuario({ ...dadosUsuario!, senha: e.target.value })}
                required
              />
              <Button onClick={handleEditProfile}>Salvar Alterações</Button>
            </Form>
            <CloseButton onClick={toggleEditModal}>Cancelar</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

// Estilização
const Container = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: center; /* Centraliza o botão */
`;

const ActionButton = styled.button`
  background-color: #131324;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #997af0;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #131324;
  padding: 2rem;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
`;

const Button = styled.button<{ danger?: boolean }>`
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#4e0eff")};
  color: white;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.danger ? "#ff6666" : "#997af0")};
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #4e0eff;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    color: #997af0;
  }
`;
