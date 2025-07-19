import { AiFillDashboard } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdAddModerator, MdOutlineFavoriteBorder, MdRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";
import { FaCogs } from "react-icons/fa";
import AddFood from "./AddFood";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Menu from "./Menu";
import Orders from "./Orders";
import { useStateValue } from "../../context/StateProvider";

const SidenavMenu = ({ activePage, setActivePage, setPageContent }: { activePage: string; setActivePage: any; setPageContent: any }) => (
  <motion.nav
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    className="space-y-2 w-full"
  >
    <NavItem activePage={activePage} svgIcon={<AiFillDashboard />} title="Dashboard" setActivePage={setActivePage} setPageContent={setPageContent} pageContent={<Dashboard />} />
    <NavItem activePage={activePage} svgIcon={<MdAddModerator />} title="Add Food" setActivePage={setActivePage} setPageContent={setPageContent} pageContent={<AddFood />} />
    <NavItem activePage={activePage} svgIcon={<MdRestaurantMenu />} title="Menu" setActivePage={setActivePage} setPageContent={setPageContent} pageContent={<Menu />} />
    <NavItem activePage={activePage} svgIcon={<MdOutlineFavoriteBorder />} title="Orders" setActivePage={setActivePage} setPageContent={setPageContent} pageContent={<Orders />} />
    <NavItem activePage={activePage} svgIcon={<FiUsers />} title="Users" setActivePage={setActivePage} setPageContent={setPageContent} pageContent={<Users />} />
    <NavItem activePage={activePage} svgIcon={<FaCogs />} title="Settings" setActivePage={setActivePage} setPageContent={setPageContent} pageContent={<div className="w-full flex items-center justify-center">Settings</div>} />
  </motion.nav>
);

const NavItem = ({ activePage, svgIcon, title, setActivePage, setPageContent, pageContent }: { activePage: string; setActivePage: any; svgIcon: any; title: string; setPageContent: any; pageContent: JSX.Element }) => {
  const handleClick = () => {
    setActivePage(title);
    setPageContent(pageContent);
  };
  const [{ users, foodItems }] = useStateValue();
  return (
    <motion.div
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
      className={`flex items-center no-underline text-blue-50 hover:text-blue-100 p-3 rounded-md cursor-pointer bg-blue-500 bg-opacity-80 hover:bg-blue-600 shadow-lg backdrop-blur-md transition-all duration-300 ${activePage === title ? "bg-blue-800 bg-opacity-90 ring-2 ring-blue-300" : ""}`}
    >
      <p className="font-bold text-xl drop-shadow-lg">{svgIcon}</p>
      <div className="flex items-center justify-center gap-10 font-bold pl-3">
        {title}
        {title === "Menu" && (
          <div className="w-5 h-5 rounded-full bg-blue-700 bg-opacity-80 flex items-center justify-center cursor-pointer shadow-md">
            <p className="text-sm text-white font-semibold">
              {foodItems?.length}
            </p>
          </div>
        )}
        {title === "Users" && (
          <div className="w-5 h-5 rounded-full bg-blue-700 bg-opacity-80 flex items-center justify-center cursor-pointer shadow-md">
            <p className="text-sm text-white font-semibold">
              {users?.length}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SidenavMenu
