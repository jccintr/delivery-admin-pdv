import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native';
import React, {useState,useRef} from 'react';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import ProductCard from './ProductCard';

const AccordionItem = ({title,data,onPress}) => {
  const [showContent,setShowContent] = useState(false);
  


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title} ({data.length})</Text>
          <Entypo name={!showContent?'chevron-right':'chevron-down'} size={24} color="black" />
        </View>
      </TouchableOpacity>
      {showContent&&<View style={styles.body}>
        {data.map((item,index,arr)=><ProductCard key={item.id} produto={item} onPress={onPress} last={index===(arr.length-1)}/>)}
      </View>}
    </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({

container:{
  width: '100%',
  padding: '2%',
  borderRadius:5,
  backgroundColor: cores.white,
  marginBottom: '2%',
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
   fontWeight: 'bold',
   color: '#2d2d2d',
},
body:{
 paddingHorizontal: '2%',
 paddingVertical: '3%',
 },

})