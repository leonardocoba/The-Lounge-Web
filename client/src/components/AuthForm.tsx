import React, { useState } from "react";

interface AuthFormProps {
  onSubmit: (
    email: string,
    password: string,
    username?: string,
    confirmPassword?: string
  ) => void;
  buttonText: string;
  isRegister?: boolean; // Prop to differentiate between login and register
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  buttonText,
  isRegister = false,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      onSubmit(email, password, username, confirmPassword);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {buttonText}
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Username Field (Only for Registration) */}
        {isRegister && (
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
        )}

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Field (Only for Registration) */}
        {isRegister && (
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 transition"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
