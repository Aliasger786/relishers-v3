import { PrevNext as PrevNextButtons, Title } from ".."
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MealItem } from "../../FoodItem/MealItem"
import Container from "../../Container"
import { FilterFood } from "../../../utils/filters"
import { useState } from "react"
;
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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

const Fruits = () => {
  const fruits = FilterFood("fruits")
  const [scrollValue, setScrollValue] = useState(0)

  return (
    <section className="w-full my-5">
        <div className="w-full flex items-center justify-between">
          <Title title="Our Hot Dishes" />
          <PrevNextButtons onNext={() => setScrollValue(10000)} onPrev = {() => setScrollValue(-10000)} />
        </div>
        <Container className="bg-containerbg" scrollOffset = {scrollValue} items = {fruits} />
    </section>
  )
}

export default Fruits