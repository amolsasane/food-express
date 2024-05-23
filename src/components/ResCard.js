import { RES_LOGO_LINK } from "../utils/constants";

function ResCard(props) {
  const { resData } = props;
  const { name, locality, cuisines, avgRating, cloudinaryImageId, id } =
    resData.info;
  return (
    <div
      data-testid="resCard"
      className="w-[17rem] p-6 rounded-lg transition-transform duration-300 ease-in-out hover:transform hover:scale-110"
    >
      <img
        className="rounded-lg w-[700px] h-[150px] object-cover"
        alt="Restaurant Image"
        src={RES_LOGO_LINK + cloudinaryImageId}
      />
      <h3 className="font-bold p-2">{name}</h3>
      <p className="pl-2">{locality}</p>
      <p className="pl-2">{cuisines.join(", ")}</p>
      <p className="pl-2">{avgRating} Stars</p>
    </div>
  );
}

export const WithLabel = (ResCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-orange-500 text-white p-2 rounded-tl-sm rounded-bl-sm rounded-tr-lg rounded-br-lg   z-10">
          Free Delivery
        </label>
        <ResCard {...props} />
      </div>
    );
  };
};

export default ResCard;
