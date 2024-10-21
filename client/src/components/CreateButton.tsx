import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

export const Create: React.FC = () => {
  const { ws } = useContext(RoomContext);
  const createRoom = () => {
    ws.emit("create-room");
  };
  return (
    <button
      onClick={createRoom}
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-blue-400 text-white"
    >
      Start New Meeting
    </button>
  );
};
