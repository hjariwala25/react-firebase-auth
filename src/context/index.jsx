import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthState({ children }) {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Register function to create a user with Firebase
  function registerWithFirebase() {
    setLoading(true);
    const { email, password } = registerFormData;
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login function to authenticate an existing user
  function loginWithFirebase() {
    setLoading(true);
    const { email, password } = loginFormData;
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function handleLogout() {
    return signOut(auth);
  }

  // Check for authentication state change and set the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser, "currentUser");
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Navigate to profile when user is logged in
  useEffect(() => {
    if (user) navigate("/profile");
  }, [user, navigate]);

  // Display loading screen if the state is loading
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <h1 className="text-2xl font-semibold text-white">Loading! Please wait...</h1>
      </div>
    );

  // AuthContext.Provider wraps the entire app to provide auth state globally
  return (
    <AuthContext.Provider
      value={{
        registerFormData,
        setRegisterFormData,
        registerWithFirebase,
        loginFormData,
        setLoginFormData,
        loginWithFirebase,
        handleLogout,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
