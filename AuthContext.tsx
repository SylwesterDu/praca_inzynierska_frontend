"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "./axios";

import { LoggedUser } from "./types/UserTypes";

type AuthContextType = {
  logged: boolean;
  userData: LoggedUser;
  login: () => void;
  logout: () => void;
  getUserData: () => void;
};

const authContextDefaultValues: AuthContextType = {
  logged: false,
  userData: {
    id: "",
    username: "",
    avatar: "",
    roles: [],
  },
  login: () => {},
  logout: () => {},
  getUserData: () => {},
};

const authContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<LoggedUser>({
    id: "",
    username: "",
    avatar: "",
    roles: [],
  });

  const login = () => {
    setLogged(true);
    getUserData();
  };

  const logout = () => {
    setLogged(false);
    setUserData({
      id: "",
      username: "",
      avatar: "",
      roles: [],
    });
    localStorage.removeItem("jwt");
  };

  const getUserData = async () => {
    const response = await api.get("user");
    setUserData(response.data);
  };

  return (
    <>
      <authContext.Provider
        value={{ logged, userData, login, logout, getUserData }}
      >
        {children}
      </authContext.Provider>
    </>
  );
}
