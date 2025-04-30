"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAxios } from "@/context/AxiosProvider"; // 👈 Import corretto

// Definiamo il tipo per il contesto
interface UserContextType {
  user: any;
  handleLogin: (data: any) => Promise<string | void>;
}

// Creiamo il contesto con un valore di default tipizzato
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const myaxios = useAxios();
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"));
  }, []);

  const handleLogin = async (data: any): Promise<string | void> => {
    try {
      const result = await myaxios.post("/login", data);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      setUser(result.data.user);
    } catch (error: any) {
      return error.response?.data?.message || "Errore di login";
    }
  };

  return (
    <UserContext.Provider value={{ handleLogin, user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// Hook per usare il contesto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve essere usato dentro UserProvider");
  }
  return context;
};
