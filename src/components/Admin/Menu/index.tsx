import { FaSearch } from "react-icons/fa";
import { FoodItem } from "../../../../types";
import { SingleFoodItem } from "../../FoodItem";
import React, { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import AddFood from "../AddFood";
import { fetchFoodData } from '../../../utils/functions';

const Menu = () => {
    const [{ foodItems, showEditForm, editFood }, dispatch] = useStateValue();
    const [query, setQuery] = useState("");
    // Always use the latest foodItems from context for filtering
    const filteredFoodItems = React.useMemo(() => {
      if (!foodItems) return [];
      if (!query) return foodItems;
      return foodItems.filter((foodItem: FoodItem) =>
        foodItem.title.toLowerCase().includes(query.toLowerCase())
      );
    }, [foodItems, query]);

    const filterFood = () => {
      // No need to set state, filtering is handled by useMemo
    };
    const searchFood = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    };

    React.useEffect(() => {
      // Always fetch latest food items when the edit modal closes
      if (!showEditForm) {
        // Only fetch if modal just closed
        fetchFoodData(dispatch);
      }
    }, [showEditForm, dispatch]);

    if (showEditForm) {
      return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-40">
          <button
            className="absolute top-4 right-4 z-[100000] bg-white rounded-full shadow p-2 text-gray-700 hover:bg-gray-200 transition text-2xl font-bold"
            onClick={() => dispatch({ type: "TOGGLE_EDIT_FORM", showEditForm: false, editFood: null })}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative z-[100001] bg-white rounded-lg shadow-lg p-6 min-w-[350px] max-w-full w-full sm:w-[400px] md:w-[500px]">
            <AddFood editFood={editFood} />
          </div>
        </div>
      );
    }

  return (
    <div className="w-full flex flex-col justify-center">
      {/* search bar */}
      <div className="w-full flex justify-center p-2 bg-white mb-4 rounded-lg gap-2">
        <input
          className="w-full p-2 outline-none rounded-lg "
          type="text"
          placeholder="Search food"
          value={query}
          onChange={(e) => searchFood(e)}
        />
        {/* search button */}
        <button className="flex items-center justify-center gap-3 text-orange-700 font-bold py-2 px-4 rounded-lg"
          onClick={filterFood}
        >
          <FaSearch />
        </button>
        <button
          className="flex items-center justify-center gap-3 text-gray-600 font-bold py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => { setQuery(""); }}
        >
          Clear
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-3 overflow-x-hidden flex-wrap">
        {
            filteredFoodItems.map((item: FoodItem) => (
                <SingleFoodItem key={item.id} item={item} col admin />
            ))
        }
      </div>
    </div>
  );
};

export default Menu;
