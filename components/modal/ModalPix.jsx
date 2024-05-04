import { StyleSheet, Text, View,Modal,TouchableOpacity,ActivityIndicator,TextInput,ToastAndroid } from 'react-native';
import React, {useState,useContext} from 'react';
import Api from '../../Api';
import { cores } from '../../style/globalStyle';
import { EvilIcons } from '@expo/vector-icons';
import DataContext from '../../context/DataContext';
import InputField from '../InputField';
import LabelInputField from '../Inputs/LabelInputField';


const ModalPix = ({modalVisible,setModalVisible}) => {
    const [isLoading,setIsLoading] = useState(false);
    const {apiToken,loggedUser,setLoggedUser} = useContext(DataContext);
    const [chavePix,setChavePix] = useState(loggedUser.chave_pix);
    const [favorecido,setFavorecido] = useState(loggedUser.favorecido_pix);


    const onSalvar = async () => {
      setIsLoading(true);
      let response = await Api.changePix(apiToken,chavePix,favorecido);
      if(response.status===200){
           let responseUser = await Api.getUser(apiToken);
           if (responseUser.status===200){
              let jsonUser = await responseUser.json(); 
              setLoggedUser(jsonUser);
           }
           ToastAndroid.show('Chave Pix alterada com sucesso.', ToastAndroid.SHORT);
           setModalVisible(false)
      } else {
        ToastAndroid.show('Falha ao alterar Chave Pix.', ToastAndroid.SHORT);
      }
      setIsLoading(false);
    }

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.modalArea}>
          <View style={styles.modalBody}>
                 <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                    <Text style={styles.modalTitleText}>Editando Chave Pix</Text>
                    <EvilIcons name="close" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.content}>
                  <LabelInputField numeric={false} label={'Chave Pix:'} placeholder={"Chave pix"} value={chavePix} onChangeText={t=>setChavePix(t)}/>
                  <LabelInputField numeric={false} label={'Favorecido:'} placeholder={"Nome do favorecido"} value={favorecido} onChangeText={t=>setFavorecido(t)}/>
                      
                        
                  </View>
                 <TouchableOpacity onPress={onSalvar} style={styles.botaoSalvar}>
                   {!isLoading?<Text style={styles.botaoSalvarText}>Salvar</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
                </TouchableOpacity>
          </View>
        </View>
      </Modal>
      )


}

export default ModalPix


const styles = StyleSheet.create({

  modalArea:{
      flex:1,
      justifyContent:'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      },
  modalBody:{
      width: '100%',
      height: 280,
      backgroundColor: '#fff',
      borderTopLeftRadius:15,
      borderTopRightRadius: 15,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',  
      justifyContent: 'space-between',
      
      
  },
   content:{
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',  
      justifyContent: 'flex-start',
     
    },
  headerArea:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitleText:{
      fontWeight: 'bold',
      fontSize: 18,
  },
  label: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft:5,
      marginBottom:5,
    },
  inputArea: {
    width: '98%',
    height: 50,
    flexDirection: 'row',
    borderColor: cores.azul,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    
  },

input: {
  flex: 1,
  fontSize: 16,
  paddingHorizontal: 4,
  color: '#000',
  marginLeft: 10,
  
},
  botaoSalvar:{
    backgroundColor: cores.primary,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    height:50,
    width: '100%',
    marginBottom: 10,
  },
  botaoSalvarText:{
    color: '#fff',
    fontSize: 17,
    fontWeight:'bold',
  }
  
  })