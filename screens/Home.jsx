import { StyleSheet, Text, SafeAreaView,StatusBar,Image,View,ActivityIndicator } from 'react-native';
import React, {useContext,useState,useEffect} from 'react';
import HeaderHome from '../components/headers/HeaderHome';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../Api';
import Status from '../components/Status';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ModalWait from '../components/modal/ModalWait';
import PainelEntregues from '../components/paineis/PainelEntregues';
import PainelRetirados from '../components/paineis/PainelRetirados';
import PainelRecebidos from '../components/paineis/PainelRecebidos';
import PainelFaturamento from '../components/paineis/PainelFaturamento';
import PainelEspera from '../components/paineis/PainelEspera';
import PainelStatus from '../components/paineis/PainelStatus';



const Home = () => {
  const {loggedUser,setLoggedUser,apiToken} = useContext(DataContext);
  const [aberto,setAberto] = useState(loggedUser.aberto);
  const navigation = useNavigation();
  const [modalVisible,setModalVisible] = useState(false);
  const [espera,setEspera] = useState(loggedUser.tempo_espera);
  const [isLoadingWait,setIsLoadingWait] = useState(false);
  const [isLoadingStatus,setIsLoadingStatus] = useState(false);
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

  const toggleStatus = async () => {
    setIsLoadingStatus(true);
    let response = await Api.toggleStatus(apiToken);
    
    if (response.status===200){
       let user = loggedUser;
       user.aberto = !loggedUser.aberto;
       setAberto(!aberto);
       setLoggedUser(user);
    }
   setIsLoadingStatus(false);

}


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
      <HeaderHome title="Gestor Delivroo" onRefresh={onRefresh} onLogout={onLogout} isLoading={isLoading}/>
      
     
      <View style={styles.tenantArea}>
          <Image style={styles.logotipo} source={{uri:`${Api.base_storage}/${loggedUser.logotipo}`,}}/>
          <Text style={styles.name}>{loggedUser.name.toUpperCase()}</Text>
      </View>

      <View style={styles.dashBoardArea}>

          <View style={{flexDirection:'row'}}>
                <PainelStatus aberto={aberto} isLoading={isLoadingStatus} onPress={toggleStatus}/>
                <PainelEspera onPress={()=>setModalVisible(true)} espera={espera} isLoading={isLoadingWait}/>
          </View>
          <View style={{flexDirection:'row'}}>
                <PainelRecebidos value={recebidos} />
                <PainelEntregues value={entregues} />
          </View>
          <View style={{flexDirection:'row'}}>
                <PainelRetirados value={retirados} />
                <PainelFaturamento value={faturamento}/>
          </View>
          
      </View>

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
    borderRadius:5,
    backgroundColor: cores.white,
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
      shadowOffset: {
        width:0,
        height:3,
      },
      shadowOpacity: 0.17,
      shadowRadius:3.05,
      elevation:2,
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
      borderRadius:5,
      backgroundColor: cores.white,
      marginBottom: '2%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width:0,
        height:3,
      },
      shadowOpacity: 0.17,
      shadowRadius:3.05,
      elevation:2,
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