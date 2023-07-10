import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,Dimensions } from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';
import AccordionItem from '../components/AccordionItem';
import Api from '../Api';
import DataContext from '../context/DataContext';
import ModalProduto from '../components/modal/ModalProduto';

const Cardapio = () => {
  const [categorias,setCategorias] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [produto,setProduto] = useState(null);

 
 
  useEffect(()=>{
    const getCategorias = async () => {
      setIsLoading(true);
      let response = await Api.getCategorias(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setCategorias(json);
      }
      setIsLoading(false);
    }
    getCategorias();

 },[]);

const onEdit = (produto) => {
      setProduto(produto);
      setModalVisible(true);
}

const onSalvar = async (id,nome,preco,ativo) => {

  if(isNaN(preco)){
     alert("Preço inválido."); 
  } else {

    let response = await Api.updateProduto(apiToken,id,nome,preco,ativo);
    if (response.status===200){
      let response2 = await Api.getCategorias(apiToken);
      let json = await response2.json();
      setCategorias(json);
     }
    setModalVisible(false);

  }
  

}

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
        renderItem={({item})=><AccordionItem title={item.nome} data={item.produtos} onPress={onEdit} />}
        />}
        {produto!=null&&<ModalProduto setModalVisible={setModalVisible} modalVisible={modalVisible} onSalvar={onSalvar} produto={produto}/>}
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