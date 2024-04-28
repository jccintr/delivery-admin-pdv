import React from 'react'
import { StyleSheet, TouchableOpacity,Pressable, View,TextInput } from 'react-native'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';

const SearchInput = ({value,setValue,onChangeText}) => {
  return (
    <View style={{paddingHorizontal:10}}>
      
      <View style={styles.inputContainer}>
      <FontAwesome name="search" size={22} color={cores.searchIconColor} />
        <TextInput style={styles.input}
            placeholder="Pesquisar"
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#c1c1c1" 
        />
        {value.length>0&&<Pressable onPress={()=>setValue('')}><AntDesign name="closecircleo" size={16} color={cores.iconeSearchField} /></Pressable>}
      </View> 
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
   
    inputContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        
        borderRadius: 10,
       
        paddingHorizontal: 5,
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: cores.inputBackground,
        marginTop: 10,
        marginHorizontal: 10,
        gap: 10,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 4,
        color: '#000',
    }

})