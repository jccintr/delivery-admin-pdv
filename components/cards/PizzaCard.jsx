import { cores } from "../../style/globalStyle";
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity } from 'react-native';
import Api from "../../Api";

const PizzaCard = ({pizza,onPress,last}) => {
    const screenWidth = Dimensions.get('window').width;
  
    return (
      <TouchableOpacity style={styles.container} onPress={()=>onPress(pizza)}>
        {pizza.imagem&&<Image style={styles.imagem} source={{uri:`${Api.base_storage}/${pizza.imagem}`,}}/>}
        <View style={[styles.descricaoContainer,{width: pizza.imagem===null? screenWidth*0.88:screenWidth*0.7}]}>
           <Text style={styles.nome}>{pizza.nome}</Text>
           <Text style={styles.descricao}>{pizza.descricao}</Text>
           <View style={styles.precoContainer}>
              <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                 <View style={{flex:1,flexDirection: 'row'}}>
                    <Text style={styles.labelPreco}>Grande: </Text>
                    <Text style={styles.preco}>R$ {pizza.grande}</Text>
                 </View>
                 <View style={{flex:0,flexDirection: 'row'}}>
                    <Text style={styles.labelPreco}>Broto: </Text>
                    <Text style={styles.preco}>R$ {pizza.broto}</Text>
                 </View>
                
              </View>
           </View>
           {!pizza.ativo&&<Text style={styles.foraCardapio}>Fora do Cardápio</Text>}
        </View>
      </TouchableOpacity>
    )
  }
  
  export default PizzaCard

  const styles = StyleSheet.create({

    container: {
        flex:1,
       padding: '2%',
       borderRadius:5,
       backgroundColor: cores.white,
       marginBottom: '2%',
       overflow: 'hidden',
       shadowColor: '#000',
       shadowOffset: { width:0, height:3},
       shadowOpacity: 0.17,
       shadowRadius:3.05,
       elevation:2,
      },
      borda:{
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 0.5,
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
        
         height: 80,
         
      },
      nome:{
        fontWeight: 'bold',
        fontSize: 16,
      },
      descricao: {
        fontSize: 12,
        marginVertical: 5,
        
      },
      precoContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      labelPreco: {
        fontWeight: '500',
       
      },
      preco: {
        fontWeight: 'bold',
        color: cores.primary,
      },
      foraCardapio: {
        color: '#f00',
      }



})