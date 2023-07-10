import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Octicons } from '@expo/vector-icons';

const StatusLogCard = ({log}) => {
  return (
    <View style={styles.container}>
       <Octicons style={{marginRight: 10}} name="dot-fill" size={24} color={log.status_pedido.cor} />
       <Text>{log.data} {log.status_pedido.descricao}</Text> 
       
   </View>
  )
}

export default StatusLogCard

const styles = StyleSheet.create({
    
    container:{
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
    }
    
})