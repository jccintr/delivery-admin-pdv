import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { cores } from '../../style/globalStyle'

const LabelInputField = ({label,placeholder, value, onChangeText, numeric}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer} >
        <TextInput style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#c1c1c1" 
            keyboardType={numeric?'decimal-pad':'default'}
        />
      </View> 
    </View>
  )
}

export default LabelInputField

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
        paddingHorizontal: 5,
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