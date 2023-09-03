import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';

const PainelFaturamento = ({value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelLine}>
          <Text style={styles.labelText}>Faturamento</Text>
          <MaterialIcons name="attach-money" size={20} color="#fff" />
         
      </View>  
      <Text style={styles.value}>R$ {value.toFixed(2)}</Text>
    </View>
  )
}

export default PainelFaturamento

const styles = StyleSheet.create({

    container:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: cores.primary,
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
       fontSize: 18,
    }

})