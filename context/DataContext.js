import { createContext,useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
   const [loggedUser,setLoggedUser] = useState(null);
   const [expoPushToken, setExpoPushToken] = useState('');
   const [apiToken, setApiToken] = useState(null);
   const [pedidos,setPedidos] = useState([]);
   

   return (
    <DataContext.Provider value={{loggedUser, setLoggedUser,setExpoPushToken,expoPushToken,apiToken,setApiToken,pedidos,setPedidos}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;