import React from 'react';
import { StyleSheet, Text, View,Modal,TouchableOpacity,Switch,ActivityIndicator} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';
import LabelInputField from '../Inputs/LabelInputField';
import LabelInputArea from '../Inputs/LabelInputArea';

const ModalPizza = ({modalVisible,setModalVisible,editando,onSalvar,pizza,setPizza,isSaving}) => {
     
 
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
                <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                    <Text style={styles.modalTitleText}>{!editando?'Nova':'Editando'} Pizza</Text>
                    <EvilIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.content}>
                <LabelInputField numeric={false} label={'Nome:'} placeholder={"Nome da pizza"} value={pizza.nome} onChangeText={t=>setPizza({...pizza,nome: t})}/>
                <LabelInputArea label={'Descrição:'} placeholder={"Descrição da pizza"} value={pizza.descricao} onChangeText={t=>setPizza({...pizza,descricao: t})} lines={3}/>    
                <LabelInputField numeric label={'Preço da Pizza Grande:'} placeholder={"Preço da pizza grande"} value={pizza.grande} onChangeText={t=>setPizza({...pizza,grande: t})}/>    
                <LabelInputField numeric label={'Preço da Pizza Broto:'} placeholder={"Preço da pizza broto"} value={pizza.broto} onChangeText={t=>setPizza({...pizza,broto: t})}/>    
                      
                   
                    <View style={{width:'100%',flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start'}}>
                        <Text style={[styles.labelAtivo]}>Exibir no cardápio:</Text>  
                        <Switch
                            style={{marginLeft: 10,}}
                            trackColor={{false: '#767577', true: '#767577'}}
                            thumbColor={pizza.ativo ? cores.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=>setPizza({...pizza,ativo: !pizza.ativo})}
                            value={pizza.ativo}
                        />    
                    </View>
                    
                    <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onSalvar()} >
                        {!isSaving?<Text style={styles.addButtonText}>SALVAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
                    </TouchableOpacity>
                </View>
            </View>
                
          </View>
        </Modal>
      )




}

export default ModalPizza

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: 520,
        backgroundColor: '#fff',
        borderTopLeftRadius:15,
        borderTopRightRadius: 15,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',  
        justifyContent: 'flex-start',  
        
    },
    content:{
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',  
      justifyContent: 'space-between',
     
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
        color: cores.azul,
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
  labelAtivo:{
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft:5,
    marginBottom:5,
    color: cores.primary,
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
  addButtomDisabled:{
      backgroundColor: '#a1a1a1',
  },
  addButtonText:{
      color: '#fff',
      fontSize: 17,
      fontWeight:'bold',
   },

})