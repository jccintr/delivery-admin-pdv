import React from 'react'
import { StyleSheet,View,TouchableOpacity,Text } from 'react-native';
import { cores } from '../style/globalStyle';
import { FontAwesome,Ionicons } from '@expo/vector-icons';


const Header4 = ({title,onPress}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>onPress()}>
                <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
  )
}

export default Header4

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: cores.primary,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 50,
      width: '100%',
      flexDirection:'row',
      paddingHorizontal: 20,
      },
    title: {
        marginLeft: 5,
        color: cores.white,
        fontSize:20,
        fontWeight: 'bold'
    },
    
    
  });
  