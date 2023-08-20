import { StyleSheet, StatusBar, SafeAreaView,View,Text,TouchableOpacity } from 'react-native';
import React, {useState,useContext} from 'react';
import Header from '../../components/Header';
import { cores } from '../../style/globalStyle';
import HeaderLoja from '../../components/HeaderLoja';
import DataContext from '../../context/DataContext';

const VisualLoja = () => {
    const {loggedUser,setLoggedUser} = useContext(DataContext);
    
    return (
        <SafeAreaView style={styles.container}>
           <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
           
           <Header title="Visual da Loja"/>
           <HeaderLoja />
           

           <>
                <TouchableOpacity style={styles.botaoCor} onPress={()=>{}} >
                        <Text style={styles.botaoCorText}>Alterar a Cor do Fundo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCor} onPress={()=>{}} >
                        <Text style={styles.botaoCorText}>Alterar a Cor do Texto</Text>
                </TouchableOpacity>
           </>
           
           <TouchableOpacity style={styles.botaoSalvar} onPress={()=>{}} >
                   <Text style={styles.botaoSalvarText}>SALVAR</Text>
            </TouchableOpacity>
        </SafeAreaView>
      )
}

export default VisualLoja


const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: cores.whiteSmoke,
      alignItems: 'center',
      justifyContent: 'flex-start',
      },
      botaoSalvar:{
        position: 'absolute',
        bottom: 0, 
        width: '95%',
        backgroundColor: cores.primary,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        height:50,
        marginBottom: 10,
      },
    botaoSalvarText:{
        color: '#fff',
        fontSize: 17,
        fontWeight:'bold',
     },
     botaoCor:{
        borderColor: cores.primary,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        height:50,
        width: '95%',
        marginBottom: 10,
    },
    botaoCorText:{
        color: cores.primary,
        fontSize: 17,
        fontWeight:'bold',
    },
   
  
  })