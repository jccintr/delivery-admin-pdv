import { createContext,useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
   const [loggedUser,setLoggedUser] = useState(null);
   const [expoPushToken, setExpoPushToken] = useState('');

   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,setExpoPushToken,expoPushToken}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;