"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { io } from "socket.io-client";

interface ISocketProvider {
  children: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
}

const SocketContext = createContext<ISocketProvider | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((message) => {
    console.log("Sending message", message);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");

    return () => {
      _socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
};
