import React from 'react'
import { StyleSheet, View,TextInput} from 'react-native';
import { AntDesign,FontAwesome,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';



const Icone = ({iconName,iconProvider}) => {
    
    //return <AntDesign name={icon} size={22} color="#c1c1c1" />

    switch (iconProvider) {
      case 'Entypo':
        return <Entypo name="email" size={22} color={cores.searchIconColor} />
        break;
        case 'AntDesign':
            return <AntDesign name={iconName} size={22} color="#000" />;
            break;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={22} color="#000" />;
             break;
        case 'MaterialCommunityIcons':
             return <MaterialCommunityIcons name={iconName} size={22} color="#000" />;
             break;
        default:
          console.log(`icone não encontrado`);
      }
      



}


const InputField = ( {iconProvider,iconName,placeholder, value, onChangeText, password} ) => {
  return (
    <View style={styles.inputArea}>
      <Icone iconName={iconName} iconProvider={iconProvider}/>
     <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         secureTextEntry={password}
         placeholderTextColor="#c1c1c1" 
       />
    </View>
  )
}

export default InputField


const styles = StyleSheet.create({
    inputArea: {

        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 1,
        paddingLeft: 15,
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