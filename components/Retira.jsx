import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';

const Retira = () => {
   
    return (
        <View style={styles.container}>
             <FontAwesome5 name="concierge-bell" size={14} color="green" />
             <Text style={[styles.deliveryText,{color: 'green'}]}>Retirar no Balcão</Text>
        </View>
    )
}


export default Retira

const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryText: {
        marginLeft: 5,
    },
})