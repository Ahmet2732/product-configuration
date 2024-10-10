import { createContext, useState } from "react";

// Create the context
export let UserContext = createContext();

// Provide the context to components
export default function UserContextProvider(props) {
   const [UserToken, setUserToken] = useState(null);

   return (
     <UserContext.Provider value={{ UserToken,setUserToken}}>
       {props.children}
     </UserContext.Provider>
   );
}
