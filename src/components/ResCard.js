import { RES_LOGO_LINK } from "../utils/constants";

function ResCard(props) {
  const { resData } = props;
  const { name, locality, cuisines, avgRating, cloudinaryImageId, sla } =
    resData.info;

  return (
    <div
      data-testid="resCard"
      className="w-[12rem] md:w-[17rem] p-4 mb-6 rounded-2xl"
    >
      <img
        className="rounded-2xl w-[700px] h-[150px] object-cover"
        alt="Restaurant Image"
        src={RES_LOGO_LINK + cloudinaryImageId}
      />
      <h3 className="font-bold ml-2 mt-2 text-lg truncate">{name}</h3>
      <div className="ml-2 flex">
        <p className="font-bold">
          <span className="text-white rounded-full px-[4px] pb-[2px] mr-2 text-sm bg-green-600">
            ★
          </span>
          {avgRating}・
        </p>
        <p className="font-bold">{sla.slaString}</p>
      </div>
      <p className="ml-2 truncate">{cuisines.join(", ")}</p>
      <p className="ml-2">{locality}</p>
    </div>
  );
}

export const WithLabel = (ResCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute bg-orange-500 text-white p-2 rounded-tr-sm rounded-br-sm rounded-tl-lg rounded-bl-lg z-10">
          Free Delivery
        </label>
        <ResCard {...props} />
      </div>
    );
  };
};

export default ResCard;
