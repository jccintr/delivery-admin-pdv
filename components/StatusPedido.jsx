import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';

const StatusPedido = ({status}) => {
    
  return (
    <View style={[styles.container,{backgroundColor: status.cor,}]}>
      <Text style={styles.statusText}>{status.descricao_curta.toUpperCase()}</Text>
    </View>
  )
}

export default StatusPedido

const styles = StyleSheet.create({
    container: {
       
        borderRadius:5,
        
        paddingHorizontal: 10,
        paddingVertical: 2,
        
        },
    statusText:{
        color: cores.white,
        fontSize: 12,
    }    
})