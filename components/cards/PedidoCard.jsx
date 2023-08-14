import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../../style/globalStyle'
import {FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import StatusPedido from '../StatusPedido';
import { useNavigation } from '@react-navigation/native'; 

const Delivery = () => {
   
    return (
        <View style={styles.deliveryContainer}>
             <FontAwesome name="motorcycle" size={14} color={cores.vermelho}/>
             <Text style={[styles.deliveryText,{color: cores.vermelho}]}>Delivery</Text>
        </View>
    )
}

const Retira = () => {
   
    return (
        <View style={styles.deliveryContainer}>
             <FontAwesome5 name="concierge-bell" size={14} color="green" />
             <Text style={[styles.deliveryText,{color: 'green'}]}>Retirar no Balcão</Text>
        </View>
    )
}

const PedidoCard = ({pedido, onPress}) => {
    const navigation = useNavigation();
    
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPress(pedido)}>
        <View style={styles.firstLine}>
            <Text style={styles.nomeText}>{pedido.nome}</Text>
            <StatusPedido status={pedido.status_pedido} />
        </View>
        <Text style={styles.numeroText}>{`${pedido.token} | ${pedido.data}`}</Text>
        <View style={styles.firstLine}>
            {pedido.delivery?<Delivery/>:<Retira/>}
            <Text style={styles.totalText}>R$ {(pedido.total+pedido.taxa_entrega*1).toFixed(2)}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default PedidoCard

const styles = StyleSheet.create({

    container: {
        width: '100%',
        padding: '2%',
        borderRadius:12,
        backgroundColor: cores.white,
        marginBottom: '2%',
        overflow: 'hidden',
        },
    firstLine:{
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between'
    },
    nomeText:{
        fontWeight: 'bold',
        
    },
    numeroText: {

    },
    totalText: {
       fontWeight: 'bold',
       color: 'black',
    },
    deliveryContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryText: {
        marginLeft: 5,
    }
    

})