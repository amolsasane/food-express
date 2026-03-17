/*
===============================================================
Custom Hook: useResMenu
 Purpose: Fetch restaurant menu data based on restaurant ID.
 Implementation:
  1. Simulates an API call using mock data.
  2. Adds a small delay (1s) to mimic network latency.

 Returns: resInfo → restaurant menu data
=================================================================
*/

import { useEffect, useState } from "react";
import { mockResMenu } from "./mockData";

const useResMenu = (resId) => {
  // State: Stores restaurant menu information
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    // Guard clause: do nothing if restaurant ID is missing
    if (!resId) return;

    // Simulate API request delay
    const timer = setTimeout(() => {
      const menuData = mockResMenu[resId]?.data || null;
      setResInfo(menuData);
    }, 1000);

    // Cleanup function to avoid memory leaks
    return () => clearTimeout(timer);
  }, [resId]);

  // Return the restaurant menu information
  return resInfo;
};

export default useResMenu;
