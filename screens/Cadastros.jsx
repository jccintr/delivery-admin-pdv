import { StyleSheet, StatusBar, SafeAreaView,FlatList,ActivityIndicator,Dimensions } from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';
import MenuItem from '../components/MenuItem';
import { useNavigation } from '@react-navigation/native';
import ModalSenha from '../components/modal/ModalSenha';

const Cadastros = () => {
  const navigation = useNavigation();
  const [modalVisible,setModalVisible] = useState(false);


const menuData = [
  {id:1,title: "Categorias"},
  {id:2,title: "Taxas"},
  {id:3,title: "Formas de Pagamentos"},
  {id:4,title: "Horários"},
  {id:5,title: "Itens Selecionáveis"},
  {id:6,title: "Itens Adicionais"},
  {id:7,title: "Alterar Senha de Acesso"},

];

const onMenuPress = (id) => {
  
  switch(id) {
    case 1:
      navigation.navigate('Categorias');
      break;
    case 2:
      navigation.navigate('Taxas');
      break;
    case 3:
      navigation.navigate('Pagamentos');
      break;
    case 4:
      navigation.navigate('Horarios');
    break;
    case 5:
      navigation.navigate('Obrigatorios');
    break;
    case 6:
      navigation.navigate('Adicionais');
    break;
    case 7:
      setModalVisible(true);
    break;
    default:
      // code block
  }
  
  
}


  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
       <Header title="Ajustes"/>
       <FlatList 
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={menuData}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><MenuItem item={item} onPress={onMenuPress} />}
        />
        <ModalSenha setModalVisible={setModalVisible} modalVisible={modalVisible}/>
    </SafeAreaView>
  )
}

export default Cadastros

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: cores.whiteSmoke,
    alignItems: 'center',
    justifyContent: 'flex-start',
    },
   flatList: {
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 5,
   },
 

})