import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, SafeAreaView,ActivityIndicator,StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';

const Preload = () => {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const {setLoggedUser,loggedUser,setApiToken} = useContext(DataContext);

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


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={cores.branco}
                barStyle="dark-content"
            />
            <Feather name="shopping-cart" size={50} color={cores.whiteSmoke} />
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
    
  });