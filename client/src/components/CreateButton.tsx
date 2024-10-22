import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RoomContext } from "../context/RoomContext";
import { useContext } from "react";

export const CreateRoomButton: React.FC = () => {
  const userId = useAuth();
  const { ws } = useContext(RoomContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = () => {
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    if (roomName.trim() === "") {
      alert("Room name cannot be empty!");
      return;
    }

    // Emit 'create-room' event with room name and user ID
    ws.emit("create-room", { roomName, userId });
    setIsModalOpen(false);
    alert(`Room "${roomName}" created!`);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-purple-700 py-2 px-6 rounded-lg text-lg hover:bg-gray-200 transition"
      >
        Create A Room
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Room
            </h2>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500 mb-4"
              placeholder="Enter room name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
