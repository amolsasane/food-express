import { MENU_ITEM_API } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MenuItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const getItemCount = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const incrementCount = (item) => {
    dispatch(addItem(item));
  };

  const decrementCount = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      {items.map((item) => {
        const itemId = item.card.info.id;
        const itemCount = getItemCount(itemId);

        return (
          <div
            key={itemId}
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
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </p>
              <p className="text-xs text-gray-500">
                {item.card.info.description}
              </p>
            </div>
            <div className="flex justify-center w-20% my-auto relative">
              <img
                className="w-[7rem] h-[5rem] object-cover rounded-lg"
                src={MENU_ITEM_API + item.card.info.imageId}
              />
              <div className="absolute mt-16 flex items-center justify-center">
                {itemCount === 0 ? (
                  <button
                    className="bg-white border add-btn-hover-pulse shadow-md shadow-gray-400 border-gray-300 text-green-600 text-center rounded-md px-4 py-1 text-sm font-bold transition duration-200 hover:bg-green-50"
                    onClick={() => incrementCount(item)}
                  >
                    ADD
                  </button>
                ) : (
                  <div className="flex items-center border border-gray-300 shadow-md shadow-gray-400 rounded-md overflow-hidden">
                    <button
                      className="bg-white text-center px-3 py-1 text-red-600 text-sm font-bold hover:bg-red-100"
                      onClick={() => decrementCount(item)}
                    >
                      -
                    </button>

                    <span className="text-gray-500 text-sm font-bold bg-white px-3 py-1">
                      {itemCount}
                    </span>

                    <button
                      className="bg-white text-center px-3 py-1 text-green-600 text-sm font-bold hover:bg-green-100"
                      onClick={() => incrementCount(item)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemList;
