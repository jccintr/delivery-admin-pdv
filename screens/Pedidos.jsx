import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator} from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../Api';
import PedidoCard from '../components/cards/PedidoCard';

//import { useFocusEffect } from '@react-navigation/native';


const Pedidos = () => {
  const {apiToken,pedidos,setPedidos} = useContext(DataContext);
  
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    const getPedidos = async () => {
      setIsLoading(true);
      let response = await Api.getPedidos(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setPedidos(json);
      }
      setIsLoading(false);
    }
    getPedidos();

 },[]);

 /*
 useFocusEffect(()=>{
    
 },[]
 );
*/
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
       <Header title="Pedidos"/>
       {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
       {!isLoading&&<FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={pedidos}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><PedidoCard pedido={item}/>}
        />}
    </SafeAreaView>
  )
}

export default Pedidos

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.whiteSmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
   },
   flatList: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 5,
    
   },
   loading:{
    position: 'absolute',
    top: '50%',
   }

})