import { StyleSheet, Text, View,FlatList,SafeAreaView,StatusBar,ActivityIndicator } from 'react-native'
import React, {useState,useEffect,useContext} from 'react';
import DataContext from '../context/DataContext';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import Header2 from '../components/Header2';
import PizzaCard from '../components/cards/PizzaCard';
import ModalPizza from '../components/modal/ModalPizza';
import { useNavigation } from '@react-navigation/native';
import SearchInput from '../components/Inputs/SearchInput';

const Pizzas = () => {
  const navigation = useNavigation();
  const [pizzas,setPizzas] = useState([]);
  const {apiToken} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [editando,setEditando] = useState(false);
  const [pizza,setPizza] = useState([]);


  useEffect(()=>{
    const getPizzas= async () => {
      setIsLoading(true);
      let response = await Api.getPizzas(apiToken);
      if(response.status===200) {
        let json = await response.json();
        setPizzas(json);
      }
      setIsLoading(false);
    }
    getPizzas();
 },[]);



const onAdd = () => {


}

const onEdit = (pizza)=> {
    setEditando(true);
    setPizza(pizza);
    setModalVisible(true);
}

const onSalvar = () => {

}

const EmptyList = () => {
    return <Text style={{color: cores.primary}}>Você ainda não adicionou sabores de pizzas.</Text>
  }


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
        <Header2 title="Sabores das Pizzas" onBack={()=>navigation.goBack()} onAdd={onAdd}/>
        <SearchInput />
        {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
        {!isLoading&&<FlatList 
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={pizzas}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=><PizzaCard pizza={item} onPress={onEdit} last={false}/>}
            ListEmptyComponent={<EmptyList/>}
            contentContainerStyle={pizzas.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
      />}
      <ModalPizza modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} pizza={pizza} setPizza={setPizza} editando={editando}/>
    </SafeAreaView>
  )
}

export default Pizzas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 10,
        },
       flatList: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
       },
       loading:{
        position: 'absolute',
        top: '50%',
       }

})