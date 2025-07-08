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
          onClick={() => deleteCartItem(cartItems, foodItems, item, dispatch)}
        >
          <MdDelete />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
