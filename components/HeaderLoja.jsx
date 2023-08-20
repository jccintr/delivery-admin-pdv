import { StyleSheet, Text, View,Image } from 'react-native';
import React, {useContext} from 'react';
import DataContext from '../context/DataContext';
import Api from '../Api';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons';

const HeaderLoja = () => {
    const {loggedUser,setLoggedUser} = useContext(DataContext);


    const TempoEspera = () => {
        return (
            <View style={[styles.containerInfo,{borderColor: loggedUser.cor_texto}]}>
                <FontAwesome5 name="clock" size={14} color={loggedUser.cor_texto} />
                <Text style={{marginLeft:5,borderColor: loggedUser.cor_texto,color: loggedUser.cor_texto,fontSize:12}}>{loggedUser.tempo_espera}</Text>
            </View>
          )
    }

    const Telefone = () => {
        return (
            <View style={[styles.containerInfo,{borderColor: loggedUser.cor_texto}]}>
                <FontAwesome name="phone" size={14} color={loggedUser.cor_texto} />
                <Text style={{marginLeft:5,borderColor: loggedUser.cor_texto,color: loggedUser.cor_texto,fontSize:12}}>{loggedUser.telefone}</Text>
            </View>
          )
      }
      
      const Status = () => {
        return (
            <View style={[styles.containerInfo,{borderColor: loggedUser.cor_texto}]}>
                <Text style={{borderColor: loggedUser.cor_texto,color: loggedUser.cor_texto,fontSize:12}}>{loggedUser.aberto?'ABERTO':'FECHADO'}</Text>
            </View>
          )
      }





  return (
    <View style={[styles.container,{backgroundColor:loggedUser.cor_fundo}]}>
        <Image style={styles.logotipo} source={{uri:`${Api.base_storage}/${loggedUser.logotipo}`,}}/>
        <Text style={{color: loggedUser.cor_texto,fontSize:16,marginBottom:5}}>{loggedUser.name}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
           <TempoEspera/>
           <Status/>
           <Telefone/>
        </View>
        
    </View>
  )
}

export default HeaderLoja

const styles = StyleSheet.create({

container: {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: 160,
  width: '100%',
  marginBottom: 50,
},
logotipo :{
  width: 80,
  height: 80,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 10,
},
containerInfo: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 10,
   borderWidth:1,
   paddingLeft:5,
   paddingRight:5,
   paddingTop: 2,
   paddingBottom:2,
   horizontalMargin: 5,
   marginHorizontal:2,
   
}

})