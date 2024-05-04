import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Preload from "../screens/Preload";
import Login from "../screens/Login";
import Login2 from "../screens/Login2";
import MainTab from '../stacks/MainTab';
import Categorias from "../screens/cadastros/Categorias";
import Pagamentos from "../screens/cadastros/Pagamentos";
import Taxas from "../screens/cadastros/Taxas";
import Horarios from "../screens/cadastros/Horarios";
import Obrigatorios from "../screens/cadastros/Obrigatorios";
import Adicionais from "../screens/cadastros/Adicionais";
import Pedido from "../screens/Pedido";
import ViewPedido from "../screens/ViewPedido";
import EditProduto from "../screens/EditProduto";
import NovaPizza from "../screens/NovaPizza";
import EditPizza from "../screens/EditPizza";
import NovoProduto from "../screens/NovoProduto";
import Historico from "../screens/Historico";
import VisualLoja from "../screens/cadastros/VisualLoja";
import Pizzas from "../screens/Pizzas";


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen  name="Login" component={Login}/>
        <Stack.Screen  name="Login2" component={Login2}/>
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Pagamentos" component={Pagamentos} />
        <Stack.Screen name="Taxas" component={Taxas} />
        <Stack.Screen name="Horarios" component={Horarios} />
        <Stack.Screen name="Obrigatorios" component={Obrigatorios} />
        <Stack.Screen name="Adicionais" component={Adicionais} />
        <Stack.Screen name="Pedido" component={Pedido} />
        <Stack.Screen name="ViewPedido" component={ViewPedido} />
        <Stack.Screen name="EditProduto" component={EditProduto} />
        <Stack.Screen name="NovaPizza" component={NovaPizza} />
        <Stack.Screen name="EditPizza" component={EditPizza} />
        <Stack.Screen name="NovoProduto" component={NovoProduto} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Visual" component={VisualLoja} />
        <Stack.Screen name="Pizzas" component={Pizzas} />
    </Stack.Navigator>
  )
}

export default MainStack
