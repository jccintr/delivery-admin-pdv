import React,{ useState,useEffect } from 'react';
import { StyleSheet, Text, View,Modal,TouchableOpacity,TextInput,Switch} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';

const ModalProduto = ({modalVisible,setModalVisible,onSalvar,produto}) => {
    const [preco,setPreco] = useState(produto.preco);
    const [nome,setNome] = useState(produto.nome);
    const [ativo,setAtivo] = useState(produto.ativo);

 
    useEffect(()=>{
       setNome(produto.nome);
       setPreco(produto.preco);
       setAtivo(produto.ativo);
   },[produto]);

   const toggleSwitch = () => setAtivo(ativo => !ativo);

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
                <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                    <Entypo name="chevron-down" size={34} color={cores.azul} />
                    <Text style={styles.modalTitleText}>Editando Produto</Text>
                </TouchableOpacity>
                <View style={styles.content}>
                
                    <View>
                      <Text style={styles.label}>Nome:</Text>
                      <View style={styles.inputArea}>
                          <TextInput style={styles.input}
                                  placeholder="Nome do produto..."
                                  value={nome}
                                  onChangeText={t=>setNome(t)}
                                  placeholderTextColor="#c1c1c1" 
                              />
                      </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Preço:</Text>
                        <View style={styles.inputArea}>
                              <TextInput style={styles.input}
                                    placeholder="Preço de venda..."
                                    value={preco}
                                    keyboardType='decimal-pad'
                                    onChangeText={t=>setPreco(t)}
                                    placeholderTextColor="#c1c1c1" 
                                />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',alignItems:'center'}}>
                        <Text style={styles.label}>Exibir no cardápio:</Text>  
                        <Switch
                            style={{marginLeft: 10}}
                            trackColor={{false: '#767577', true: '#767577'}}
                            thumbColor={ativo ? cores.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={ativo}
                        />
                    </View>
                    
                    
                    <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onSalvar(produto.id,nome,preco,ativo)} >
                        <Text style={styles.addButtonText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
                
          </View>
        </Modal>
      )

}

export default ModalProduto

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: 310,
        backgroundColor: '#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius: 10,
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
      alignItems: 'flex-start',  
      justifyContent: 'space-between',
     
    },
    headerArea:{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 10,
    },
    modalTitleText:{
        fontWeight: 'bold',
        fontSize: 18,
        color: cores.azul,
    },
    nome:{
      fontWeight: 'bold',
      fontSize: 16,
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
  addButtomDisabled:{
      backgroundColor: '#a1a1a1',
  },
  addButtonText:{
      color: '#fff',
      fontSize: 17,
      fontWeight:'bold',
   },

})