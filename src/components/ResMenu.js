import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import MenuCatagory from "../components/MenuCatagory";
import { useState } from "react";

const ResMenu = () => {
  const [showIndex, setShowIndex] = useState(0);

  const { ResId } = useParams();

  const resInfo = useResMenu(ResId);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const catagories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="res-menu">
      <h1 className="font-bold text-[2rem] pt-4 text-center">{name}</h1>
      <h3 className="pb-4  text-lg text-center">
        {cuisines.join(", ")} - {costForTwoMessage}
      </h3>
      <h2 className="text-center text-lg font-bold">Menu</h2>
      {catagories.map((catagory, index) => (
        <MenuCatagory
          key={catagory.card.card.title}
          data={catagory.card.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default ResMenu;
