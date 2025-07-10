import { FoodItem } from "../../../types";
import { motion } from "framer-motion";
import Action from "./action";

export const SingleFoodItem = ({
  item,
  col,
  admin,
}: {
  item: FoodItem;
  col?: boolean;
  admin?: boolean;
}) => {
  const { id, title, price, calories, imageURL, description } = item;

  return (
    <motion.div
      whileTap={{ rotate: [0, -1, 1, -1, 0] }}
      className={`relative ${
        !col ? "w-[275px] min-w-[275px]" : "w-[320px] min-w-[320px]"
      } md:w-[300px] md:min-w-[300px] ${
        col ? "my-12" : "my-2 md:my-5"
      } h-auto bg-gradient-to-br from-white to-gray-200 rounded-lg p-4 px-5 backdrop-blur-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
    >
      <div className="w-full flex items-center justify-between">
        <motion.img
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 1.1 }}
          className="w-40 h-40 md:w-48 md:h-40 -mt-8 object-contain cursor-pointer transition-transform duration-300"
          alt={description}
          src={imageURL}
        />
        <Action food={item} admin={admin} />
      </div>
      <div className="w-full flex flex-col items-start mt-4">
        <p className="text-headingColor font-bold text-lg">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
        {admin && (
          <p className="mt-1 text-sm text-gray-500">{calories} calories</p>
        )}
        <div className="flex items-center justify-between gap-8 mt-3 w-full">
          <p className="text-lg text-headingColor font-semibold">
            <span className="text-sm text-red-600">$</span> {price}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
