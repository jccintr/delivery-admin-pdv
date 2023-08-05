import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';

const Wait =({value,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <Feather name="clock" size={18} color="white" />  
          <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
      )
}

export default Wait

const styles = StyleSheet.create({

    container: {
        
        backgroundColor: cores.whiteSmoke,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: cores.orange,
        borderRadius: 12,
        
       },
       text:{
           fontWeight: 'bold',
           fontSize: 14,
           color: cores.white,
       }

})