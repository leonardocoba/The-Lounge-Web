import socketIOClient from "socket.io-client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { useAuth } from "./AuthContext";
import { peerReducer } from "./peerReducers";

const WS = "http://localhost:8080";
export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const considerUserId = useAuth();
  const [stream, setStream] = useState<MediaStream>();
  const [currentUser, setCurrentUser] = useState<Peer | null>(null);
  const [peers, dispatch] = useReducer(peerReducer, {});

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

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);

    return () => {
      ws.off("room-created", enterRoom);
      ws.off("get-users", getUsers);
    };
  }, [considerUserId]);

  useEffect(() => {
    if (!currentUser || !stream) return;

    ws.on("user-joined", ({ peerId }) => {
      const call = currentUser.call(peerId, stream);

      call.on("stream", (remoteStream) => {
        console.log("Received remote stream:", remoteStream);
      });

      call.on("error", (error) => {
        console.error("Call error:", error);
      });
    });

    currentUser.on("call", (call) => {
      call.answer(stream);

      call.on("stream", (remoteStream) => {
        console.log("Received remote stream:", remoteStream);
      });

      call.on("error", (error) => {
        console.error("Call error:", error);
      });
    });

    return () => {
      ws.off("user-joined");
      currentUser.off("call");
    };
  }, [currentUser, stream]);

  return (
    <RoomContext.Provider value={{ ws, currentUser, stream }}>
      {children}
    </RoomContext.Provider>
  );
};
