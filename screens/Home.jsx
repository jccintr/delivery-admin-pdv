import { StyleSheet, Text, SafeAreaView,StatusBar,Image,TouchableOpacity,View,ActivityIndicator } from 'react-native';
import React, {useContext,useState,useEffect} from 'react';
import HeaderHome from '../components/headers/HeaderHome';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../Api';
import Status from '../components/Status';
import Wait from '../components/Wait';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ModalWait from '../components/modal/ModalWait';



const Home = () => {
  const {loggedUser,setLoggedUser,apiToken} = useContext(DataContext);
  const [aberto,setAberto] = useState(loggedUser.aberto);
  const navigation = useNavigation();
  const [modalVisible,setModalVisible] = useState(false);
  const [espera,setEspera] = useState(loggedUser.tempo_espera);
  const [isLoadingWait,setIsLoadingWait] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [faturamento,setFaturamento] = useState(0);
  const [recebidos,setRecebidos] = useState(0);
  const [entregues,setEntregues] = useState(0);
  const [retirados,setRetirados] = useState(0);


  useEffect(()=>{
    const getResumo = async () => {
      setIsLoading(true);
      let response = await Api.getResumo(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setRecebidos(json.recebidos);
        setEntregues(json.entregues);
        setRetirados(json.retirados);
        setFaturamento(json.faturamento);
      }
      setIsLoading(false);
    }
    getResumo();

 },[]);


  
  onLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({routes:[{name:'Login'}]});
    setLoggedUser(null);
    
  }

  const onRefresh = async () => {
    setIsLoading(true);
      let response = await Api.getResumo(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setRecebidos(json.recebidos);
        setEntregues(json.entregues);
        setRetirados(json.retirados);
        setFaturamento(json.faturamento);
      }
      setIsLoading(false);
  }

  const onWaitPress = () => {
     setModalVisible(true);
  }

  const onSaveWait = async (valor) => {
       if(valor.trim().length>0){
          setIsLoadingWait(true);
          setModalVisible(false);
          let response = await Api.updateEspera(apiToken,valor);
          if(response.status===200){
            setEspera(valor);
            
          }
         setIsLoadingWait(false);
       }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
      <HeaderHome title="BrazPed" onRefresh={onRefresh} onLogout={onLogout}/>
      {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
      <View style={styles.tenantArea}>
          <Image style={styles.logotipo} source={{uri:`${Api.base_storage}/${loggedUser.logotipo}`,}}/>
          <Text style={styles.name}>{loggedUser.name}</Text>
         
      </View>
      <View style={styles.statusArea}>
         <Status />
         {isLoadingWait?<ActivityIndicator  size="small" color={cores.orange}/>:<Wait onPress={onWaitPress} value={espera}/>}
      </View>
      <View style={styles.dashBoardArea}>
          <Text style={{color:cores.primary,fontWeight:'bold',fontSize:16}}>PEDIDOS RECEBIDOS</Text>
          <Text style={{color:cores.primary,fontWeight:'bold',fontSize:40,marginTop:10}}>{recebidos}</Text>
      </View>
      <View style={styles.detPedidosArea}>
        <View style={styles.detPedidosItemArea}>
            <Text style={{color:'#f00',fontWeight:'bold',fontSize:14}}>ENTREGUES</Text>
            <Text style={{color:'#f00',fontWeight:'bold',fontSize:34,marginTop:10}}>{entregues}</Text>
        </View>
        <View style={styles.detPedidosItemArea}>
            <Text style={{color:'#006400',fontWeight:'bold',fontSize:14}}>RETIRADOS</Text>
            <Text style={{color:'#006400',fontWeight:'bold',fontSize:34,marginTop:10}}>{retirados}</Text>
        </View>
      </View> 
      <View style={styles.dashBoardArea}>
          <Text style={{color:cores.primary,fontWeight:'bold',fontSize:16}}>FATURAMENTO</Text>
          <Text style={{color:cores.primary,fontWeight:'bold',fontSize:40,marginTop:10}}>R$ {faturamento.toFixed(2)}</Text>
      </View> 


      {/*<TouchableOpacity onPress={onLogout}>
        <Text style={{color:'#f00',fontWeight:'bold',fontSize:16}}>Desconectar</Text>
        </TouchableOpacity>*/}
       <ModalWait setModalVisible={setModalVisible} modalVisible={modalVisible} value={espera}  onSalvar={onSaveWait}/>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.whiteSmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
    },
  tenantArea: {
    marginTop: 10,
    width: '95%',
    padding: 10,
    borderRadius:12,
    backgroundColor: cores.white,
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }, 
  tenantDeailsArea: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logotipo: {
      width: 50,
      height:50,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
    },
  name:{
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    },
    statusArea:{
      marginTop: 5,
      width: '95%',
      padding: 10,
      borderRadius:12,
      backgroundColor: cores.white,
      marginBottom: '2%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    dashBoardArea:{
      marginTop: 5,
      width: '95%',
      padding: 10,
      borderRadius:12,
      backgroundColor: cores.white,
      marginBottom: '2%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detPedidosArea:{
      marginTop: 5,
      width: '95%',
      marginBottom: '2%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      
    },
    detPedidosItemArea:{
      width: '45%',
      borderRadius:12,
      backgroundColor: cores.white,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loading:{
      position: 'absolute',
      top: '50%',
     }
})