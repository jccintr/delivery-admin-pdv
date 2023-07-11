import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,View,TouchableOpacity,Text } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import Header2 from '../../components/Header2';
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import {FontAwesome } from '@expo/vector-icons';
import ModalPagamentos from '../../components/modal/ModalPagamentos';



const PagamentoItem = ({item,onPress}) => {
  
  
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View style={styles.titleItemContainer}>
          <Text style={styles.titleItem}>{item.nome}</Text>
          <FontAwesome name="edit" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )

}



const Pagamentos = () => {
  const [pagamentos,setPagamentos] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [pagamento,setPagamento] = useState({nome: ''});
  const [editando,setEditando] = useState(false);

  useEffect(()=>{
    const getPagamentos = async () => {
      setIsLoading(true);
      let response = await Api.getPagamentos(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setPagamentos(json);
      }
      setIsLoading(false);
    }
    getPagamentos();

 },[]);

 const onSalvar = async () => {
     setModalVisible(false);
     if (!editando){  // adiciona
          let response = await Api.addPagamento(apiToken,pagamento.nome);
          if(response.status===201){
            let response2 = await Api.getPagamentos(apiToken);
            if(response2.status===200){
              let json = await response2.json();
              setPagamentos(json);
            }
          }
     } else {
      
      let response = await Api.updatePagamento(apiToken,pagamento.id,pagamento.nome);
      if(response.status===200){
        let response2 = await Api.getPagamentos(apiToken);
            if(response2.status===200){
              let json = await response2.json();
              setPagamentos(json);
            }
      }
     }
     
 }

 const onAdd = () => {
     setEditando(false);
     setPagamento({nome:''});
     setModalVisible(true);
 }

 const onEdit = (item) => {

     setEditando(true);
     setPagamento(item);
     setModalVisible(true);
 }

 const EmptyList = () => {
  return <Text style={{color: cores.primary}}>Você ainda não adicionou formas de pagamento.</Text>
}



 return (
  <SafeAreaView style={styles.container}>
  <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
  <Header2 title="Formas de Pagamento" onAdd={onAdd}/>
  {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
  {!isLoading&&<FlatList 
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      data={pagamentos}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=><PagamentoItem item={item} onPress={onEdit}/>}
      ListEmptyComponent={<EmptyList/>}
      contentContainerStyle={pagamentos.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
      />}
      <ModalPagamentos modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} pagamento={pagamento} setPagamento={setPagamento} editando={editando}/>
</SafeAreaView>
)



}

export default Pagamentos

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
   containerItem:{
    width: '100%',
    padding: '2%',
    borderRadius:12,
    backgroundColor: cores.white,
    marginBottom: '2%',
    overflow: 'hidden',
   },
   titleItemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   },
   titleItem:{
    fontSize:18,
    fontWeight: 'bold',
    color: '#2d2d2d',
   },
   loading:{
    position: 'absolute',
    top: '50%',
   }


})