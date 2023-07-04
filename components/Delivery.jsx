import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';

const Delivery = () => {
   
    return (
        <View style={styles.container}>
             <FontAwesome name="motorcycle" size={14} color={cores.vermelho}/>
             <Text style={[styles.deliveryText,{color: cores.vermelho}]}>Delivery</Text>
        </View>
    )
}

export default Delivery

const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryText: {
        marginLeft: 5,
    },
})