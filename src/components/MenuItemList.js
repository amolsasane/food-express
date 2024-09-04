import { MENU_ITEM_API } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const MenuItemList = ({ items }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex justify-between pt-4 pb-5 px-3 border-t-2"
        >
          <div className="w-[80%] mr-5">
            <p className="font-bold">{item.card.info.name}</p>
            <p className="mb-2">
              ₹{" "}
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </p>
            <p className="text-xs text-gray-400">
              {item.card.info.description}
            </p>
          </div>
          <div className="flex justify-center w-20% my-auto">
            <img
              className="w-[7rem] h-[5rem] object-cover rounded-lg"
              src={MENU_ITEM_API + item.card.info.imageId}
            />
            <button
              className="bg-green-100 text-center rounded-md w- px-2 py-1 text-green-600 text-sm font-bold shadow-lg absolute mt-16"
              onClick={() => addToCartHandler(item)}
            >
              ADD +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemList;
