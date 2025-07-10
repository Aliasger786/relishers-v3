import React, { useEffect, useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { FoodItem } from "../../../../types";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";

const Menu = ({title}:{title?:string}) => {
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Filtered food items based on filter and search query
  const filteredFoodItems = useMemo(() => {
    let items = filter === "all" ? foodItems : FilterFood(filter);
    if (!items) return [];
    if (!query) return items;
    return items.filter((foodItem: FoodItem) =>
      foodItem.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [foodItems, filter, query]);

  return (
    <section className="w-full my-5" id="menu">
      <div className="w-full flex items-center justify-center">
        <Title title={title || 'Relishers Menu'} center />
      </div>
      <Filters filter={filter} setFilter = {setFilter} />
      {/* Search bar for food items */}
      <div className="w-full flex justify-center p-2 bg-white mb-4 rounded-lg gap-2 max-w-xl mx-auto">
        <input
          className="w-full p-2 outline-none rounded-lg"
          type="text"
          placeholder="Search food"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="flex items-center justify-center gap-3 text-orange-700 font-bold py-2 px-4 rounded-lg" onClick={() => {}}>
          <FaSearch />
        </button>
        <button
          className="flex items-center justify-center gap-3 text-gray-600 font-bold py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => setQuery("")}
        >
          Clear
        </button>
      </div>
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={filteredFoodItems}
      />
    </section>
  );
};

export default Menu;
