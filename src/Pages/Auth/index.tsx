import "react-toastify/dist/ReactToastify.css";

import { AuthImg } from "../../components/Assets";
import {
  // GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { AUTHPROVIDER } from "../../Firebase";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { fetchUserCartData } from "../../utils/functions";

const ProviderAuth = () => {
  const GOOGLE_PROVIDER = new GoogleAuthProvider();
  // const GITHUB_PROVIDER = new GithubAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const AUTH = async ({ provider }: { provider: any }) => {
    if (!user) {
      toast
        .promise(AUTHPROVIDER(provider), {
          pending: "Signing in...",
          success: "Signin successful",
          error: "Error Signing in, Please try again🤗",
        })
        .then(({ refreshToken, userData }) => {
          // Signed in
          const user = userData[0];
          // const userData = getUserData(user);
          dispatch({
            type: "SET_USER",
            user: user,
          });
          fetchUserCartData(user, dispatch);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage, { autoClose: 15000 });
        });
    }
  };
  return (
    <div className="flex items-center justify-center gap-5 text-center">
      <motion.p
        whileHover={{ scale: 1.1 }}
        className="flex items-center w-36 h-10 bg-white justify-center rounded text-headingColor px-5 cursor-pointer shadow-sm hover:bg-slate-100"
        onClick={() => AUTH({ provider: GOOGLE_PROVIDER })}
      >
        <FcGoogle className="text-xl w-5 mr-1" />
        <span>Google</span>
      </motion.p>
    </div>
  );
};

export const ImageBox = () => {
  return (
    <div className="hidden md:w-8/12 lg:w-6/12 mb-12 md:mb-0 md:flex ">
      <motion.img
        whileHover={
          {
            rotate: [0, -10, 10, -10, 0],
            // duration: 0.5,
          }
        }
        src={AuthImg}
        className="w-96 cursor-pointer"
        alt="logo-login"
      />
    </div>
  );
};

export default ProviderAuth;
