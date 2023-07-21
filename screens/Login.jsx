import { StyleSheet,Text,SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import React, {useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import { Feather } from '@expo/vector-icons';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {setLoggedUser,loggedUser,apiToken,setApiToken} = useContext(DataContext);


  const login = async () => {
    setIsLoading(true);
    if(email != '' && password != ''){
        
        let response = await Api.login(email, password);
        
        if(response.status===200){
          const jsonUser = await response.json();
          if (jsonUser.token) await AsyncStorage.setItem('token', jsonUser.token);
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
      <StatusBar
                animated={true}
                backgroundColor={cores.primary}
                barStyle="dark-content"
      />
     <View style={styles.header}>  
        <View/>
        <View style={styles.logoArea}>
          <Feather name="shopping-cart" size={50} color={cores.whiteSmoke} />
          <Text style={styles.headerText}>BrazPed PDV</Text>
        </View> 
        
        <Text style={styles.headerText}>Login</Text>
     </View>
     <View style={styles.inputArea}>
        <InputField 
            iconProvider="AntDesign"
            iconName="mail"
            placeholder="Digite o seu e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
            password={false}
        />
        <InputField 
            iconProvider="AntDesign"
            iconName="lock1"
            placeholder="Digite a sua senha"
            value={password}
            onChangeText={t=>setPassword(t)}
            password={true}
        />
        <TouchableOpacity onPress={login} style={styles.button}>
            {!isLoading?<Text style={styles.buttonText}>ENTRAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.reset({routes:[{name:'MainTab'}]})} style={styles.passwordButton}>
            <Text style={styles.passwordButtonText} >Esqueci a minha senha</Text>
        </TouchableOpacity>
     </View> 
   </SafeAreaView>
  )



}

export default Login

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: cores.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
     flexGrow:1,
     alignItems: 'center',
     justifyContent: 'space-between',
   },
  headerText:{
    color: cores.white,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,

  },
  logoArea:{
     alignItems: 'center',
  },
  inputArea:{
   paddingTop: 40,
   paddingLeft: 20,
   paddingRight: 20,
   borderTopLeftRadius: 20,
   borderTopRightRadius: 20,
   backgroundColor: cores.whiteSmoke,
   paddingBottom: 40,
  },
  button:{
   height: 50,
    backgroundColor: cores.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
  },
  buttonText:{
    color: cores.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordButton:{
    flexDirection:'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  passwordButtonText:{
    fontSize: 16,
    color: cores.primary,
    fontWeight: 'bold',
  },
  
 
});