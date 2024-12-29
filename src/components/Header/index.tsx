import { Avatar, Logo } from "../Assets";
import { Link } from "react-router-dom";
import { HeadingTitle } from "../Sections"

import DropDown from "./DropDown";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LoginAction from "./LoginAction";
import MobileNav from "./mobile-nav";
import Navigations from "./Navigations";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
const Header = () => {
  // 
  // const firebaseAuth = getAuth(app);
  const [{ user }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);


  return (
    <header className="w-screen">
      {/* Tablet and Desktop */}
      <div className="hidden md:flex w-full justify-between items-center px-12">
        <Link to={"/"}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={Logo} alt="Logo" className="md:w-12 lg:w-24 object-cover rounded-full shadow-white" />
            <HeadingTitle title="Relishers" />
          </motion.div>
        </Link>

        <Navigations />

        {user ? (
          <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className=" flex items-center justify-center"
            >
              <img
                src={user.photoURL || Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"
                alt="profile"
              />
              <p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                <RiArrowDropDownLine />
              </p>
            </motion.div>
            <DropDown user={user} />
          </div>
        ) : (
          <LoginAction text={"Login"} />
        )}
      </div>

      {/* Mobile */}
      <motion.div
        className="flex md:hidden w-full p-0 items-center justify-between"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {isOpenMobileNav ? (
          <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />
        ) : (
          <div className="p-5 flex items-center justify-between w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className=" flex items-center justify-center"
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              <HiOutlineMenuAlt2 className="text-headingColor text-4xl" />
            </motion.div>
            <Link to={"/"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={Logo} alt="Logo" className="w-8 object-cover" />
                <p className="text-headingColor text-xl font-bold">
                  Relishers
                </p>
              </motion.div>
            </Link>
            {user ? (
              <div
                className={`flex items-center gap-3 px-3 py-1 rounded-lg relative`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="group flex items-center justify-center"
                >
                  <img
                    src={user?.photoURL ? user.photoURL : Avatar}
                    className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
                    alt="user-profile"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                    <RiArrowDropDownLine />
                  </p>
                  {isOpen && <DropDown user={user}  />}
                </motion.div>
              </div>
            ) : (
              <LoginAction mobile />
            )}
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default Header;
