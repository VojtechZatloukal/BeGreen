import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState("unsigned");

  return (
    <>
      <UserContext.Provider value={{value:loggedInUser,changevalue:setLoggedInUser}}>{children}</UserContext.Provider>
    </>
  );
}

export default UserProvider;
