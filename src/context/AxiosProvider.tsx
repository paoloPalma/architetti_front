"use client";

import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AxiosContextType {
  myaxios: AxiosInstance;
}

const AxiosContext = createContext<AxiosInstance | null>(null);

const myaxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Next.js usa process.env e non import.meta.env
  headers: {
    Accept: "application/json",
  },
});

interface AxiosProviderProps {
  children: ReactNode;
}

const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {

  // console.log('ciao');
  
  
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    //queto fara il controllo ogni volta che parte una chiamata, e alla chiamata controlla se c'è il token, allora lo inserisce negli headers
    
    myaxios.interceptors.request.use(
      (config) => {

        const token = localStorage.getItem("token");
        console.log(token);
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config; //deve ritornare la configurazione
      },
      (error) => Promise.reject(error)
    );
    

    myaxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error.status);
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/auth/login");
        }

        return Promise.reject(error);
      }
    );

    //lo useEffect ha un return, che viene lanciato quando viene smontato il componente che contiene questo useEffect, smontato vuol dire che non ce l abbiamo piu nel DOM, perche ho cambiato pagina, ho chiuso il sito ecc..
    //questo si chiama cleanUp
    /* return () => {
      myaxios.interceptors.request.eject(requestId); //serve per togliere
      myaxios.interceptors.response.eject(responseId); //serve per togliere
    }; */
    setFirstLoad(true)
  }, []);

  return (
    <AxiosContext.Provider value={myaxios}>
      {firstLoad ? children : null}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios deve essere usato dentro un AxiosProvider");
  }
  return context;
};