import React,{useState} from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity} from 'react-native';
import { AntDesign,FontAwesome,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';




const PasswordInputField = ( {iconProvider,iconName,placeholder, value, onChangeText} ) => {
    const [showPassword,setShowPassword] = useState(false);
  return (
    <View style={styles.inputArea}>
      <MaterialCommunityIcons name="lock-outline" size={22} color={cores.searchIconColor} />
     <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={!showPassword}
         placeholderTextColor="#c1c1c1" 
       />
       <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
          <FontAwesome5 name={!showPassword?'eye':'eye-slash'} size={20} color={cores.searchIconColor} />
        </TouchableOpacity>
    </View>
  )
}

export default PasswordInputField


const styles = StyleSheet.create({
    inputArea: {

        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal:15,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 15,
      
    },
    
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
      
    },
   
  });