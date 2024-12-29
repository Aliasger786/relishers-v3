import React from "react";
import { BikeDelivery } from "../Assets";
import { motion } from "framer-motion";
const Left = () => {
  return (
    <div className="py-2 flex-1 flex flex-col items-start justify-center gap-3">
      <div className="flex items-center gap-2 justify-center bg-red-100 px-4 py-1 rounded-full">
        <p className="text-base text-red-500 font-bold">Fast Delivery</p>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
          <img
            src={BikeDelivery}
            alt="delivery"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
        <span className="text-red-600 text-[2.5rem] lg:text-[4.6rem]">HUNGRY?</span> Don't Worry
        <span className="text-red-600 text-[2.5rem] lg:text-[4.6rem]"> We'll Deliver!</span>
      </p>
      <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Enjoy delicious meals delivered right to your door. Indulge in your favorite dishes with just a few clicks. Experience the convenience and delight of online food ordering today!
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-gradient-to-br from-red-400 to-red-600 text-white w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
      >
        Order Now
      </motion.button>
    </div>
  );
};

export default Left;
