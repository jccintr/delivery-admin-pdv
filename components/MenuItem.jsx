import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';


const MenuItem = ({item,onPress}) => {
 
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>onPress(item.id)}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Entypo name="chevron-right" size={24} color="#2d2d2d" />
            </View>
          </TouchableOpacity>
        </View>
      )



}

export default MenuItem

const styles = StyleSheet.create({

    container:{
        width: '100%',
        padding: '2%',
        paddingVertical: '3%',
        borderRadius:5,
        backgroundColor: cores.white,
        marginBottom: '3%',
        overflow: 'hidden',
        shadowColor: '#000',
      shadowOffset: {
        width:0,
        height:3,
      },
      shadowOpacity: 0.17,
      shadowRadius:3.05,
      elevation:2,
      },
      titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      title: {
         fontSize:18,
        
         color: '#2d2d2d',
      },
      


})