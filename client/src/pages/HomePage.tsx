import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-700">
      <div className="text-center">
        <h1 className="text-white text-4xl mb-8">Welcome to The Lounge</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-purple-700 py-2 px-6 rounded-lg text-xl hover:bg-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-purple-700 py-2 px-6 rounded-lg text-xl hover:bg-gray-200 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
