import { API_URL } from "../config/app";
import { UsuarioCadastro } from "../types/UsuarioCadastro";
import { pegarTokenJWT } from "./AuthService";

export async function cadastrarUsuario(usuarioCadastro: UsuarioCadastro) {
  const response = await fetch(`${API_URL}/usuario/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioCadastro),
  });

  if (!response.ok) {
    const erro = await response.json();

    throw new Error(erro.message || "Erro ao cadastrar usuário");
  }

  return await response.json();
}

type LoginRequest = {
  email: string;
  senha: string;
};

export async function loginUsuario({
  email,
  senha,
}: LoginRequest): Promise<string> {
  const response = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  if (!response.ok) {
    const erro = await response.text();

    throw new Error(erro || "Erro ao realizar login");
  }

  return await response.text(); // JWT
}

export async function buscarUsuarioLogado() {
  const token = await pegarTokenJWT();

  const response = await fetch(`${API_URL}/usuario/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }

  return await response.json();
}
