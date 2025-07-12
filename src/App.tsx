import "react-toastify/dist/ReactToastify.css";
import {
  About,
  Admin,
  Home,
  Login,
  Menu,
  Profile,
  Services,
  Signup,
} from "./Pages";
import { Cart, Footer, Header, Modal } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  calculateCartTotal,
  dispatchUsers,
  fetchFoodData,
  fetchUserCartData,
  isAdmin,
} from "./utils/functions";
import { AnimatePresence } from "framer-motion";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ showCart, showContactForm, user, foodItems, cartItems, adminMode }, dispatch] = useStateValue();

  useEffect(() => {
    fetchFoodData(dispatch);
    dispatchUsers(dispatch);
    if (user) fetchUserCartData(user, dispatch);
  }, []);

  useEffect(() => {
    if (foodItems && cartItems.length > 0) {
      calculateCartTotal(cartItems, foodItems, dispatch);
    }
  }, [cartItems, foodItems, dispatch]);

  const isAdminMode = adminMode && isAdmin(user);

  return (
    <AnimatePresence exitBeforeEnter>
      <ToastContainer />
      <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
        {showCart && <Modal />}
        {showContactForm && <Contact />}
        {!isAdminMode && <Header />}
        <main
          className={`${!isAdminMode && "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"} w-full h-auto`}
          onClick={() => {}}
        >
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />
          </Routes>
          {!isAdminMode && <Footer />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
