import { StyleSheet, Text, View,Modal,TouchableOpacity,ActivityIndicator } from 'react-native';
import React, {useState,useContext} from 'react';
import Api from '../../Api';
import { cores } from '../../style/globalStyle';
import { Entypo,EvilIcons } from '@expo/vector-icons';
import DataContext from '../../context/DataContext';
import InputField from '../InputField';



const ModalSenha = ({modalVisible,setModalVisible}) => {
  const [novaSenha,setNovaSenha] = useState('');
  const [confirmaSenha,setConfirmaSenha] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const {apiToken} = useContext(DataContext);


  const onAlteraSenha = async () => {
   
    if(novaSenha!==confirmaSenha){
       alert("As senhas são diferentes.");
    } else {
      
      setIsLoading(true);
      let response = await Api.changePassword(apiToken,novaSenha);
      if(response.status===200){
        setNovaSenha('');
        setConfirmaSenha('');
        setModalVisible(false)
      } else {
        alert("Falha ao alterar senha.");
      }
      setIsLoading(false);

    }

    

   }

   const OnFecharModal = () => {
    setNovaSenha('');
    setConfirmaSenha('');
    setModalVisible(false)
   }

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
    <View style={styles.modalArea}>
      <View style={styles.modalBody}>
             <TouchableOpacity style={styles.headerArea} onPress={OnFecharModal}>
                <Text style={styles.modalTitleText}>Alteração de Senha de Acesso</Text>
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>
              <InputField 
                iconProvider="MaterialCommunityIcons"
                iconName="lock-outline"
                placeholder="Digite a nova senha"
                value={novaSenha}
                onChangeText={t=>setNovaSenha(t)}
                password={true}
             />
             <InputField 
                iconProvider="MaterialCommunityIcons"
                iconName="lock-outline"
                placeholder="Confirme a nova senha"
                value={confirmaSenha}
                onChangeText={t=>setConfirmaSenha(t)}
                password={true}
             />
              
             <TouchableOpacity onPress={onAlteraSenha} style={styles.botaoSalvar}>
               {!isLoading?<Text style={styles.botaoSalvarText}>Alterar a Senha</Text>:<ActivityIndicator style={styles.loading} size="large" color={cores.branco}/>}
          </TouchableOpacity>
      </View>
    </View>
  </Modal>
  )
}

export default ModalSenha

const styles = StyleSheet.create({

  modalArea:{
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    },
modalBody:{
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderTopLeftRadius:15,
    borderTopRightRadius: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',  
    justifyContent: 'space-around',  
    
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