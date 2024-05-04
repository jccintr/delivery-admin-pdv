import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { cores } from '../../style/globalStyle';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const IconPasswordField = ({placeholder, value, onChangeText}) => {
    const [showPassword,setShowPassword] = useState(false);

  return (
    
     
      <View style={styles.container}>
            <FontAwesome style={{marginRight:5}}name="lock" size={22} color={cores.primary} />
            <TextInput style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#c1c1c1" 
                keyboardType={'default'}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                 <FontAwesome5 name={!showPassword?'eye':'eye-slash'} size={22} color={cores.primary} />
            </TouchableOpacity>
      </View> 
    
  )
}

export default IconPasswordField

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: cores.inputBackground,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 4,
       marginLeft: 10,
        backgroundColor: '#ff0',
    }

})