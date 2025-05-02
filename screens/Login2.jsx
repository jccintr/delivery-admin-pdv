import { StyleSheet,Text,SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar,Image} from 'react-native';
import { cores } from '../style/globalStyle';
import React, {useState,useContext} from 'react';
import InputField from '../components/InputField';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';
import logo from '../assets/logo-delivroo-azul-1024.png';
import PasswordInputField from '../components/Inputs/PasswordInputField';
import ModalErro from '../components/modal/ModalErro';

const Login2 = ({navigation}) => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
   const {setLoggedUser,setApiToken,expoPushToken} = useContext(DataContext);

  return (
    <View>
      <Text>Login2</Text>
    </View>
  )
}

export default Login2

const styles = StyleSheet.create({})