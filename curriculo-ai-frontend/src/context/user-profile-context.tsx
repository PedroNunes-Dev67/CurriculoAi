import React, { createContext, useContext, useMemo, useState } from "react";

export type RedeSocial = {
  id: string;
  plataforma: string;
  url: string;
};

export type Projeto = {
  id: string;
  nome: string;
  descricao: string;
  link: string;
};

export type UserProfile = {
  nome: string;
  email: string;
  fotoUri: string | null;
  redesSociais: RedeSocial[];
  projetos: Projeto[];
};

type UserProfileContextValue = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateProfile: (data: Partial<UserProfile>) => void;
  setFotoUri: (uri: string | null) => void;
  addRedeSocial: (rede: Omit<RedeSocial, "id">) => void;
  removeRedeSocial: (id: string) => void;
  addProjeto: (projeto: Omit<Projeto, "id">) => void;
  removeProjeto: (id: string) => void;
  getInitials: () => string;
  logout: () => void;
};

const defaultProfile: UserProfile = {
  nome: "Usuário",
  email: "",
  fotoUri: null,
  redesSociais: [],
  projetos: [],
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const value = useMemo<UserProfileContextValue>(
    () => ({
      profile,
      setProfile,
      updateProfile: (data) => setProfile((prev) => ({ ...prev, ...data })),
      setFotoUri: (uri) => setProfile((prev) => ({ ...prev, fotoUri: uri })),
      addRedeSocial: (rede) =>
        setProfile((prev) => ({
          ...prev,
          redesSociais: [...prev.redesSociais, { ...rede, id: createId() }],
        })),
      removeRedeSocial: (id) =>
        setProfile((prev) => ({
          ...prev,
          redesSociais: prev.redesSociais.filter((r) => r.id !== id),
        })),
      addProjeto: (projeto) =>
        setProfile((prev) => ({
          ...prev,
          projetos: [...prev.projetos, { ...projeto, id: createId() }],
        })),
      removeProjeto: (id) =>
        setProfile((prev) => ({
          ...prev,
          projetos: prev.projetos.filter((p) => p.id !== id),
        })),
      getInitials: () => {
        const parts = profile.nome.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) return "U";
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      },
      logout: () => {
        setProfile(defaultProfile);
      },
    }),
    [profile]
  );

  return (
    <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error("useUserProfile deve ser usado dentro de UserProfileProvider");
  }
  return ctx;
}
