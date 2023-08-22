import { StyleSheet, Text, View,Modal,TouchableOpacity,ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import { EvilIcons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker';
import { cores } from '../../style/globalStyle';



const ColorPickerModal = ({title,visible,setVisible,color,setColor}) => {
  const [selectedColor,setSelectedColor] = useState(color);

  const onSalvar = () => {
      setColor(selectedColor);
      setVisible(false);
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={()=>setVisible(false)}>
        <View style={styles.modalArea}>
           <View style={styles.modalBody}>
               <TouchableOpacity style={styles.headerArea} onPress={()=>setVisible(false)}>
                    <Text style={styles.modalTitleText}>{title}</Text>
                    <EvilIcons name="close" size={24} color="black" />
               </TouchableOpacity>
               <View style={styles.content}>
                    <ColorPicker style={styles.colorPicker}
                            ref={r => { this.picker = r }}
                            color={color}
                            onColorChange={(color)=>setSelectedColor(color)}
                            onColorChangeComplete={(color)=>setSelectedColor(color)}
                            thumbSize={40}
                            sliderSize={20}
                            noSnap={true}
                            row={false}
                            swatchesOnly={false}
                            swatchesLast={true}
                            swatches={true}
                            discrete={false}
                            shadeWheelThumb={false}
                    /> 
                    <View styles={[styles.colorArea,{backgroundColor: selectedColor}]}/>
                    <TouchableOpacity onPress={onSalvar} style={styles.botaoSalvar}>
                       <Text style={styles.botaoSalvarText}>Selecionar</Text>
                    </TouchableOpacity>
               </View>
           </View>
        </View>
    </Modal>
  )
}

export default ColorPickerModal

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: 400,
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
    colorPicker: {
      width: '90%',
      marginBottom: 10,
     },
    colorArea: {
      height: 50,
      width: '100%',
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