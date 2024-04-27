import React from 'react'
import { StyleSheet,View,TouchableOpacity,Text } from 'react-native';
import { cores } from '../style/globalStyle';
import { FontAwesome,Ionicons } from '@expo/vector-icons';


const Header2 = ({title,onBack,onAdd}) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',justifyContent: 'flex-start',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>onBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={styles.title}>{title}</Text>
            </View>
      </View>
        
        <TouchableOpacity onPress={onAdd}>
                <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
    </View>
  )
}

export default Header2

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: cores.primary,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      width: '100%',
      flexDirection:'row',
      paddingHorizontal: 10,
      },
    title: {
        color: cores.white,
        fontSize:20,
        fontWeight: 'bold'
    },
    addIcon: {

    }
    
  });
  