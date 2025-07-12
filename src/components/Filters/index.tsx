import { motion } from "framer-motion";
import Button from "./Button";
import { Categories } from "../../utils/categories";
import { FoodCategory } from "../../../types";
import { BiRestaurant } from "react-icons/bi";

const Filters = ({ filter, setFilter }: { filter: string; setFilter: (val: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    className="w-full py-10 flex items-center justify-start lg:justify-center h-auto gap-4 md:gap-8 px-2 overflow-x-scroll scrollbar-hidden scroll-smooth"
  >
    <Button category={{ id: 666, name: "All", urlParam: "all", icon: <BiRestaurant /> }} filter={filter} setFilter={setFilter} />
    {Categories.map((category: FoodCategory) => (
      <Button key={category.id} category={category} filter={filter} setFilter={setFilter} />
    ))}
  </motion.div>
);

export default Filters;
