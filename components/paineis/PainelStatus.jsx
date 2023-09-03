import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';


const PainelStatus = ({aberto,onPress,isLoading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.labelLine}>
            <Text style={styles.labelText}>Status da Loja</Text>
            {isLoading?<ActivityIndicator size="small" color='#fff'/>:aberto?<FontAwesome5 name="store-alt" size={20} color="#fff" />:<FontAwesome5 name="store-alt-slash" size={20} color="#fff" />}
        </View>  
        <Text style={styles.value}>Loja {aberto?'Aberta':'Fechada'}</Text>
    </TouchableOpacity>
  )
}

export default PainelStatus

const styles = StyleSheet.create({

    container:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: '#33cccc',
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