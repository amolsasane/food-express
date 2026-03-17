/*
===============================================================
Custom Hook: useOnlineStatus
 Purpose: Detect the user's internet connection status.

 Implementation:
  1. Listens to browser "online" and "offline" events.
  2. Updates the state when network status changes.

 Returns: onlineStatus → boolean indicating if user is online
=================================================================
*/

import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  // State: Tracks the current network status
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    // Handler: Triggered when internet connection is restored
    const handleOnline = () => {
      setOnlineStatus(true);
    };

    // Handler: Triggered when internet connection is lost
    const handleOffline = () => {
      setOnlineStatus(false);
    };

    // Register event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup: Remove listeners when component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Return the current online status
  return onlineStatus;
};

export default useOnlineStatus;
