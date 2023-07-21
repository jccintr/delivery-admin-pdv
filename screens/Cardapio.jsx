import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,Text } from 'react-native';
import React, {useState,useContext,useEffect,useCallback} from 'react';
import Header2 from '../components/Header2';
import { cores } from '../style/globalStyle';
import AccordionItem from '../components/AccordionItem';
import Api from '../Api';
import DataContext from '../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import ModalProduto from '../components/modal/ModalProduto';


const Cardapio = () => {
  const navigation = useNavigation();
  const {apiToken,categorias,setCategorias} = useContext(DataContext);
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
      //setModalVisible(true);
      navigation.navigate('EditProduto',{idProduto: produto.id, categorias: categorias})
}

const onSalvar = async (id,nome,descricao,preco,categoria_id,ativo) => {

  if(isNaN(preco)){
     alert("Preço inválido."); 
  } else {

    let response = await Api.updateProduto(apiToken,id,nome,descricao,preco,categoria_id,ativo);
    if (response.status===200){
      let response2 = await Api.getCategorias(apiToken);
      let json = await response2.json();
      setCategorias(json);
     }
    setModalVisible(false);

  }
  

}

const EmptyList = () => {
  return <Text style={{color: cores.primary}}>O seu cardápio está vazio.</Text>
}

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
       <Header2 title="Cardápio" onAdd={()=>navigation.navigate('NovoProduto')}/>
      {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
      {!isLoading&&<FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={categorias}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><AccordionItem title={item.nome} data={item.produtos} onPress={onEdit} />}
        ListEmptyComponent={<EmptyList/>}
        contentContainerStyle={categorias.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
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