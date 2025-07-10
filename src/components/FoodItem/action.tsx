import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { addToCart, deleteFood } from "../../utils/functions";
import { MdAddShoppingCart, MdDeleteForever, MdClose, MdShoppingBasket } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { FoodItem } from "../../../types";
import { useNavigate } from "react-router-dom";
import AddFood from "../Admin/AddFood";

const Action = ({ food, admin }: { food: FoodItem; admin?: boolean }) => {
  const [{ cartItems, foodItems, user }, dispatch] = useStateValue();
  const [showConfirm, setShowConfirm] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-2">
        {admin ? (
          <>
            <motion.div
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.2 }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-600 flex items-center justify-center cursor-pointer"
              title="Edit"
              onClick={() => dispatch({ type: "TOGGLE_EDIT_FORM", showEditForm: true, editFood: food })}
            >
              <BiEditAlt className="text-white md:text-xl" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.2 }}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
              onClick={() => setShowConfirm(true)}
              title="Delete"
            >
              <MdDeleteForever className="text-white md:text-xl" />
            </motion.div>
            {showConfirm && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative" style={{ minWidth: '320px', minHeight: '180px' }}>
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                    onClick={() => setShowConfirm(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <p className="text-lg font-semibold text-gray-800 mb-4 mt-4">
                    Are you sure you want to delete this item?
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
                      onClick={() => {
                        deleteFood(food, foodItems, dispatch);
                        setShowConfirm(false);
                      }}
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200 border-2 border-white"
            onClick={() => addToCart(cartItems, foodItems, user, food.id, dispatch)}
            title="Add to cart"
          >
            <MdShoppingBasket className="text-white md:text-2xl drop-shadow-lg" />
            {/* Poping + icon */}
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md border border-red-500 animate-bounce select-none">+</span>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Action;
