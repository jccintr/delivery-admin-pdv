import { StyleSheet, Text, View,Image,Dimensions } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';
import Api from '../Api';

const ProductCard = ({produto}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imagem} source={{uri:`${Api.base_storage}/${produto.imagem}`,}}/>
      <View style={styles.descricaoContainer}>
         <Text style={styles.nome}>{produto.nome}</Text>
         <Text style={styles.descricao}>{produto.descricao}</Text>
         <View style={styles.precoContainer}>
            <Text style={styles.preco}>R$ {produto.preco}</Text>
            {!produto.ativo&&<Text style={styles.foraCardapio}>Fora do Cardápio</Text>}
         </View>
         
      </View>
      
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({

    container: {
       
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 80,
        width: '100%',
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: cores.whiteSmoke,
        marginBottom: 10,
        
       
      },
      imagem:{
        width: 60,
        height:60, 
        marginRight: 5, 
        borderRadius: 10,
      },
      descricaoContainer: {
         flexDirection: 'column',
         alignItems: 'flex-start',
         justifyContent: 'space-evenly',
         
         width: Dimensions.get('window').width * 0.7,
         height: 80,
      },
      nome:{
        fontWeight: 'bold',
        fontSize: 16,
      },
      descricao: {
        fontSize: 12,
        
      },
      precoContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      preco: {
        fontWeight: 'bold',
        color: cores.primary,
      },
      foraCardapio: {
        color: '#f00',
      }



})