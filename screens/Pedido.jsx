import { StyleSheet, Text, View,SafeAreaView,StatusBar,ScrollView,Dimensions,TouchableOpacity } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import { cores } from '../style/globalStyle';
import Header4 from '../components/Header4';
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';
import Delivery from '../components/Delivery';
import Retira from '../components/Retira';
import ItemPedidoCard from '../components/cards/ItemPedidoCard';
import StatusLogCard from '../components/cards/StatusLogCard';
import ModalStatus from '../components/modal/ModalStatus';
import Api from '../Api';
import DataContext from '../context/DataContext';



const Pedido = ({route}) => {
    const [pedido,setPedido] = useState(route.params.pedido);
    const {apiToken,setPedidos,pedidosFiltrados,setPedidosFiltrados} = useContext(DataContext);
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const [modalVisible,setModalVisible] = useState(false);
    const [statusList,setStatusList] = useState([]);


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
    
const onBack = () => {
    navigation.navigate('Pedidos');
}

const onAddStatus = async (idStatus) => {
    
    let response = await Api.addStatusLog(apiToken,pedido.id,idStatus);
    let response2 = await Api.getPedido(apiToken,pedido.id);
    
    if (response2.status===200){
       let jsonPedido = await response2.json();
       setPedido(jsonPedido);
       let response3 = await Api.getPedidos(apiToken);
       let jsonPedidos = await response3.json();
       setPedidos(jsonPedidos);
       setPedidosFiltrados(jsonPedidos);
    }
    setModalVisible(false);

}

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/> 
       <Header4 title={`Pedido # ${pedido.token}`} onPress={onBack}/>
       <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
            <View style={styles.cabecalho}>
                <View style={styles.nameArea}>
                    <FontAwesome name="calendar" size={22} color="gray" />
                    <Text style={styles.nameText}>{pedido.data}</Text>
                </View>
                {pedido.delivery?<Delivery/>:<Retira/>}
            </View>
            <View style={styles.cabecalho}>
                <View style={styles.nameArea}>
                    <FontAwesome name="user" size={22} color="gray" />
                    <Text style={styles.nameText}>{pedido.nome}</Text>
                </View>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                    <FontAwesome style={{marginRight:5}} name="whatsapp" size={22} color="green" />
                    <Text style={{color:'green'}}>{pedido.telefone}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itensArea}>
                <Text style={styles.subTitle}>Itens do Pedido</Text>
                {pedido.itens_pedido.map((item,index,arr)=><ItemPedidoCard key={item.id} last={index===(arr.length-1)} item={item}/>)}
            </View>
            
            <View style={styles.itensArea}>
                <Text style={[styles.subTitle,{marginBottom:10}]}>Totais do Pedido</Text>
                <View style={styles.totalLine}>
                    <Text>Total dos Produtos:</Text>
                    <Text>R$ {pedido.total.toFixed(2)}</Text>
                </View>
                {(pedido.delivery===1 || pedido.delivery === true)&&<View style={styles.totalLine}>
                    <Text>Taxa de Entrega:</Text>
                    <Text>R$ {pedido.taxa_entrega}</Text>
                </View>}
                <View style={styles.totalLine}>
                    <Text style={{fontWeight:'bold'}}>Total do Pedido:</Text>
                    <Text style={{fontWeight:'bold'}}>R$ {(parseFloat(pedido.taxa_entrega) + parseFloat(pedido.total)).toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.itensArea}>
                <Text style={[styles.subTitle,{marginBottom:10}]}>Forma de Pagamento</Text>
                <View style={styles.totalLine}>
                    <Text>{pedido.forma_pagamento}</Text>
                </View>
            </View>
           
            {(pedido.delivery===1 || pedido.delivery===true)&&<View style={styles.itensArea}>
                <Text style={[styles.subTitle,{marginBottom:10}]}>Endereço para Entrega</Text>
                <View style={styles.totalLine}>
                    <Text>{pedido.endereco} - {pedido.bairro}</Text>
                </View>
            </View>}
             
            {pedido.observacao&&<View style={styles.itensArea}>
                <Text style={[styles.subTitle,{marginBottom:10}]}>Observações</Text>
                <View style={styles.totalLine}>
                    <Text>{pedido.observacao}</Text>
                </View>
            </View>}
            <View style={styles.itensArea}>
                <Text style={[styles.subTitle,{marginBottom:10}]}>Status do Pedido</Text>
                {pedido.status_pedido_log.map((item)=><StatusLogCard log={item} key={item.id} />)}
            </View>
            <TouchableOpacity style={styles.botaoAddLog} onPress={()=>setModalVisible(true)} >
                        <Text style={styles.addButtonText}>Atualizar Status</Text>
            </TouchableOpacity>
            <ModalStatus setModalVisible={setModalVisible} modalVisible={modalVisible} statusList={statusList} onAddStatus={onAddStatus}/>
            
       </ScrollView>
    </SafeAreaView>
  )
}

export default Pedido

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'flex-start',
        },
    cabecalho:{
        marginTop: 10,
        width: '95%',
        padding: 15,
        borderRadius:12,
        backgroundColor: cores.white,
        marginBottom: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'lightgray',
        
    },
    nameText: {
        color: cores.primary,
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 14,
    },
   
    itensArea: {
            marginTop: 10,
            width: '95%',
            padding: 15,
            borderRadius:12,
            backgroundColor: cores.white,
            marginBottom: '2%',
            overflow: 'hidden',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
      
    },
    flatList: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 5,
       },  
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalArea: {
        marginTop: 10,
        width: '95%',
        padding: 15,
        borderRadius:12,
        backgroundColor: cores.white,
        marginBottom: '2%',
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
  
},
totalLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
},   
botaoAddLog:{
    backgroundColor: cores.primary,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    height:50,
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
    
}, 
addButtonText:{
    color: '#fff',
    fontSize: 17,
    fontWeight:'bold',
 },
})