import socketIOClient from "socket.io-client";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { useAuth } from "./AuthContext";
import { peersReducer } from "./peersReducers";
import { addPeerAction, removePeerAction } from "./peersActions";

const WS = "http://localhost:8080";
export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Ensure a user is logged in
  const [peer, setPeer] = useState<Peer | null>(null); // Peer instance
  const [peers, dispatch] = useReducer(peersReducer, {}); // Manage connected peers
  const [stream, setStream] = useState<MediaStream | null>(null); // Local media stream

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log("Entered Room: ", roomId);
    navigate(`/room/${roomId}`);
  };

  const handleUserList = ({ participants }: { participants: string[] }) => {
    participants.forEach((peerId) => {
      const call = stream && peer?.call(peerId, stream);
      call?.on("stream", (userVideoStream: MediaStream) => {
        dispatch(addPeerAction(peerId, userVideoStream));
      });
    });
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  useEffect(() => {
    if (!currentUser) {
      console.warn("No user logged in. Redirecting...");
      return;
    }

    console.log("User logged in:", currentUser.email);

    const peerId = uuidV4(); // Generate a unique Peer ID
    console.log("Generated Peer ID:", peerId);

    const newPeer = new Peer(peerId);
    setPeer(newPeer);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((localStream) => {
        setStream(localStream); // Store local media stream
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    ws.on("room-created", enterRoom);
    ws.on("get-users", handleUserList);
    ws.on("user-disconnected", removePeer);

    return () => {
      ws.off("room-created", enterRoom);
      ws.off("get-users", handleUserList);
      ws.off("user-disconnected", removePeer);
      if (newPeer) newPeer.destroy(); // Cleanup PeerJS instance
    };
  }, [currentUser]);

  useEffect(() => {
    if (!stream || !peer) return;

    ws.on("user-joined", ({ peerId }: { peerId: string }) => {
      const call = stream && peer.call(peerId, stream);
      call?.on("stream", (userVideoStream: MediaStream) => {
        dispatch(addPeerAction(peerId, userVideoStream));
      });
    });

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
        dispatch(addPeerAction(call.peer, userVideoStream));
      });
    });

    return () => {
      ws.off("user-joined");
      peer.off("call");
    };
  }, [stream, peer]);
  console.log("Pablo is gay: ", peers);
  return (
    <RoomContext.Provider value={{ ws, peer, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
