import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });

  // Configuração das notificações
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

    // Verifica se o usuário já está autenticado
    useEffect(() => {
        if (localStorage.getItem("estaAutenticado") === "true") {
            navigate("/");
        }
    }, [navigate]);

  // Atualiza os campos do formulário
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Validação dos campos do formulário
  const validateForm = () => {
    const { username, password } = values;
    if (username === "" || password === "") {
      toast.error("Nome de usuário e senha são obrigatórios.", toastOptions);
      return false;
    }
    return true;
  };

  // Submete os dados do formulário para a API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { username, password } = values;
        const response = await axios.post(
          "http://localhost:5182/autenticacao/login",
          {
            usuario: username,
            senha: password,
          }
        );

        if (response.status === 200) {
          const data = response.data;

          // Salva os dados do usuário no localStorage
          localStorage.setItem(
            "usuario",
            JSON.stringify(data.usuario)
          );
          localStorage.setItem("estaAutenticado", "true");

          toast.success("Login realizado com sucesso!", toastOptions);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
            toast.error("Credenciais inválidas. Tente novamente.", toastOptions);
        } else {
          toast.error("Erro ao conectar ao servidor.", toastOptions);
        }
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <h1>Login</h1>
          </div>
          <input
            type="text"
            placeholder="Usuário"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
          <span>
            Não tem uma conta? <Link to="/register">Cadastre-se.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

// Estilização do formulário
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
    align-items: center; /* Centraliza os itens dentro do formulário */

    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      max-width: 300px; /* Garante largura uniforme */
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
      width: 100%; /* Garante que o botão tenha a mesma largura que os inputs */
      max-width: 300px; /* Alinha com o tamanho máximo dos inputs */
      text-align: center; /* Centraliza o texto dentro do botão */
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
