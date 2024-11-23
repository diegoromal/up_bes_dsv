import type { ToastOptions } from "react-toastify";

export interface Usuario {
    id: string;
    nome: string;
    usuario: string;
  }

export interface UsuarioEdit {
  nome: string;
  usuario: string;
  senha: string;
}
  
  export interface Chat {
    id: string;
    usuario1Id: string;
    usuario2Id: string;
  }
  
  export interface Mensagem {
    id: string;
    conversaId: string;
    usuarioId: string;
    conteudo: string;
    dataHora: Date
  }
  
  export const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };