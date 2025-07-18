import { Logo } from "../Assets";
import SidenavMenu from "./SidenavMenu";
import { Link, useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { useStateValue } from "../../context/StateProvider";
import { logout, ToggleAdminMode } from "../../utils/functions";
import { motion } from "framer-motion";

const Sidenav = ({
  activePage,
  setActivePage,
  setPageContent,
}: {
  activePage: string;
  setActivePage: any;
  setPageContent: any;
}) => (
  <div className="flex md:flex-col w-full md:w-[20%] bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 bg-opacity-90 text-blue-50 px-3 py-4 justify-center items-center h-full shadow-2xl backdrop-blur-md">
    <SidenavHeader />
    <SidenavMenu
      activePage={activePage}
      setActivePage={setActivePage}
      setPageContent={setPageContent}
    />
    <SidenavFooter />
  </div>
);

const SidenavHeader = () => {
  const [{ adminMode }, dispatch] = useStateValue();
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      whileHover={{ scale: 1.1 }}
    >
      <Link
        onClick={() => ToggleAdminMode(dispatch, false)}
        to="/"
        className="flex items-center ml-1 pb-8 w-full justify-center"
      >
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        <p className="text-xl font-bold pl-1 no-underline text-orange-50 hover:text-orange-100">
          Relishers
        </p>
      </Link>
    </motion.div>
  );
};

const SidenavFooter = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      onClick={() => logout(user, dispatch, navigate)}
      className="flex items-center justify-center mt-auto px-3 gap-3 text-blue-50 cursor-pointer opacity-80 hover:opacity-100 bg-blue-700 rounded-lg shadow-lg backdrop-blur-md transition-all duration-300"
    >
      <AiFillLock className="font-bold text-xl text-blue-50 drop-shadow-lg" />
      <div>Logout</div>
    </motion.div>
  );
};

export default Sidenav;
