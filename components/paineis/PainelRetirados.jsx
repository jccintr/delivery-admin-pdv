import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';

const PainelRetirados = ({value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelLine}>
          <Text style={styles.labelText}>Pedidos Retirados</Text>
          <FontAwesome5 name="concierge-bell" size={20} color="#fff" />
      </View>  
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default PainelRetirados

const styles = StyleSheet.create({

    container:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: 'green',
        width: '50%',
        paddingHorizontal: 10,
        margin: 5,
        borderRadius: 5,
        height: 80,
        shadowColor: '#000',
      shadowOffset: {
        width:0,
        height:3,
      },
      shadowOpacity: 0.17,
      shadowRadius:3.05,
      elevation:4,
    },
    labelLine: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
       
    },
    labelText: {
       color: '#fff',
       fontSize: 12,
    },
    value: {
       color: '#fff',
       fontSize: 22,
    }

})