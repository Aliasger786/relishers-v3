import { Link, useNavigate } from "react-router-dom";
import ProviderAuth, { ImageBox } from ".";
import { toast } from "react-toastify";

import { motion } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { fetchUserCartData } from "../../utils/functions";
import { EMAILSIGNIN, /* ...other imports... */ } from "../../Firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({ onBack }: { onBack: () => void }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setError("");
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-red-500 mb-2">Forgot Password</h2>
      {sent ? (
        <>
          <p className="text-green-600 font-semibold">If an account exists for this email, a password reset link has been sent.</p>
          <button
            className="w-full mt-2 py-2 rounded bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300 transition"
            onClick={onBack}
          >
            Back to Login
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition focus:border-red-600 focus:outline-none"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
          <button
            className="w-full py-2 rounded bg-gradient-to-br from-red-400 to-red-500 text-white font-bold shadow hover:bg-red-600 transition disabled:opacity-60"
            onClick={handleSend}
            disabled={!email || loading}
          >
            {loading ? "Sending..." : "Send Password Reset"}
          </button>
          <button
            className="w-full mt-2 py-2 rounded bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300 transition"
            onClick={onBack}
            disabled={loading}
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const EmailAuth = () => {
    if (!user) {
      if (email.length > 0 && password.length > 0) {
        toast.promise(
          EMAILSIGNIN(email, password),
          {
            pending: "Signing in...",
            success: "Signin successful: WELCOME!",
            error: "Error signing account, Please try again🤗",
          }
        ).then((userData) => {
          // Signed in
          const user = userData[0]; 
          dispatch({
            type: "SET_USER",
            user: user,
          });
          localStorage.setItem("user", JSON.stringify(user));
          fetchUserCartData(user, dispatch);
          navigate("/");
        }
        ).catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage, { autoClose: 15000 });
        });
      } else {
        toast.warn("Please fill all the fields", { autoClose: 15000 });
      }
    }
  };

  return (
    <section className="w-full h-auto ">
      <div className="container md:py-10 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-3 text-gray-800">
          <ImageBox />
          <div className="w-full md:w-[30rem]">
            <form className="p-2">
              {showForgot ? (
                <ForgotPassword onBack={() => setShowForgot(false)} />
              ) : (
                <>
                  <ProviderAuth />
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
                      OR
                    </p>
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 active:text-red-800 duration-200 transition ease-in-out bg-transparent border-none p-0"
                      onClick={() => setShowForgot(true)}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.p
                    className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-red-400 to-red-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    onClick={EmailAuth}
                    whileHover={{ scale: 1.1 }}
                  >
                    Sign in
                  </motion.p>

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                      Don't have an account?
                    </p>
                  </div>
                  <Link to={"/register"}>
                    <motion.p
                      whileHover={{ scale: 0.99 }}
                      className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-red-400 to-red-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    >
                      Sign Up
                    </motion.p>
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
