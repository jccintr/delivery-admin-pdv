import { StyleSheet,Text,SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar,Image} from 'react-native';
import { cores } from '../style/globalStyle';
import React, {useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';

import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';
import logo from '../assets/logo-delivroo-branco-1024.png';
import IconPasswordField from '../components/Inputs/IconPasswordField';
import IconInputField from '../components/Inputs/IconInputField';
import HeightSpacer from '../components/reusable/HeightSpacer';


const Login2 = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const navigation = useNavigation();
    const {setLoggedUser,loggedUser,apiToken,setApiToken,expoPushToken} = useContext(DataContext);
  

    const login = async () => {
        setIsLoading(true);
        if(email != '' && password != ''){
            
            let response = await Api.login(email, password);
            
            if(response.status===200){
              const jsonUser = await response.json();
              if (jsonUser.token) await AsyncStorage.setItem('token', jsonUser.token);
              let ret = await Api.storePushToken(jsonUser.token,expoPushToken);
              setApiToken(jsonUser.token);
              setLoggedUser(jsonUser);
              navigation.reset({routes:[{name:'MainTab'}]});
            } else {
              setEmail('');
              setPassword('');  
              alert('Email e ou usuário inválidos!');
            }
      
          } else {
            alert('Informe o seu e-mail e a sua senha por favor!');
            
          }
        setIsLoading(false);
      
      }




  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
        <Image source={logo} style={styles.logo}/>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Aplicativo Gestor</Text>
        <HeightSpacer h={20}/>
        <Text style={{fontSize:16}}>Informe as credenciais do estabelecimento</Text>
        <HeightSpacer h={20}/>
        <IconInputField 
            iconProvider="Entypo"
            iconName="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
           
        />
        <HeightSpacer h={20}/>
        <IconPasswordField placeholder={'Digite a senha de acesso'} onChangeText={t=>setPassword(t)} value={password}/>
        <HeightSpacer h={20}/>
        <TouchableOpacity onPress={login} style={styles.button}>
            {!isLoading?<Text style={styles.buttonText}>ENTRAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Login2

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
      },
      logo:{
        height: 200,
        width: 200,
       
      },
      button:{
        width:'100%',
        height: 50,
         backgroundColor: cores.primary,
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius:10,
       },
       buttonText:{
         color: cores.white,
         fontSize: 16,
         fontWeight: 'bold',
       },
})