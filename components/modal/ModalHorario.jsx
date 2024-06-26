import React from 'react';
import { StyleSheet, Text, View,Modal,TouchableOpacity,TextInput} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';
import LabelInputField from '../Inputs/LabelInputField';


const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];


const ModalHorario = ({modalVisible,setModalVisible,editando,onSalvar,horario,setHorario}) => {
 
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>

          <View style={styles.modalArea}>

            <View style={styles.modalBody}>
                <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                    <Text style={styles.modalTitleText}>{!editando?'Novo':'Editando'} Horário</Text>
                    <EvilIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                
                <View style={styles.content}>
                    <LabelInputField numeric={false} label={days[horario.dia]} placeholder={"Horário de funcionamento"} value={horario.horario} onChangeText={t=>setHorario({...horario,horario: t})}/>
                    
                    
                        <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onSalvar()} >
                            <Text style={styles.addButtonText}>SALVAR</Text>
                        </TouchableOpacity>
                </View>
            </View>
                
          </View>
        </Modal>
      )






}

export default ModalHorario

const styles = StyleSheet.create({



    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: 210,
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
      justifyContent:'space-between',
     
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
    inputArea: {
      width: '98%',
      height: 50,
      flexDirection: 'row',
      borderColor: cores.azul,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    label:{
        width: '100%',
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 18,
        
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
  addButtomDisabled:{
      backgroundColor: '#a1a1a1',
  },
  addButtonText:{
      color: '#fff',
      fontSize: 17,
      fontWeight:'bold',
   },




})