import { motion } from "framer-motion";
import { MdLogin, MdClose } from "react-icons/md";
import { emptyCart, hideCart } from "../../utils/functions";
import CartTotal from './CartTotal';
import { useStateValue } from "../../context/StateProvider";
import CartItem from './Item'
import EmptyCart from "../EmptyCart";

const Modal = () => {
  const [{  user, cartItems, foodItems }, dispatch] = useStateValue();

  return (
    <div id="default-modal" data-modal-show="true" aria-hidden="true" className="fixed inset-0 flex items-center justify-center z-[101]">
      <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
        <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
          <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
              My Cart
            </h3>
            <motion.div whileTap={{ scale: 0.8 }} onClick={() => hideCart(dispatch)}>
              <MdClose className="text-textColor text-2xl " />
            </motion.div>
          </div>
          <div className="p-6 space-y-6">
            {cartItems && cartItems.length > 0 ? (
              <>
                {cartItems.map((item:any, index:number) => (
                  <CartItem key={index} item={item} />
                ))}
                <CartTotal checkoutState={true} />
              </>
            ) : (
              <EmptyCart />
            )}
          </div>
          <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button data-modal-toggle="default-modal" type="button"
             className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
             onClick={() => hideCart(dispatch)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
