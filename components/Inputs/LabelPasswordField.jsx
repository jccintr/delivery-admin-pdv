import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { cores } from '../../style/globalStyle';
import { FontAwesome5 } from '@expo/vector-icons';

const LabelPasswordField = ({label,placeholder, value, onChangeText}) => {
    const [showPassword,setShowPassword] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#c1c1c1" 
                keyboardType={'default'}
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                 <FontAwesome5 name={!showPassword?'eye':'eye-slash'} size={20} color="black" />
            </TouchableOpacity>
      </View> 
    </View>
  )
}

export default LabelPasswordField

const styles = StyleSheet.create({
    container:{

    },
    label: {
        width: '100%',
        textAlign: 'left',    
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom:5,
        color: cores.primary,
    },
    inputContainer: {
        width: '98%',
        height: 50,
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: cores.inputBackground,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 4,
        color: '#000',
    }

})