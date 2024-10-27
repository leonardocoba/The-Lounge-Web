import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { useContext, useEffect } from "react";

export const Room = () => {
  const { id } = useParams();
  const { ws, currentUser } = useContext(RoomContext);

  useEffect(() => {
    if (currentUser)
      ws.emit("join-room", { roomId: id, peerId: currentUser._id });
  }, [id, currentUser, ws]);

  return <> Room id{id}</>;
};
