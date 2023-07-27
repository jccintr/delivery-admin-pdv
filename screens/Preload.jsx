import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, SafeAreaView,ActivityIndicator,StatusBar,Platform,Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import logo from '../assets/logo-branco-250.png';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // pede permisao para enviar notificacoes

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Falha ao obter token de notificação!');
        return;
      }
      //android 13 call -> setNotificationChannelAsync
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }




const Preload = () => {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const {setLoggedUser,loggedUser,setApiToken,setExpoPushToken} = useContext(DataContext);
    

    useEffect(()=>{
        const checkToken = async () => {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            if(token){
               try {
                    let response = await Api.getUser(token);
                    if (response.status===200){
                       let jsonUser = await response.json(); 
                       setApiToken(token);
                       setLoggedUser(jsonUser);
                       navigation.reset({routes:[{name:'MainTab'}]});
                     
                    } else {
                      navigation.reset({routes:[{name:'Login'}] 
                      });
                    }


                }  catch (e){
                    setIsLoading(false);
                    alert("Falha ao obter dados.");
                  }
                
            }
            else {
                navigation.reset({
                    routes:[{name:'Login'}]
                });
            }


        }
        checkToken();
    }, []);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
             <Image source={logo} style={styles.logo}/>
            {/*<Feather name="shopping-cart" size={50} color={cores.whiteSmoke} />*/}
            {isLoading&&<ActivityIndicator size="large" color={cores.white}/>}
        </SafeAreaView>
       )
}

export default Preload 

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: cores.primary,
        
    },
    logo:{
      height: 150,
      width: 150,
    },
    
  });