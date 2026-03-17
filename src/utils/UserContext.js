/*
===============================================================
Context: UserContext
 Purpose: Provide global user authentication state.

 Implementation:
  1. Creates a React Context for user information.
  2. Provides loggedInUser state to the entire app.
  3. Allows components to update the logged-in user.

 Returns:
  - UserProvider → Wraps the application and supplies user state
  - UserContext → Context used to consume user data
=================================================================
*/

import { createContext, useState } from "react";

// Create context for user information
const UserContext = createContext();

export function UserProvider({ children }) {
  // State: Stores the current logged-in user
  const [loggedInUser, setLoggedInUser] = useState("Guest");

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Export context so components can consume it
export default UserContext;
