import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Preload from "../screens/Preload";
import Login from "../screens/Login";
import MainTab from '../stacks/MainTab';
import Categorias from "../screens/cadastros/Categorias";
import Pagamentos from "../screens/cadastros/Pagamentos";
import Taxas from "../screens/cadastros/Taxas";
import Horarios from "../screens/cadastros/Horarios";
import Obrigatorios from "../screens/cadastros/Obrigatorios";
import Adicionais from "../screens/cadastros/Adicionais";
import Pedido from "../screens/Pedido";
import EditProduto from "../screens/EditProduto";
import NovoProduto from "../screens/NovoProduto";


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen  name="Login" component={Login}/>
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Pagamentos" component={Pagamentos} />
        <Stack.Screen name="Taxas" component={Taxas} />
        <Stack.Screen name="Horarios" component={Horarios} />
        <Stack.Screen name="Obrigatorios" component={Obrigatorios} />
        <Stack.Screen name="Adicionais" component={Adicionais} />
        <Stack.Screen name="Pedido" component={Pedido} />
        <Stack.Screen name="EditProduto" component={EditProduto} />
        <Stack.Screen name="NovoProduto" component={NovoProduto} />
    </Stack.Navigator>
  )
}

export default MainStack
