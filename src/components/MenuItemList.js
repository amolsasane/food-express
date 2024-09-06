import { MENU_ITEM_API } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
            {item.card.info.isBestseller && (
              <div className="text-orange-600 text-sm font-bold mb-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-orange-500 mr-1"
                />
                Bestseller
              </div>
            )}

            <p className="font-bold flex mb-1">
              <span>
                {item.card.info.itemAttribute.vegClassifier === "VEG" ? (
                  <div className="border-2 border-green-600 rounded-md px-1 pb-[1px] text-xs mr-2 text-green-600 w-fit">
                    ⬤
                  </div>
                ) : (
                  <div className="border-2 border-red-600 rounded-md px-[4px] pb-[2px] text-xs mr-2 text-red-600 w-fit">
                    ▲
                  </div>
                )}
              </span>
              {item.card.info.name}
            </p>
            <p className="mb-2">
              ₹{" "}
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </p>
            <p className="text-xs text-gray-500">
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
