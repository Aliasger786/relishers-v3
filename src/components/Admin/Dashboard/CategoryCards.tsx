import { Categories } from "../../../utils/categories"

const CategoryCards = () => {
  const category = Categories[Math.floor(Math.random() * Categories.length)];
  return (
    <div className="bg-red-500 min-h-[9rem] p-10 rounded-lg">
      {/* Category card content can go here */}
    </div>
  );
}

export default CategoryCards
