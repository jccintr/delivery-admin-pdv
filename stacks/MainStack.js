import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Preload from "../screens/Preload";
import Login from "../screens/Login";
import MainTab from '../stacks/MainTab';


const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Preload">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen  name="Login" component={Login}/>
        <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  )
}

export default MainStack
