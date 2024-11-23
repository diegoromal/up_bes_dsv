import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ nome: "", username: "", password: "" });

  // Configuração das notificações
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Atualiza os campos do formulário
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Validação dos campos do formulário
  const validateForm = () => {
    const { nome, username, password } = values;
    if (nome === "" || username === "" || password === "") {
      toast.error("Todos os campos são obrigatórios.", toastOptions);
      return false;
    }
    return true;
  };

  // Submete os dados do formulário para a API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { nome, username, password } = values;
        const response = await axios.post("http://localhost:5182/usuario", {
          nome,
          usuario: username,
          senha: password,
        });

        if (response.status === 201) {
          toast.success("Conta criada com sucesso! Faça login.", toastOptions);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          toast.error("Usuário já existe. Escolha outro nome de usuário.", toastOptions);
        } else {
          toast.error("Erro ao criar conta. Tente novamente.", toastOptions);
        }
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <h1>Registrar</h1>
          </div>
          <input
            type="text"
            placeholder="Nome Completo"
            name="nome"
            onChange={handleChange}
            required
            autoComplete="new-name"
          />
          <input
            type="text"
            placeholder="Usuário"
            name="username"
            onChange={handleChange}
            required
            autoComplete="new-username"
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button type="submit">Registrar</button>
          <span>
            Já tem uma conta? <Link to="/login">Faça login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

// Reutilizando os estilos do Login
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    align-items: center;

    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }

    input {
      background-color: #fff;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #000;
      width: 100%;
      max-width: 300px;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      width: 100%;
      max-width: 300px;
      text-align: center;
      &:hover {
        background-color: #997af0;
      }
    }

    span {
      color: white;
      text-transform: uppercase;
      text-align: center;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
