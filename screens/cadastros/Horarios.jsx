import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,View,TouchableOpacity,Text } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import Header3 from '../../components/Header3';
import { cores } from '../../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import {FontAwesome } from '@expo/vector-icons';
import ModalHorario from '../../components/modal/ModalHorario';

const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

const HorarioItem = ({item,onPress}) => {
  
  
  return (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View style={styles.titleItemContainer}>
            <View>
              <Text style={styles.titleItem}>{days[item.dia]}</Text>
              <Text>{item.horario}</Text>
            </View>
            <FontAwesome name="edit" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )

}





const Horarios = () => {
  const [horarios,setHorarios] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [horario,setHorario] = useState({dia:0,horario:''});
  const [editando,setEditando] = useState(false);
  

  useEffect(()=>{
    const getHorarios = async () => {
      setIsLoading(true);
      let response = await Api.getHorarios(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setHorarios(json);
      }
      setIsLoading(false);
    }
    getHorarios();

 },[]);


 const onSalvar = async () => {
  setModalVisible(false);
  if (!editando){  // adiciona
       let response = await Api.addHorario(apiToken,horario.dia,horario.horario);
       if(response.status===201){
         let response2 = await Api.getHorarios(apiToken);
         if(response2.status===200){
           let json = await response2.json();
           setHorarios(json);
         }
       }
  } else {
   
   let response = await Api.updateHorario(apiToken,horario.id,horario.horario);
   console.log(response.status);
   if(response.status===200){
     let response2 = await Api.getHorarios(apiToken);
         if(response2.status===200){
           let json = await response2.json();
           setHorarios(json);
         }
   }
  }
  
}

const onAdd = () => {
  setEditando(false);
  setHorario({dia:0,horario:''});
  setModalVisible(true);
}

const onEdit = (item) => {

  setEditando(true);
  setHorario(item);
  setModalVisible(true);
}





  return (
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
    <Header3 title="Horários de Atendimento" />
    {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
    {!isLoading&&<FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={horarios}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><HorarioItem item={item} onPress={onEdit}/>}
        />}
        <ModalHorario modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} horario={horario} setHorario={setHorario} editando={editando}/>
  </SafeAreaView>
  )



}

export default Horarios

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