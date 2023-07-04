import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,View,TouchableOpacity,Text } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import Header2 from '../../components/Header2';
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import {FontAwesome } from '@expo/vector-icons';
import ModalObrigatorio from '../../components/modal/ModalObrigatorio';

const ObrigatorioItem = ({item,onPress}) => {
  
  
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View style={styles.titleItemContainer}>
            <View>
              <Text style={styles.titleItem}>{item.nome}</Text>
            </View>
            <FontAwesome name="edit" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )

}


const Obrigatorios = () => {
  const [obrigatorios,setObrigatorios] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [obrigatorio,setObrigatorio] = useState({nome: '',opcoes:[]});
  const [editando,setEditando] = useState(false);

  useEffect(()=>{
    const getObrigatorios = async () => {
      setIsLoading(true);
      let response = await Api.getObrigatorios(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setObrigatorios(json);
      }
      setIsLoading(false);
    }
    getObrigatorios();

 },[]);

 const onSalvar = async () => {
  setModalVisible(false);
  if (!editando){  // adiciona
       let response = await Api.addObrigatorio(apiToken,obrigatorio.nome,obrigatorio.opcoes);
       if(response.status===201){
         let response2 = await Api.getObrigatorios(apiToken);
         if(response2.status===200){
           let json = await response2.json();
           setObrigatorios(json);
         }
       }
  } else {
  
   let response = await Api.updateObrigatorios(apiToken,obrigatorio.nome,obrigatorio.opcoes);
   if(response.status===200){
     let response2 = await Api.getObrigatorios(apiToken);
         if(response2.status===200){
           let json = await response2.json();
           setObrigatorios(json);
         }
   }
  }
 }

  const onAdd = () => {
    setEditando(false);
    setObrigatorio({nome:'',opcoes:''});
    setModalVisible(true);
}

const onEdit = (item) => {
    setEditando(true);
    setObrigatorio(item);
    setModalVisible(true);
}
  


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
        <Header2 title="Itens Selecionáveis" onAdd={onAdd}/>
        {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
        {!isLoading&&<FlatList 
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={obrigatorios}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=><ObrigatorioItem item={item} onPress={onEdit}/>}
            />}
        <ModalObrigatorio modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} obrigatorio={obrigatorio} setObrigatorio={setObrigatorio} editando={editando}/>
    </SafeAreaView>
  )
}

export default Obrigatorios

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