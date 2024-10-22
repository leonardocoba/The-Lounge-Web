import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (
    email: string,
    password: string,
    username?: string,
    confirmPassword?: string
  ) => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser && username) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }

      alert("Registration successful!");
      navigate("/Login");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      buttonText="Register"
      isRegister={true}
    />
  );
};

export default RegisterPage;
