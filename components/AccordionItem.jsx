import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native';
import React, {useState,useRef} from 'react';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import ProductCard from './ProductCard';

const AccordionItem = ({title,data}) => {
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
        {data.map((item)=><ProductCard key={item.id} produto={item}/>)}
      </View>}
    </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({

container:{
  width: '100%',
  padding: '2%',
  borderRadius:12,
  backgroundColor: cores.white,
  marginBottom: '2%',
  overflow: 'hidden',
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