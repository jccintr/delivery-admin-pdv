import React from 'react'
import { StyleSheet,View,TouchableOpacity,Text } from 'react-native';
import { cores } from '../style/globalStyle';
import { AntDesign,Feather } from '@expo/vector-icons';


const HeaderPedidos = ({title,onFilter,onRefresh}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onFilter}>
                <AntDesign style={{marginRight:20}} name="filter" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRefresh}>
                <Feather name="refresh-ccw" size={24} color="white" />
        </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default HeaderPedidos

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: cores.primary,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      width: '100%',
      flexDirection:'row',
      paddingHorizontal: 20,
      },
    title: {
        color: cores.white,
        fontSize:20,
        fontWeight: 'bold'
    },
    addIcon: {

    }
    
  });
  