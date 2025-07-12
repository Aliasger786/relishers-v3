import React from "react";
export type FoodCategory = {
  id: number;
  name: string;
  urlParam: string;
};

export type FoodCategories = FoodCategory[];

interface Props {
  categories: FoodCategories;
  action: (value: string) => void;
  selected: string;
}

const CategoriesSelector: React.FC<Props> = ({ categories, action, selected }) => (
  <select
    name="categories"
    id="categories"
    className="bg-transparent outline-none w-full capitalize text-base border-2 border-gray-200 p-2 rounded-md cursor-pointer"
    onChange={e => action(e.target.value)}
    value={selected}
  >
    <option value="" className="bg-white capitalize">
      {selected ? selected : "Select category"}
    </option>
    {categories.map((category) => (
      <option
        key={category.id}
        value={category.urlParam}
        className="text-base border-0 outline-none uppercase bg-white text-headingColor"
      >
        {category.name}
      </option>
    ))}
  </select>
);

export default CategoriesSelector;
