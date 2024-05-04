import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';
import { FontAwesome } from '@expo/vector-icons'; 
import LabelInputField from '../Inputs/LabelInputField';



const Empty = () => {

  return <Text style={{width:'100%',textAlign:'center',color:'#f00'}}>Nenhuma opção cadastrada</Text>

}


const OpcaoCard = ({opcao,index,onDelete}) => {
   
  return (
     <View style={styles.opcaoCardContainer}>
        <Text>{opcao}</Text>
        <TouchableOpacity onPress={()=>onDelete(index)} >
            <FontAwesome name="trash-o" size={20} color="red" />
        </TouchableOpacity>
     </View>
   )
}



const ModalObrigatorio = ({modalVisible,setModalVisible,editando,onSalvar,obrigatorio,setObrigatorio}) => {
     const [newOption,setNewOption] = useState('');
  
   const onAddOption = () => {
          
       if (newOption.trim().length > 0) {
         
          let arrOption = obrigatorio.opcoes;
          arrOption.push(newOption);
          setObrigatorio({...obrigatorio,opcoes: arrOption});
          setNewOption('');

       }
       
   }

   const onRemoveOption = (index) => {
    
    
      let arrOption = obrigatorio.opcoes;
      arrOption.splice(index, 1);
      setObrigatorio({...obrigatorio,opcoes: arrOption})
      
   }
  
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
                <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                    <Text style={styles.modalTitleText}>{!editando?'Novo':'Editando'} Item Selecionável</Text>
                    <EvilIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.content}>
                <LabelInputField numeric={false} label={'Nome:'} placeholder={"Nome"} value={obrigatorio.nome} onChangeText={t=>setObrigatorio({...obrigatorio,nome: t})}/>
                    
                    <View>
                      <Text style={styles.label}>Nova Opção:</Text>
                      <View style={styles.inputArea}>
                          <TextInput style={styles.input}
                                  placeholder="Nova opção..."
                                  value={newOption}
                                  onChangeText={t=>setNewOption(t)}
                                  placeholderTextColor="#c1c1c1" 
                              />
                          <TouchableOpacity style={styles.addOptionButton} onPress={onAddOption}>
                               <FontAwesome name="plus" size={24} color={cores.primary} />
                           </TouchableOpacity>
                           
                      </View>
                    </View>
                    <View style={styles.optionsContainer}>
                        <Text style={styles.label}>Opções:</Text>  
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            style={styles.flatList}
                            data={obrigatorio.opcoes}
                            keyExtractor={(item)=> item.toString()}
                            renderItem={({item,index})=><OpcaoCard index={index} opcao={item} onDelete={onRemoveOption}/>}
                            ListEmptyComponent={<Empty/>}
                        />
                    </View>
                    <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onSalvar()} >
                        <Text style={styles.addButtonText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
                
          </View>
        </Modal>
      )




}

export default ModalObrigatorio

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: 500,
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
      color: cores.primary
    },
    inputArea: {
      width: '98%',
      height: 50,
      flexDirection: 'row',
     //borderColor: cores.azul,
      //borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 5,
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: cores.inputBackground,
     
    },
  
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 4,
    color: '#000',
    
  },
  addOptionButton:{
     marginRight: 5,
     
  },
  optionsContainer:{
    width: '98%',
    height: 200,
     borderColor: cores.azul,
     borderWidth: 1,
     padding:10,
     borderRadius:5,
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
   opcaoCardContainer: {
    width: '100%',
    height: 30,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth:0.5,

   },
   flatList:{
     width: '98%',
     padding:5,
   }

})