import React from "react";
import { motion } from "framer-motion";
import { foodItemsStatic } from "../../../types";
import { Hm } from "../Assets";

const StaticsImages: React.FC<foodItemsStatic> = ({ items }) => {
  return (
    <div className="w-full h-full absolute flex items-center justify-center">
      <img src={Hm} alt="Hero" className="max-w-xl" />
    </div>
  );
};

export default StaticsImages;
