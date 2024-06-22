import { useEffect, useState } from "react";
import { OrganizationContext } from "./OrganizationContext";

function OrganizationProvider({ children }) {
  const [currentOrganization, setCurrentOrganization] = useState();

  return (
    <>
      <OrganizationContext.Provider value={{value:currentOrganization,changevalue:setCurrentOrganization}}>{children}</OrganizationContext.Provider>
    </>
  );
}

export default OrganizationProvider;
