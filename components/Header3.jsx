import React from 'react'
import { StyleSheet,View,TouchableOpacity,Text } from 'react-native';
import { cores } from '../style/globalStyle';
import { FontAwesome } from '@expo/vector-icons';


const Header3 = ({title}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={styles.title}>{title}</Text>
        </View>
       
    </View>
  )
}

export default Header3

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
  