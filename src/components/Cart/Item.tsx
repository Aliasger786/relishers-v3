import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { cartItem } from "../../../types";
import { deleteCartItem, getFoodyById, updateCartItemQty } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const CartItem = ({ item }: { item: cartItem }) => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue();
  const { id, fid, qty } = item;
  const foodItem = getFoodyById(foodItems, fid);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full p-2 px-3 rounded-2xl bg-white shadow-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] grid grid-cols-[2fr_1fr_0.7fr] items-center gap-3 cursor-pointer transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Details Section */}
      <div className="flex items-center gap-3">
        <img
          src={foodItem?.imageURL}
          alt={foodItem?.title}
          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        />
        <div className="flex flex-col gap-1 ">
          <p className="text-base text-gray-800 font-bold drop-shadow-md">{foodItem?.title}</p>
          <p className="text-sm block text-gray-600 font-semibold">
            <span className="text-xs text-red-600">$</span> {foodItem?.price}
          </p>
        </div>
      </div>
      {/* Quantity Section (horizontal) */}
      <div className="group flex flex-row items-center justify-center gap-2 cursor-pointer bg-gray-100 rounded-lg px-2 py-1 shadow-md min-w-0 w-fit max-w-[120px]">
        <motion.div
          className=""
          whileTap={{ scale: 0.75 }}
          onClick={qty > 1 ? () => updateCartItemQty(cartItems, foodItems, item, dispatch, -1) : () => {}}
        >
          <BiMinus className="text-gray-700 text-lg" />
        </motion.div>
        <span className="text-sm text-gray-800 w-6 h-6 rounded bg-gray-200 flex items-center justify-center cursor-default font-semibold shadow-inner">
          {qty}
        </span>
        <motion.div
          className=""
          whileTap={{ scale: 0.75 }}
          onClick={() => updateCartItemQty(cartItems, foodItems, item, dispatch, 1)}
        >
          <BiPlus className="text-gray-700 text-lg" />
        </motion.div>
      </div>
      {/* Remove Button Section */}
      <div className="flex items-center justify-center">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="text-sm text-gray-50 w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors duration-200"
          onClick={() => setShowConfirm(true)}
        >
          <MdDelete />
        </motion.div>
      </div>
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
              Are you sure you want to remove this item?
            </p>
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
                onClick={() => {
                  deleteCartItem(cartItems, foodItems, item, dispatch);
                  setShowConfirm(false);
                }}
              >
                Yes, Remove
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
    </div>
  );
};

export default CartItem;
