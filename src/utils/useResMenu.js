import { useEffect, useState } from "react";
import { mockResMenu } from "./mockData";

const useResMenu = (ResId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!ResId) return;

    const timer = setTimeout(() => {
      setResInfo(mockResMenu[ResId]?.data);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ResId]);

  return resInfo;
};

export default useResMenu;
