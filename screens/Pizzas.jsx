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
  const [isSaving,setIsSaving] = useState(false);
  const [modalVisible,setModalVisible] = useState(false);
  const [editando,setEditando] = useState(false);
  const [pizza,setPizza] = useState([]);
  const [search,setSearch] = useState('');

  const pizzasFiltered = pizzas.filter( pizza=>pizza.nome.toUpperCase().includes(search.toUpperCase()) || pizza.descricao.toUpperCase().includes(search.toUpperCase())  );


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
     setEditando(false);
     setPizza({nome:'',descricao:'',ativo:true,grande:'',broto:''});
     setModalVisible(true);

}

const onEdit = (pizza)=> {
    setEditando(true);
    setPizza(pizza);
    setModalVisible(true);
}

const onSalvar = async () => {
  
  if(pizza.nome.trim().length===0){
    alert('Informe o nome da pizza por favor.');
  }
  if(pizza.descricao.trim().length===0){
     alert('Informe a descrição da pizza por favor.');
  }
  if(pizza.grande.trim().length===0){
    alert('Informe o preço da pizza grande por favor.');
  }
  if(pizza.broto.trim().length===0){
  alert('Informe o preço da pizza broto por favor.');
  }
  if(parseFloat(pizza.grande) <= 0 || parseFloat(pizza.broto) <= 0){
   alert('Os preços das pizza devem ser maiores do que zero.');
  }

  
 
  setIsSaving(true);
  if(!editando) {
    let response = await Api.addPizza(apiToken,pizza);
    console.log(response.status)
    if(response.status===201){
      const newPizza = await response.json();
      console.log(newPizza);
      setModalVisible(false);
      setIsLoading(true);
      pizzas.push(newPizza);
      const p = pizzas.sort((a, b) => a.nome.localeCompare(b.nome));
      setPizzas(p);
      // let response2 = await Api.getPizzas(apiToken);
      //     if(response2.status===200){
      //       let json = await response2.json();
      //       setPizzas(json);
      //     }
     setIsLoading(false);   
    }

  } else {
    let response = await Api.updatePizza(apiToken,pizza.id,pizza);
 
    if(response.status===200){
      const editedPizza = await response.json();
      setModalVisible(false);
      setIsLoading(true);
       const foundPizza = pizzas.find(pizza => pizza.id === editedPizza.id);
       if (foundPizza) {
        foundPizza.nome = editedPizza.nome;
        foundPizza.descricao = editedPizza.descricao;
        foundPizza.grande = editedPizza.grande;
        foundPizza.broto = editedPizza.broto;
        foundPizza.ativo = editedPizza.ativo;
      }
      const p = pizzas.sort((a, b) => a.nome.localeCompare(b.nome));
      setPizzas(p);
      // let response2 = await Api.getPizzas(apiToken);
      //     if(response2.status===200){
      //       let json = await response2.json();
      //       setPizzas(json);
      //     }
     setIsLoading(false);   
    }

  }

  setIsSaving(false);
 

  

}

const EmptyList = () => {
    return <Text style={{color: cores.primary}}>Pizzas não encontradas.</Text>
  }


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
        <Header2 title="Pizzas" onBack={()=>navigation.goBack()} onAdd={onAdd}/>
        <SearchInput value={search} setValue={setSearch} onChangeText={t=>setSearch(t)} />
        {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
        {!isLoading&&<FlatList 
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={pizzasFiltered}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=><PizzaCard pizza={item} onPress={onEdit} last={false}/>}
            ListEmptyComponent={<EmptyList/>}
            contentContainerStyle={pizzasFiltered.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
      />}
      <ModalPizza isSaving={isSaving} modalVisible={modalVisible} setModalVisible={setModalVisible} onSalvar={onSalvar} pizza={pizza} setPizza={setPizza} editando={editando}/>
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