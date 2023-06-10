import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native';
import { cores } from '../style/globalStyle';


const Header = ({title}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: cores.primary,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: '100%',
      flexDirection:'row',
      paddingLeft:20,
      
      
    },
    title: {
        color: cores.white,
        fontSize:20,
        fontWeight: 'bold'
    },
    
  });
  