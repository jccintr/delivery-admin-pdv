import React from 'react'
import { StyleSheet,View,TouchableOpacity,Text } from 'react-native';
import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';


const HeaderHome = ({title,onRefresh,onLogout}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onRefresh}>
                   <Feather  style={{marginRight:20}} name="refresh-ccw" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout}>
                   <MaterialCommunityIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default HeaderHome

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
  