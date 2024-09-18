import { useContext } from "react";
import CommonForm from "../../components/common-form";
import { loginFormControls } from "../../config";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { loginFormData, setLoginFormData, loginWithFirebase, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function handleLoginOnSubmit(event) {
    event.preventDefault();

    loginWithFirebase().then((result) => {
      console.log(result, "result12345");
      if (result) {
        setLoading(false);
        navigate("/profile");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="w-full max-w-sm mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Please log in to continue
        </p>
        <CommonForm
          formControls={loginFormControls}
          formData={loginFormData}
          setFormData={setLoginFormData}
          buttonText={"Login"}
          onSubmit={handleLoginOnSubmit}
          buttonClassName="mt-6 w-full py-3 px-6 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-md hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}

export default LoginPage;
