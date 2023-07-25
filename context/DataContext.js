import { createContext,useState } from "react";
//import Api from "../Api";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
   const [loggedUser,setLoggedUser] = useState(null);
   const [expoPushToken, setExpoPushToken] = useState('');
   const [apiToken, setApiToken] = useState(null);
   const [pedidos,setPedidos] = useState([]);
   const [pedidosFiltrados,setPedidosFiltrados] = useState([]);
   const [categorias,setCategorias] = useState([]);
   
   
   




   return (
    <DataContext.Provider value={{loggedUser,setLoggedUser,setExpoPushToken,expoPushToken,apiToken,setApiToken,pedidos,setPedidos,pedidosFiltrados,setPedidosFiltrados,categorias,setCategorias}}>
      {children}
    </DataContext.Provider>
)
}

export default DataContext;