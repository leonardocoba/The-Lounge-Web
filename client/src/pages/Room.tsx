import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { useContext, useEffect } from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { Stream } from "stream";
import { strictEqual } from "assert";
import { PeerState } from "../context/peersReducers";
export const Room = () => {
  const { id } = useParams();
  const { ws, currentUser, stream, peers } = useContext(RoomContext);

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
        {Object.values(peers as PeerState).map((peer) => (
          <VideoPlayer stream={peer.stream} />
        ))}
      </div>
    </>
  );
};
