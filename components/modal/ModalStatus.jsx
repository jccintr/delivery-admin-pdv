import React, {useState} from 'react';
import { StyleSheet, Text, View,Modal,TouchableOpacity,FlatList,SafeAreaView} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../../style/globalStyle';
import { Octicons } from '@expo/vector-icons';

const ModalStatus = ({modalVisible,setModalVisible,statusList,onAddStatus}) => {
    const [selected,setSelected] = useState(0);
     
    const StatusItem = ({item}) => {

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={()=>onAddStatus(item.id)}>
                  <Octicons style={{marginRight: 10}} name="dot-fill" size={24} color={item.cor} />
                  <Text style={styles.itemText}>{item.descricao}</Text>
                 
            </TouchableOpacity>
           
        );
        
       }

       const Separator = () => {
          return (<View style={{borderBottomWidth: 0.5,borderBottomColor: '#f1f1f1'}}/>)
       }


       return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
                <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                    <Entypo name="chevron-down" size={34} color={cores.azul} />
                    <Text style={styles.modalTitleText}>Selecione o Status</Text>
                </TouchableOpacity>
                <View style={styles.content}>
                    <FlatList 
                        style={styles.flatList}
                        showsVerticalScrollIndicator={false}
                        data={statusList}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=><StatusItem item={item} />}
                        ItemSeparatorComponent={<Separator/>}
                    />
                </View>
            </View>
          </View>
        </Modal>
      )
}

export default ModalStatus

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: 450,
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
      alignItems: 'center',  
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
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft:5,
      marginBottom:5,
    },
    flatList: {
        width: '100%',
        
        paddingHorizontal: 5,
    },
    itemContainer: {
        
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText:{
        fontSize: 14,
    }
   
})