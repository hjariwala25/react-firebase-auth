import { useContext } from "react";
import CommonForm from "../../components/common-form";
import { AuthContext } from "../../context";
import { registerFormControls } from "../../config";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebaseConfig";

function RegisterPage() {
  const {
    registerFormData,
    setRegisterFormData,
    registerWithFirebase,
    setLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // console.log(registerFormData);

  function handleRegisterFormSubmit(event) {
    event.preventDefault();

    registerWithFirebase()
      .then((result) => {
        updateProfile(result.user, {
          displayName: registerFormData.name,
        }).then(() => {
          // console.log(
          //   auth.currentUser.displayName,
          //   "auth.currentUser.displayName"
          // );

          if (auth.currentUser.displayName) {
            setLoading(false);
            navigate("/profile");
          }
        });

        // navigate("/profile");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="w-full max-w-sm mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back!
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Please register to continue
        </p>
        <CommonForm
          formControls={registerFormControls}
          formData={registerFormData}
          setFormData={setRegisterFormData}
          onSubmit={handleRegisterFormSubmit}
          buttonText={"Save"}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
