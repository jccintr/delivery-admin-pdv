import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import Home from '../screens/Home';
import Pedidos from '../screens/Pedidos';
import Cardapio from '../screens/Cardapio';
import Cadastros from '../screens/Cadastros';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator screenOptions={{ headerShown: false}} tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pedidos" component={Pedidos} />
        <Tab.Screen name="Cardapio" component={Cardapio} />
        <Tab.Screen name="Cadastros" component={Cadastros} />
    </Tab.Navigator>
);