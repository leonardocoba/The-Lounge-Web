import socketIOClient from "socket.io-client";
import React, { createContext } from "react";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

// RoomProvider component
export const RoomProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};
