import React, { useState, useEffect } from "react";
import { AssetUploader, Loader } from "../..";
import { BiCategory, BiFoodMenu } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdOutlineDataSaverOn,
  MdOutlineFastfood,
  MdOutlineFoodBank,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import {
  firebaseRemoveUploadedImage,
  firebaseSaveProduct,
  firebaseUpdateProduct
} from "../../../Firebase";
import { Categories } from "../../../utils/categories";
import CategoriesSelector from "./CategoriesSelector";
import { GiTakeMyMoney } from "react-icons/gi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";
import { fetchFoodData } from "../../../utils/functions";

const AddFood = ({ editFood }: { editFood?: any }) => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loaderMessage, setLoadermessage] = useState("");
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {
    if (editFood) {
      setTitle(editFood.title || "");
      setCalories(editFood.calories || "");
      setPrice(editFood.price || "");
      setImage(editFood.imageURL || null);
      setCategory(editFood.category || "");
      setQuantity(editFood.qty || "");
      setDescription(editFood.description || "");
    } else {
      setTitle("");
      setCalories("");
      setPrice("");
      setImage(null);
      setCategory("");
      setQuantity("");
      setDescription("");
    }
  }, [editFood]);

  const deleteImage = () => {
    setLoadermessage("Removing Photo......");
    firebaseRemoveUploadedImage(image, setImage, setLoading);
  };

  const saveItem = () => {
    setLoadermessage(`Saving Product ${title}.`);
    setLoading(true);
    if (!title || !calories || !price || !image || !category) {
      toast.error("Please fill all fields before saving product 🤗");
      setLoading(false);
      return;
    }
    const data = {
      id: editFood ? editFood.id : Date.now(),
      title,
      calories,
      category,
      description,
      price,
      imageURL: image,
      qty: quantity,
    };
    const savePromise = editFood
      ? firebaseUpdateProduct(data)
      : firebaseSaveProduct(data);
    toast
      .promise(savePromise, {
        pending: editFood ? "Updating Product..." : "Saving Product...",
        success: editFood ? "Product updated successfully" : "Product saved successfully",
        error: editFood ? "Error updating product, Please try again🤗" : "Error saving product, Please try again🤗",
      })
      .then(() => {
        clearForm();
        setLoading(false);
        fetchFoodData(dispatch);
        if (editFood) {
          dispatch({ type: "TOGGLE_EDIT_FORM", showEditForm: false, editFood: null });
        }
      })
      .catch(() => {});
    setLoadermessage("");
    setLoading(false);
  };

  const clearForm = () => {
    setTitle("");
    setCalories("");
    setPrice("");
    setImage(null);
    setQuantity("");
    setDescription("");
  };

  const validateNumber = (value: any) => {
    if (isNaN(value)) {
      toast.error("Please enter a valid number", { toastId: 123 });
      return "";
    }
    return value;
  };

  return (
    <div className="w-full h-fullflex items-center justify-center">
      <div className="border w-full flex border-gray-300 items-center rounded-lg p-4 flex-col justify-center gap-4">
          <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineFastfood className="text-xl text-gray-600" />
            <input
              type="text"
              required
              placeholder="Enter food name"
              autoFocus
              className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <BiCategory className="text-xl text-gray-600" />
              <CategoriesSelector
                categories={Categories}
                action={setCategory}
                selected={category}
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdOutlineProductionQuantityLimits className="text-gray-600 text-2xl" />
              <input
                type="text"
                required
                placeholder="Quantity"
                autoFocus
                className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                value={quantity}
                onChange={e => setQuantity(validateNumber(e.target.value))}
              />
            </div>
          </div>
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px] md:h-[420px] round-lg">
            {loading ? (
              <Loader progress={loaderMessage} />
            ) : image ? (
              <div className="relative h-full">
                <img
                  src={image}
                  alt="uploaded food"
                  className="w-full h-full object-cover"
                />
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  whileHover={{ scale: 1.2 }}
                  title="Remove Photo"
                  className="absolute bottom-3 right-3 rounded-full p-2 md:p-5 bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                  onClick={deleteImage}
                >
                  <MdDeleteOutline className="text-white" />
                </motion.button>
              </div>
            ) : (
              <AssetUploader
                action={setImage}
                progressHandler={setLoadermessage}
                promise={setLoading}
              />
            )}
          </div>
          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdOutlineFoodBank className="text-gray-600 text-2xl" />
              <input
                type="text"
                required
                placeholder="Calories"
                autoFocus
                className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                value={calories}
                onChange={e => setCalories(e.target.value)}
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <GiTakeMyMoney className="text-gray-600 text-2xl" />
              <input
                type="text"
                required
                placeholder="Price"
                autoFocus
                className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
                value={price}
                onChange={e => setPrice(validateNumber(e.target.value))}
              />
            </div>
          </div>
          <div className="w-full py-3 border-b border-gray-300 flex items-center gap-2">
            <BiFoodMenu className="text-xl text-gray-600" />
            <input
              type="text"
              required
              placeholder="Short Description"
              autoFocus
              className="h-full w-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        {editFood ? (
          <div className="w-full flex items-center justify-end gap-3 mt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex justify-center items-center gap-2 border-none outline-none rounded bg-orange-500 px-8 py-2 text-lg text-white"
              onClick={saveItem}
            >
              <MdOutlineDataSaverOn /> Update
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="border-none outline-none rounded bg-gray-300 px-8 py-2 text-lg text-gray-700 font-bold hover:bg-gray-400 transition"
              onClick={() => dispatch({ type: "TOGGLE_EDIT_FORM", showEditForm: false, editFood: null })}
            >
              Close
            </motion.button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="ml-0 flex justify-center items-center gap-2 flex-row-reverse md:ml-auto w-full md:w-auto border-none outline-none rounded bg-orange-500 px-12 py-2 text-lg text-white"
              onClick={saveItem}
            >
              <MdOutlineDataSaverOn /> Save
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFood;
