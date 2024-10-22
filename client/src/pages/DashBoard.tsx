import React from "react";
import { CreateRoomButton } from "../components/CreateButton";
const Dashboard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-800">
      {/* TV-Like Container */}
      <div className="bg-purple-600 w-3/4 h-3/4 flex items-center justify-center rounded-2xl shadow-lg">
        {/* Centered Create Button */}
        <CreateRoomButton />
      </div>
    </div>
  );
};

export default Dashboard;
