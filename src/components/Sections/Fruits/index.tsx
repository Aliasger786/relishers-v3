import { PrevNext as PrevNextButtons, Title } from ".."
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MealItem } from "../../FoodItem/MealItem"
import Container from "../../Container"
import { FilterFood } from "../../../utils/filters"
import { useState } from "react"
import { FaAppleAlt, FaCartArrowDown, FaLeaf, FaUtensils } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const Specials = () => {
  const specials = FilterFood("fruits");
  const [scrollValue, setScrollValue] = useState(0);

  return (
    <section className="w-full my-8 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl shadow-lg p-4">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <GiFruitBowl className="text-3xl text-orange-500 animate-bounce" />
          <Title title="Today's Special Dishes" center />
          <FaLeaf className="text-xl text-green-500 animate-spin-slow" />
        </div>
        <PrevNextButtons onNext={() => setScrollValue(10000)} onPrev={() => setScrollValue(-10000)} />
      </div>
      <p className="text-center text-lg text-gray-700 mb-6 font-medium">
        Enjoy our chef's handpicked special dishes, crafted with premium ingredients and bursting with flavor!
      </p>
      <Container className="bg-containerbg" scrollOffset={scrollValue} items={specials} />
      <div className="w-full flex justify-center mt-6">
        <p className="text-lg font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 drop-shadow-lg px-6 py-2 text-center">
          Order your favorite special dish now and enjoy exclusive offers!
        </p>
      </div>
    </section>
  );
};

export default Specials;