import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { cores } from '../../style/globalStyle'

const LabelInputArea = ({label,placeholder, value, onChangeText,lines}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer(lines)}>
        <TextInput style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#c1c1c1" 
            multiline={true}
            numberOfLines={lines}
        />
      </View> 
    </View>
  )
}

export default LabelInputArea

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
    inputContainer: (lines) => ( {
        width: '98%',
        height: (lines*20) + 20,
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: cores.inputBackground,
        
    }),
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 4,
        color: '#000',
       
        textAlignVertical: 'top'
    }

})