import { StyleSheet, Text, View,SafeAreaView,StatusBar, ScrollView,Dimensions } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';
import Header4 from '../components/Header4';
import { useNavigation } from '@react-navigation/native'; 
import { FontAwesome } from '@expo/vector-icons';
import Delivery from '../components/Delivery';
import Retira from '../components/Retira';
import ItemPedidoCard from '../components/cards/ItemPedidoCard';



const Pedido = ({route}) => {
    const {pedido} = route.params;
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;

    
const onBack = () => {
    navigation.navigate('Pedidos');
}

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/> 
       <Header4 title={`Pedido # ${pedido.token}`} onPress={onBack}/>
       <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
       <View style={styles.cabecalho}>
           <View style={styles.nameArea}>
               <FontAwesome name="user" size={22} color="gray" />
               <Text style={styles.nameText}>{pedido.nome}</Text>
           </View>
           {pedido.delivery?<Delivery/>:<Retira/>}
       </View>
       <View style={styles.itensArea}>
           <Text style={styles.subTitle}>Itens do Pedido</Text>
           {pedido.itens_pedido.map((item)=><ItemPedidoCard key={item.id} item={item}/>)}
       </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default Pedido

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'flex-start',
        },
    cabecalho:{
        marginTop: 10,
        width: '95%',
        padding: 15,
        borderRadius:12,
        backgroundColor: cores.white,
        marginBottom: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'lightgray',
        
    },
    nameText: {
        color: cores.primary,
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 14,
    },
   
    itensArea: {
            marginTop: 10,
            width: '95%',
            padding: 15,
            borderRadius:12,
            backgroundColor: cores.white,
            marginBottom: '2%',
            overflow: 'hidden',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
      
    },  
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    }  
})