import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemPedidoCard = ({item,last}) => {
  
  return (
    <View style={[styles.container,!last?styles.borda:'']}>
        <View style={styles.itemContainer}>
           <Text>{item.quantidade} x {item.produto.nome}</Text> 
           <Text style={{fontWeight:'bold'}}>R$ {item.total}</Text> 
        </View>
        {item.obrigatorios.map((item,index)=><Text key={index}>   {item}</Text>)}
        {item.observacao!=null?<Text>Obs: {item.observacao}</Text>:''}
    </View>
  )
}

export default ItemPedidoCard

const styles = StyleSheet.create({

    container: {
       width: '100%',
       paddingTop: 10,
       paddingBottom: 10,
    },
    borda:{
      borderBottomColor: '#f1f1f1',
      borderBottomWidth: 0.5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})