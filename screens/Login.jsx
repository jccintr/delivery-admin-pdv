import { StyleSheet,Text,SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar,Image} from 'react-native';
import { cores } from '../style/globalStyle';
import React, {useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';
import logo from '../assets/logo-delivroo-azul-1024.png';
import PasswordInputField from '../components/Inputs/PasswordInputField';
import ModalErro from '../components/modal/ModalErro';

const Login = () => {
  const [errorMessage,setErrorMessage] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {setLoggedUser,setApiToken,expoPushToken} = useContext(DataContext);


  const login = async () => {
    setIsLoading(true);
    if(email != '' && password != ''){
        
        let response = await Api.login(email, password);
        
        if(response.status===200){
          const jsonUser = await response.json();
          if (jsonUser.token) await AsyncStorage.setItem('token', jsonUser.token);
          alert('Este é o push token: '+ expoPushToken);
          let ret = await Api.storePushToken(jsonUser.token,expoPushToken);
          setApiToken(jsonUser.token);
          setLoggedUser(jsonUser);
          navigation.reset({routes:[{name:'MainTab'}]});
        } else {
          setEmail('');
          setPassword('');  
          setErrorMessage('Email e ou senha inválidos.')
          setModalVisible(true);
        }
  
      } else {
        setErrorMessage('Informe o seu email e sua senha por favor.')
        setModalVisible(true);
        
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
        <View/>
        <View style={styles.logoArea}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.headerText}>Aplicativo Gestor</Text>
        </View> 
        
        <Text style={styles.subHeaderText}>Informe as credenciais do estabelecimento</Text>
     </View>
     <View style={styles.inputArea}>
        <InputField 
            iconProvider="Entypo"
            iconName="email"
            placeholder="Digite o seu e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
            password={false}
        />
        <PasswordInputField 
            placeholder="Digite a sua senha"
            value={password}
            onChangeText={t=>setPassword(t)}
          
        />
        <TouchableOpacity onPress={login} style={styles.button}>
            {!isLoading?<Text style={styles.buttonText}>ENTRAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={() => {}} style={styles.passwordButton}>
            <Text style={styles.passwordButtonText} >Esqueci a minha senha</Text>
  </TouchableOpacity>*/}
     </View> 
     <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
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
   // marginBottom: 10,
    marginTop: 10,

  },
  subHeaderText:{
    color: cores.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    //marginTop: 10,

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
  logo:{
    height: 200,
    width: 200,
  },
  
 
});