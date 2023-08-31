import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,View,TouchableOpacity,Text } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import Header2 from '../../components/Header2';
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import {FontAwesome } from '@expo/vector-icons';
import ModalTaxa from '../../components/modal/ModalTaxa';



const TaxaItem = ({item,onPress}) => {
  
  
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View style={styles.titleItemContainer}>
            <View>
              <Text style={styles.titleItem}>{item.bairro}</Text>
              <View style={{flexDirection:'row'}}>
                 <Text>R$ {item.valor}</Text>
                 {!item.ativo&&<Text style={{marginLeft: 50,color: '#f00',}}>Desativado</Text>}
              </View>
            </View>
            
            <FontAwesome name="edit" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )

}



const Taxas = () => {
  const [taxas,setTaxas] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [taxa,setTaxa] = useState({bairro: '',valor:0, ativo:true});
  const [editando,setEditando] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    const getTaxas = async () => {
      setIsLoading(true);
      let response = await Api.getTaxas(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setTaxas(json);
      }
      setIsLoading(false);
    }
    getTaxas();

 },[]);

 const onBack = () => {
  navigation.goBack()
}

 const onSalvar = async () => {
     setModalVisible(false);
     
     if (!editando){  // adiciona
          let response = await Api.addTaxa(apiToken,taxa.bairro,taxa.valor,taxa.ativo);
          if(response.status===201){
            let response2 = await Api.getTaxas(apiToken);
            if(response2.status===200){
              let json = await response2.json();
              setTaxas(json);
            }
          }
     } else {
      
      let response = await Api.updateTaxa(apiToken,taxa.id,taxa.bairro,taxa.valor,taxa.ativo);
      if(response.status===200){
        
        let response2 = await Api.getTaxas(apiToken);
            if(response2.status===200){
              let json = await response2.json();
              setTaxas(json);
            }
      }
     }
     
 }

 const onAdd = () => {
     setEditando(false);
     setTaxa({bairro:'',valor:0,ativo:true});
     setModalVisible(true);
 }

 const onEdit = (item) => {
     setEditando(true);
     setTaxa(item);
     setModalVisible(true);
 }

 const EmptyList = () => {
  return <Text style={{color: cores.primary}}>Você ainda não adicionou taxas de entrega.</Text>
}



 return (
  <SafeAreaView style={styles.container}>
  <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
  <Header2 title="Taxas de Entrega" onBack={onBack} onAdd={onAdd}/>
  {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
  {!isLoading&&<FlatList 
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      data={taxas}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=><TaxaItem item={item} onPress={onEdit}/>}
      ListEmptyComponent={<EmptyList/>}
      contentContainerStyle={taxas.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
      />}
      <ModalTaxa modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} taxa={taxa} setTaxa={setTaxa} editando={editando}/>
</SafeAreaView>
)



}

export default Taxas

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