import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,Text,TouchableOpacity} from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../Api';
import PedidoCard from '../components/cards/PedidoCard';
import Header3 from '../components/Header3';
import { useNavigation } from '@react-navigation/native';


var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];


const Historico = () => {
    const [meses,setMeses] = useState([]);
    const [selectedMes,setSelectedMes] = useState(-1);
    const [pedidos,setPedidos] = useState([]);
    const {apiToken} = useContext(DataContext);
    const [isLoading,setIsLoading] = useState(false);
    const navigation = useNavigation();


    const onMesPress = async (mes) => {
        setIsLoading(true);
        let response = await Api.getHistoricoPedidos(apiToken,mes.year,mes.month);
        if(response.status===200) {
            let json = await response.json();
            setPedidos(json);
            setSelectedMes(mes.id)
        }
        setIsLoading(false);
    }

    const MesCard = ({mes,selected}) => {
        return (
             <TouchableOpacity onPress={()=>onMesPress(mes)} style={[{height:30,borderWidth:1,padding:5,marginHorizontal:5,marginTop:10,marginBottom:15,borderRadius:5},mes.id===selected?styles.mesSelected:'']}>
                <Text style={mes.id===selected?styles.mesSelectedText:''}>{monthNames[mes.month-1]}/{mes.year}</Text>
             </TouchableOpacity>
        )
    }

    useEffect(()=>{
        CriaArrayMeses();
      },[]);

      
    const CriaArrayMeses = () => {

        var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        var today = new Date();
        var d;
        var month;
        var year;
        let arrMonth = [];


        for(var i = 0; i <= 5; i++) {
            d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            //month = monthNames[d.getMonth()];
            month = d.getMonth()+1;
            year = d.getFullYear();
            let newMonth = {id: i,year,month};
            arrMonth.push(newMonth);
        }
        setMeses(arrMonth);

}

const onBack = () => {
  navigation.goBack()
}

const EmptyList = () => {
    return <Text style={{position:'absolute',top:'50%',color: cores.primary}}>Nenhum pedido encontrado.</Text>
  }

  const onPressPedido = (pedido) => {
    navigation.navigate('ViewPedido',{pedido: pedido})
}


  return (
     <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
       <Header3 title="Histórico de Pedidos" onBack={onBack} />
       {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
       <FlatList 
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            data={meses}
            keyExtractor={(item)=> item.id.toString()}
            renderItem={({item})=><MesCard mes={item} selected={selectedMes}/>}
            horizontal={true}
        /> 
        {!isLoading&&<FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={pedidos}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><PedidoCard pedido={item} onPress={onPressPedido}/>}
        />}
        {!isLoading&&pedidos.length===0&&<EmptyList/>}
      
     </SafeAreaView>  
  )
}

export default Historico

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'flex-start',
   },
    flatList: {
      width: '100%',
      paddingHorizontal: 5,
    },
  mesSelected: {
    borderColor: cores.primary,
},
mesSelectedText: {
    color: cores.primary,
    fontWeight: 'bold',
},
loading:{
    position: 'absolute',
    top: '50%',
   }


})