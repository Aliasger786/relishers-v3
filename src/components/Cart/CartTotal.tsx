import {motion} from 'framer-motion'
import { useStateValue } from '../../context/StateProvider';

const CartTotal = ({checkoutState}: {checkoutState:any}) => {
  const [{cartTotal}] = useStateValue();
  return (
    <div className="w-full mt-2 md:mt-0 flex-1 rounded-2xl bg-white shadow-2xl px-8 py-4 flex flex-col items-center justify-evenly transition-all duration-300">
      <div className="w-full flex items-center justify-between mb-2">
        <p className="text-gray-600 text-base md:text-lg font-medium">Sub Total</p>
        <p className="text-gray-400 text-base md:text-lg">-</p>
        <p className="text-gray-800 text-base md:text-lg font-semibold"><span className="text-sm text-red-600">$</span> {cartTotal}</p>
      </div>
      <div className="w-full flex items-center justify-between mb-2">
        <p className="text-gray-600 text-base md:text-lg font-medium">Delivery</p>
        <p className="text-gray-400 text-base md:text-lg">-</p>
        <p className="text-gray-800 text-base md:text-lg font-semibold"><span className="text-sm text-red-600">$</span> {0.00}</p>
      </div>
      <div className="w-full border-b border-gray-200 my-2"></div>
      <div className="w-full flex items-center justify-between mb-4">
        <p className="text-gray-900 text-base md:text-lg uppercase font-bold">Total</p>
        <p className="text-gray-400 text-base md:text-lg">-</p>
        <p className="text-gray-900 text-base md:text-lg font-bold"><span className="text-sm text-red-600">$</span> {cartTotal}</p>
      </div>
      <motion.button onClick={() => checkoutState(true)} whileTap={{ scale: 0.96 }} className="w-full p-3 rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
        Checkout ${cartTotal}
      </motion.button>
    </div>
  )
}

export default CartTotal