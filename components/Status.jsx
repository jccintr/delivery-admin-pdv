import { StyleSheet, Text, ActivityIndicator,TouchableOpacity } from 'react-native';
import React, {useContext,useState} from 'react';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import DataContext from '../context/DataContext';

const Status = () => {
  const {loggedUser,setLoggedUser,apiToken} = useContext(DataContext);
  const [aberto,setAberto] = useState(loggedUser.aberto);
  const [isLoading,setIsLoading] = useState(false);


  const toggleStatus = async () => {
      setIsLoading(true);
      let response = await Api.toggleStatus(apiToken);
      
      if (response.status===200){
         let user = loggedUser;
         user.aberto = !loggedUser.aberto;
         setAberto(!aberto);
         setLoggedUser(user);
      }
     setIsLoading(false);

  }


  return (
    <TouchableOpacity onPress={toggleStatus} style={[styles.container,aberto?{backgroundColor:'#006400'}:'']}>
      {isLoading&&<ActivityIndicator  size="small" color={cores.branco}/>}
      {!isLoading&&<><Text style={styles.status}>LOJA</Text>
      <Text style={styles.status}>{aberto?'ABERTA':'FECHADA'}</Text></>}
    </TouchableOpacity>
  )
}

export default Status

const styles = StyleSheet.create({
    
    container: {
        
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: cores.vermelho,
        borderRadius: 12,
        
       },
       status:{
           fontWeight: 'bold',
           fontSize: 14,
           color: cores.white,
       }
})