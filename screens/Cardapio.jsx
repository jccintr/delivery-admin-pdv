import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,Dimensions } from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';
import ProductCard from '../components/ProductCard';
import AccordionItem from '../components/AccordionItem';
import Api from '../Api';
import DataContext from '../context/DataContext';

const Cardapio = () => {
  const [categorias,setCategorias] = useState([]);
  const {loggedUser} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
 
 
  useEffect(()=>{
    const getCategorias = async () => {
      setIsLoading(true);
      let response = await Api.getCategorias(loggedUser.token);
      if(response.status===200) {
        let json = await response.json();
        setCategorias(json);
      }
      setIsLoading(false);
    }
    getCategorias();

 },[]);



  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
      <Header title="Cardápio"/>
      {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
      {!isLoading&&<FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={categorias}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><AccordionItem title={item.nome} data={item.produtos} />}
        />}
    </SafeAreaView>
  )
}

export default Cardapio

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