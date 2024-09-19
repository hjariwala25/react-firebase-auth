import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

function AuthPage({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <h1 className="text-2xl font-semibold text-white">Loading! Please wait...</h1>
      </div>
    );

  if (user) return children;

  return <Navigate to={"/login"} />;
}

export default AuthPage;
