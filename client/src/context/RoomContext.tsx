import socketIOClient from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { useAuth } from "./AuthContext";

const WS = "http://localhost:8080";
export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const considerUserId = useAuth();
  const [currentUser, setCurrentUser] = useState<Peer | null>(null);

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log("Entered Room: ", roomId);
    navigate(`/room/${roomId}`);
  };
  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  useEffect(() => {
    if (considerUserId) {
      const peer = new Peer(considerUserId);
      setCurrentUser(peer);
    } else {
      console.warn("User ID is null. Unable to create a Peer instance.");
    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);

    return () => {
      ws.off("room-created", enterRoom);
    };
  }, [considerUserId]);

  return (
    <RoomContext.Provider value={{ ws, currentUser }}>
      {children}
    </RoomContext.Provider>
  );
};
