import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,View,TouchableOpacity,Text } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import Header2 from '../../components/Header2';
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import {FontAwesome } from '@expo/vector-icons';
import ModalAdicional from '../../components/modal/ModalAdicional';



const AdicionalItem = ({item,onPress}) => {
  
  
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View style={styles.titleItemContainer}>
            <View>
              <Text style={styles.titleItem}>{item.nome}</Text>
              <Text>R$ {item.valor}</Text>
            </View>
            <FontAwesome name="edit" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )

}



const Adicionais = () => {
  const [adicionais,setAdicionais] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [adicional,setAdicional] = useState({nome: '',valor:0});
  const [editando,setEditando] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    const getAdicionais = async () => {
      setIsLoading(true);
      let response = await Api.getAdicionais(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setAdicionais(json);
      }
      setIsLoading(false);
    }
    getAdicionais();

 },[]);

 const onSalvar = async () => {
     setModalVisible(false);
     if (!editando){  // adiciona
          let response = await Api.addAdicional(apiToken,adicional.nome,adicional.valor);
          if(response.status===201){
            let response2 = await Api.getAdicionais(apiToken);
            if(response2.status===200){
              let json = await response2.json();
              setAdicionais(json);
            }
          }
     } else {
      
      let response = await Api.updateAdicional(apiToken,adicional.id,adicional.nome,adicional.valor);
      if(response.status===200){
        let response2 = await Api.getAdicionais(apiToken);
            if(response2.status===200){
              let json = await response2.json();
              setAdicionais(json);
            }
      }
     }
     
 }

 const onBack = () => {
  navigation.goBack()
}


 const onAdd = () => {
     setEditando(false);
     setAdicional({nome:'',valor:0});
     setModalVisible(true);
 }

 const onEdit = (item) => {
     setEditando(true);
     setAdicional(item);
     setModalVisible(true);
 }

 const EmptyList = () => {
  return <Text style={{color: cores.primary}}>Você ainda não adicionou itens.</Text>
}

 return (
  <SafeAreaView style={styles.container}>
  <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
  <Header2 onBack={onBack} title="Adicionais" onAdd={onAdd}/>
  {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
  {!isLoading&&<FlatList 
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      data={adicionais}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=><AdicionalItem item={item} onPress={onEdit}/>}
      ListEmptyComponent={<EmptyList/>}
      contentContainerStyle={adicionais.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
      />}
      <ModalAdicional modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} adicional={adicional} setAdicional={setAdicional} editando={editando}/>
</SafeAreaView>
)



}

export default Adicionais

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