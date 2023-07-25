import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native'
import React,{useState,useEffect,useContext} from 'react';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import DataContext from '../context/DataContext';

const FilterOrders = () => {
    const {apiToken} = useContext(DataContext);
    const [options,setOptions] = useState([
        {id:1,nome:'Em Andamento'},
        {id:2,nome:'Concluídos'},
        {id:3,nome:'Cancelados'},
        {id:4,nome:'Todos'},
    ]);
    const [selected,setSelected] = useState(4);
    const [statusList,setStatusList] = useState([]);

    const Status = ({status,selected}) => {
        return (
             <TouchableOpacity onPress={()=>setSelected(status.id)} style={[{alignItems:'center',justifyContent:'center',borderWidth:1,paddingHorizontal:3,margin:3,borderRadius:5},status.id===selected?styles.categorySelected:'']}>
                <Text style={status.id===selected?styles.categorySelectedText:''}>{status.descricao_curta}</Text>
             </TouchableOpacity>
        )
    }

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


  return (
    <FlatList 
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        data={statusList}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><Status status={item} selected={selected}/>}
        horizontal={true}
    />
  )
}

export default FilterOrders

const styles = StyleSheet.create({

    categorySelected: {
        borderColor: cores.primary,
    },
    categorySelectedText: {
        color: cores.primary,
        fontWeight: 'bold',
    },
    flatList: {
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 5,
        height:5,
       },

})