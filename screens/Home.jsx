import { StyleSheet, Text, SafeAreaView,StatusBar,Image } from 'react-native';
import React, {useContext,useState} from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';
import DataContext from '../context/DataContext';
import Api from '../Api';
import Status from '../components/Status';


const Home = () => {
  const {loggedUser} = useContext(DataContext);
  const [aberto,setAberto] = useState(loggedUser.aberto);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
      <Header title="Braiz Food PDV"/>
      <Image style={styles.logotipo} source={{uri:`${Api.base_storage}/${loggedUser.logotipo}`,}}/>
      <Text style={styles.name}>{loggedUser.name}</Text>
      <Status />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.whiteSmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
    },
    logotipo: {
      marginTop: 20,
      width: 100,
      height:100,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
    },
    name:{
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 20,
    }
})