import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { useContext, useEffect } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { Stream } from "stream";
import { strictEqual } from "assert";

export const Room = () => {
  const { id } = useParams();
  const { ws, currentUser, stream } = useContext(RoomContext);

  useEffect(() => {
    if (currentUser)
      ws.emit("join-room", { roomId: id, peerId: currentUser._id });
  }, [id, currentUser, ws]);

  return (
    <>
      {" "}
      Room id{id}
      <div>
        <VideoPlayer stream={stream} />
      </div>
    </>
  );
};
