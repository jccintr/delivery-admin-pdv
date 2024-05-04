import React from 'react'
import { StyleSheet, View,TextInput} from 'react-native';
import { AntDesign,FontAwesome,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';




const Icone = ({iconName,iconProvider}) => {
    
    //return <AntDesign name={icon} size={22} color="#c1c1c1" />

    switch (iconProvider) {
        case 'Entypo':
            return <Entypo name="email" size={22} color={cores.primary} />
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


const IconInputField = ( {iconProvider,iconName,placeholder, value, onChangeText} ) => {
  return (
    <View style={styles.container}>
      <Icone iconName={iconName} iconProvider={iconProvider}/>
     <TextInput style={styles.input}
         placeholder={placeholder}
         value={value}
         onChangeText={onChangeText}
         placeholderTextColor="#c1c1c1" 
       />
    </View>
  )
}

export default IconInputField


const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: cores.inputBackground,
    },
  
    input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
     
      
    },
   
  });