import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,Text} from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import HeaderPedidos from '../components/HeaderPedidos';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../Api';
import PedidoCard from '../components/cards/PedidoCard';
import ModalStatus from '../components/modal/ModalStatus';
//import { useFocusEffect } from '@react-navigation/native';



const Pedidos = () => {
  const {apiToken,pedidos,setPedidos,pedidosFiltrados,setPedidosFiltrados} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [statusId,setStatusId] = useState(4);
  const [modalVisible,setModalVisible] = useState(false);
  const [statusList,setStatusList] = useState([]);

  useEffect(()=>{
    const getPedidos = async () => {
      setIsLoading(true);
      let response = await Api.getPedidos(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setPedidos(json);
        const filtrados = pedidos.filter((pedido)=>pedido.status_pedido.id===statusId);
        setPedidosFiltrados(json);
      }
      setIsLoading(false);
    }
    getPedidos();

 },[]);

 useEffect(()=>{
  const getStatus = async () => {
   // setIsLoading(true);
    let response = await Api.getStatus(apiToken);
    if(response.status===200) {
      let json = await response.json();
      setStatusList(json);
    }
   // setIsLoading(false);
  }
  getStatus();

},[]);

 const EmptyList = () => {
  return <Text style={{color: cores.primary}}>Nenhum pedido encontrado.</Text>
}

/*
useFocusEffect(
  React.useCallback(() => {
    alert('dd');
  }, [])
);
*/
 

 

 const onAddStatus = async (idStatus) => {
     setModalVisible(false);
 }

 const onFilter = (idStatus) => {
    setModalVisible(false);
    setStatusId(idStatus);
    const filtrados = pedidos.filter((pedido)=>pedido.status_pedido.id===idStatus);
    setPedidosFiltrados(filtrados);
 }

 const onRefresh = async () => {

  setIsLoading(true);
  let response = await Api.getPedidos(apiToken);
  if(response.status===200) {
    let json = await response.json();
    setPedidos(json);
    const filtrados = pedidos.filter((pedido)=>pedido.status_pedido.id===statusId);
    setPedidosFiltrados(json);
  }
  setIsLoading(false);

 }

 

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
       <HeaderPedidos title="Pedidos" onFilter={()=>setModalVisible(true)} onRefresh={onRefresh}/>
       
       {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
       {!isLoading&&<FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={pedidosFiltrados}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><PedidoCard pedido={item}/>}
        ListEmptyComponent={<EmptyList/>}
        contentContainerStyle={pedidosFiltrados.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
        />}
        <ModalStatus setModalVisible={setModalVisible} modalVisible={modalVisible} statusList={statusList} onAddStatus={onFilter}/>
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