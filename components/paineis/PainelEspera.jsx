import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';




const PainelEspera = ({onPress,espera,isLoading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.labelLine}>
          <Text style={styles.labelText}>Tempo de Espera</Text>
          {isLoading?<ActivityIndicator size="small" color='#fff'/>:<Feather name="clock" size={20} color="#fff" />  }
          
      </View>  
      <Text style={styles.value}>{espera}</Text>
    </TouchableOpacity>
  )
}

export default PainelEspera

const styles = StyleSheet.create({

    container:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: cores.orange,
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