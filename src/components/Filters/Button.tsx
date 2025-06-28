import { motion } from "framer-motion";
import { MdOutlineFastfood } from "react-icons/md";
import { FoodCategory } from "../../../types";

const Button = ({
  category,
  filter,
  setFilter,
}: {
  category: FoodCategory;
  filter: string;
  setFilter: any;
}) => {
  return (
    <motion.div
      onClick={() => setFilter(category.urlParam)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group ${
        category.urlParam === filter
          ? "bg-gradient-to-br from-red-500 to-red-600"
          : "bg-gradient-to-br from-gray-200 to-gray-300"
      } w-28 min-w-[7rem] h-32 cursor-pointer rounded-xl shadow-md flex flex-col gap-3 items-center justify-center transition-all duration-300 ease-in-out`}
    >
      <div
        className={`w-12 h-12 rounded-full ${
          category.urlParam === filter
            ? "bg-white"
            : "bg-gradient-to-br from-gray-300 to-gray-400"
        } flex items-center justify-center shadow-md`}
      >
        <span
          className={`${
            category.urlParam === filter
              ? "text-red-500"
              : "text-gray-600 group-hover:text-red-500"
          } text-2xl`}
        >
          {category.icon || <MdOutlineFastfood />}
        </span>
      </div>
      <p
        className={`text-sm font-semibold ${
          category.urlParam === filter
            ? "text-white"
            : "text-gray-700 group-hover:text-red-500"
        }`}
      >
        {category.name}
      </p>
    </motion.div>
  );
};

export default Button;
