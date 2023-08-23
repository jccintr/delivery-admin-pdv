import { StyleSheet, Text, View,SafeAreaView,StatusBar,ScrollView,Dimensions,TouchableOpacity,Linking } from 'react-native';
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
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';




const Pedido = ({route}) => {
    const [pedido,setPedido] = useState(route.params.pedido);
    const {apiToken,setPedidos,pedidosFiltrados,setPedidosFiltrados,loggedUser} = useContext(DataContext);
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const [modalVisible,setModalVisible] = useState(false);
    const [statusList,setStatusList] = useState([]);



   

    const headerPedido = `
    <html>
      <head>
       <style>
         p {margin:0;}
       </style>
      </head>
      <body style="text-align: center;">
        <div style="width: 100%;align-items:center"><img src="https://js-software.tech/logo-delivroo.png" style="width: 50px; height:50px" /></div>
        <p style="font-size: 8px; font-weight: normal;margin-bottom:5px;">${loggedUser.name}</p>
        <p style="font-size: 8px;font-weight: bold">Pedido: ${pedido.token}</p>
        <p style="font-size: 8px;">${pedido.data}</p>
        <p style="font-size: 8px;margin-bottom:5px;">*** ${pedido.delivery?'Delivery':'Retirar'} ***</p>
        
        <p style="font-size: 8px;font-weight: bold">Cliente</p>
        <p style="font-size: 8px;">${pedido.nome}</p>
        <p style="font-size: 8px;margin-bottom:5px;">${pedido.telefone}</p>`; 


  const enderecoPedido = pedido.delivery?`<p style="font-size: 8px;font-weight: bold">Endereço para Entrega</p>
                          <p style="font-size: 8px;">${pedido.endereco}</p>
                          <p style="font-size: 8px;margin-bottom:5px;">${pedido.bairro} - ${loggedUser.cidade}</p>`:'';

  const itensPedido = () => {
       ret = `<p style="font-size: 8px;font-weight: bold">Itens do Pedido</p>`;
       for(let i=0;i<pedido.itens_pedido.length;i++){
            ret = ret + '<div style="display: flex;flex-direction:row; align-items:center;justify-content:space-between">';
            ret = ret + `<p style="font-size: 8px;">${pedido.itens_pedido[i].quantidade} ${pedido.itens_pedido[i].produto.nome}</p>`;
            ret = ret + `<p style="font-size: 8px">R$ ${pedido.itens_pedido[i].total}</p>`;
            ret = ret + '</div>';
            for(let j=0;j<pedido.itens_pedido[i].obrigatorios.length;j++){
                ret = ret + '<div style="display: flex;flex-direction:row; align-items:center;justify-content:flex-start">';
                ret = ret + `<p style="font-size: 8px;">${pedido.itens_pedido[i].obrigatorios[j]}</p>`;
                ret = ret + '</div>';
            }
            for(let k=0;k<pedido.itens_pedido[i].adicionais.length;k++){
                ret = ret + '<div style="display: flex;flex-direction:row; align-items:center;justify-content:flex-start">';
                ret = ret + `<p style="font-size: 8px;">+${pedido.itens_pedido[i].adicionais[k]}</p>`;
                ret = ret + '</div>';
            }
            if(pedido.itens_pedido[i].observacao){
               ret = ret + '<div style="display: flex;flex-direction:row; align-items:center;justify-content:flex-start">'; 
               ret = ret + `<p style="font-size: 8px;">Obs.: ${pedido.itens_pedido[i].observacao}</p>`;
               ret = ret + '</div>';
            }
           if(i !== pedido.itens_pedido.length-1){
              ret = ret + '<hr style="margin:0;"/>';
           } 
          
       }
      ret = ret + '<hr style="border-top:1px solid;margin:0;"/>'; 
      return ret; 
  }
  
 
  const totalPedido = `<div style="display: flex;flex-direction:row; align-items:center;justify-content:space-between">
                           <p style="font-size: 8px;margin-top:0;margin-bottom:0">Total dos Produtos</p>
                           <p style="font-size: 8px;margin-top:0;margin-bottom:0">R$ ${pedido.total.toFixed(2)}</p>
                       </div>
                       <div style="display: flex;flex-direction:row; align-items:center;justify-content:space-between">
                          <p style="font-size: 8px">Taxa de Entrega</p>
                          <p style="font-size: 8px">R$ ${pedido.taxa_entrega}</p>
                       </div>
                       <div style="display: flex;flex-direction:row; align-items:center;justify-content:space-between">
                          <p style="font-size: 8px;font-weight: bold">Total a Pagar</p>
                          <p style="font-size: 8px;font-weight: bold">R$ ${(parseFloat(pedido.taxa_entrega) + parseFloat(pedido.total)).toFixed(2)}</p>
                       </div>
                       <hr/>`;


  const pagamentoPedido = `<p style="font-size: 8px;font-weight: bold">Forma de Pagamento</p>
                           <p style="font-size: 8px;">${pedido.forma_pagamento}</p>
                           <p style="font-size: 8px;"></p>`;

  const observacaoPedido = pedido.observacao?`<p style="font-size: 8px;font-weight: bold">Observação</p>
                            <p style="font-size: 8px;">${pedido.observacao}</p>
                            <p style="font-size: 8px;"></p>`:'';

  const fimPedido = `</body></html>`;

  const html = headerPedido + enderecoPedido + itensPedido() + totalPedido + pagamentoPedido + observacaoPedido + fimPedido;

  let onPrint = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
      width: 165
    });
    //await shareAsync(file.uri);
    await shareAsync(file.uri,{UTI: '.pdf',mimeType: 'application/pdf'});
  };

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

const sendUserNotification = (idStatus,phone,nome) => {
     let mensagem = ''
     let telefone = phone.replace(/\D/g,'');
    switch (idStatus) {
        case 4:
            mensagem = `Olá ${nome}, recebemos o seu pedido e já o estamos preparando.`; // em preparação 
            Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
            break;
        case 5:
            mensagem = 'Oba, o seu pedido já está a caminho !'; // a caminho
            Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
            break;
        case 6:
            mensagem = 'Oba, o seu pedido já está pronto para retirada !';  // pronto para retirada
            Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
            break;
        case 2:
            mensagem = 'O seu pedido foi entregue. Obrigado pela preferência. Volte sempre.'; // retirado
            Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
            break;        
        case 3:
             mensagem = 'O seu pedido foi retirado em nossa loja. Obrigado pela preferência. Volte sempre.'; // entregue
             Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
             break;    
        case 7:
            mensagem = 'Que chato, lamentamos mas não poderemos atender ao seu pedido no momento.'; //rejeitado
            Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
            break;
        case 8:
            mensagem = 'Que chato, infelizmente o seu pedido foi cancelado.'; // cancelado
            Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
            break;
          
        default:
            break;
    }

    //Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
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
    sendUserNotification(idStatus,pedido.telefone,pedido.nome);

}


  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/> 
       <Header4 title={`Pedido # ${pedido.token}`} onPress={onBack} onPrint={onPrint}/>
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
                {pedido.delivery&&<View style={styles.totalLine}>
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
           
            {pedido.delivery&&<View style={styles.itensArea}>
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