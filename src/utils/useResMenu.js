import { useEffect, useState } from "react";
import { RES_MENU_API } from "./constants";

const useResMenu = (ResId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!ResId) return;

    const fetchData = async () => {
      const data = await fetch(RES_MENU_API + ResId);
      const json = await data.json();
      setResInfo(json.data);
    };

    fetchData();
  }, [ResId]);

  return resInfo;
};

export default useResMenu;
