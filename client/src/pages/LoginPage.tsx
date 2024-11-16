import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <AuthForm onSubmit={handleLogin} buttonText="Login" isRegister={false} />
  );
};

export default LoginPage;
