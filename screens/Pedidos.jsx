import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';

const Pedidos = () => {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
      <Header title="Meus Pedidos"/>
    </SafeAreaView>
  )
}

export default Pedidos

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.whiteSmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
   },

})