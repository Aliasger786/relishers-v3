import {
  GiFruitTree,
  GiChickenOven,
  GiBeerBottle,
  GiBowlOfRice,
  GiCupcake,
  GiCookingPot,
} from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { FaFish } from "react-icons/fa";

export const Categories = [
  { id: 1, name: "Chicken", urlParam: "chicken", icon: <GiChickenOven /> },
  { id: 7, name: "Rice", urlParam: "rice", icon: <GiBowlOfRice /> },
  { id: 8, name: "Curry", urlParam: "curry", icon: <GiCookingPot /> },
  { id: 6, name: "Fish", urlParam: "fish", icon: <FaFish /> },
  { id: 3, name: "Soft Drinks", urlParam: "drinks", icon: <GiBeerBottle /> },
  { id: 4, name: "Desserts", urlParam: "desserts", icon: <GiCupcake /> },
  { id: 5, name: "Icecreams", urlParam: "icecreams", icon: <MdOutlineIcecream /> },
  { id: 2, name: "Fruits", urlParam: "fruits", icon: <GiFruitTree /> },
];
