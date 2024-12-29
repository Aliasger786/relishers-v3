import { motion } from "framer-motion";
import { MdLogin, MdClose } from "react-icons/md";
import { emptyCart, hideCart } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";
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
            {/* <EmptyCart /> */}
            <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
          <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button data-modal-toggle="default-modal" type="button" className='bg-gradient-to-br from-red-400 to-red-600 text-white w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Checkout</button>
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
