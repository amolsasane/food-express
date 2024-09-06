import MenuItemList from "./MenuItemList";

const Catagory = ({
  data,
  showItems,
  setShowIndex,
  showVeg,
  showNonVeg,
  showBestseller,
}) => {
  const filteredMenu = showVeg
    ? data.itemCards.filter(
        (item) => item.card?.info?.itemAttribute?.vegClassifier === "VEG"
      )
    : showNonVeg
    ? data.itemCards.filter(
        (item) => item.card?.info?.itemAttribute?.vegClassifier === "NONVEG"
      )
    : showBestseller
    ? data.itemCards.filter((item) => item.card?.info?.isBestseller === true)
    : data.itemCards;

  if (filteredMenu.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto my-4 p-2 shadow-lg">
      <div
        className="flex justify-between my-2 cursor-pointer"
        onClick={setShowIndex}
      >
        <span className="font-bold">
          {data.title} ({filteredMenu.length})
        </span>
        <span>{showItems ? "⮝" : "⮟"}</span>
      </div>
      <div>{showItems && <MenuItemList items={filteredMenu} />}</div>
    </div>
  );
};

export default Catagory;
