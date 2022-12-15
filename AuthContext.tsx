"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "./axios";

type AuthContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: AuthContextType = {
  user: false,
  login: () => {},
  logout: () => {},
};

const authContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const jwt = localStorage.getItem("jwt");
  const [user, setUser] = useState<boolean>(jwt != null);

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };
  return (
    <>
      <authContext.Provider value={{ user, login, logout }}>
        {children}
      </authContext.Provider>
    </>
  );
}
