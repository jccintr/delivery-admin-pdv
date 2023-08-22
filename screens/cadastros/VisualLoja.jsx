import { StyleSheet, StatusBar, SafeAreaView,ActivityIndicator,Text,TouchableOpacity,ToastAndroid } from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import Header from '../../components/Header';
import { cores } from '../../style/globalStyle';
import HeaderLoja from '../../components/HeaderLoja';
import DataContext from '../../context/DataContext';
import ColorPickerModal from '../../components/modal/ColorPickerModal';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';

const VisualLoja = () => {
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const {loggedUser,setLoggedUser,apiToken} = useContext(DataContext);
    const [corFundo,setCorFundo] = useState(loggedUser.cor_fundo);
    const [modalCorFundoVisible,setModalCorFundoVisible] = useState(false);
    const [corTexto,setCorTexto] = useState(loggedUser.cor_texto);
    const [modalCorTextoVisible,setModalCorTextoVisible] = useState(false);
    
/*
    useEffect(()=>{
     setCorFundo(loggedUser.cor_fundo);
     setCorTexto(loggedUser.cor_texto)
  
   },[]);
  */


    const onSalvar = async () => {
      setIsLoading(true);
      let response = await Api.changeColors(apiToken,corFundo,corTexto);
      if(response.status===200){
           let responseUser = await Api.getUser(apiToken);
           if (responseUser.status===200){
              let jsonUser = await responseUser.json(); 
              setLoggedUser(jsonUser);
           }
           ToastAndroid.show('Visual da loja alterado com sucesso.', ToastAndroid.SHORT);
           navigation.navigate('Cadastros');
      } else {
        ToastAndroid.show('Falha ao alterar visual da loja.', ToastAndroid.SHORT);
      }
      setIsLoading(false);
    }


    return (
        <SafeAreaView style={styles.container}>
           <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
           
           <Header title="Visual da Loja"/>
           {corFundo!=null&&<HeaderLoja corFundo={corFundo} corTexto={corTexto}/>}
           

           <>
                <TouchableOpacity style={styles.botaoCor} onPress={()=>setModalCorFundoVisible(true)} >
                        <Text style={styles.botaoCorText}>Alterar a Cor do Fundo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCor} onPress={()=>setModalCorTextoVisible(true)} >
                        <Text style={styles.botaoCorText}>Alterar a Cor do Texto</Text>
                </TouchableOpacity>
           </>
           
           <TouchableOpacity style={styles.botaoSalvar} onPress={onSalvar} >
                   {!isLoading?<Text style={styles.botaoSalvarText}>Salvar</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
            </TouchableOpacity>
            <ColorPickerModal title="Selecione a cor do fundo" color={corFundo} setColor={setCorFundo} visible={modalCorFundoVisible} setVisible={setModalCorFundoVisible}/>
            <ColorPickerModal title="Selecione a cor do texto" color={corTexto} setColor={setCorTexto} visible={modalCorTextoVisible} setVisible={setModalCorTextoVisible}/>
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