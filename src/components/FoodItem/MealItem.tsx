import { useContext } from 'react';
import { Meal1 } from "../Assets";
import { motion } from "framer-motion";
export const MealItem = () => {

  return (
    <a href="#">
      <div className="border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card-item mr-8 h-50">
        <img className="rounded-t-lg" src={Meal1} alt="" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-gradient-to-br from-red-400 to-red-600 text-white w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </a>
  );
}