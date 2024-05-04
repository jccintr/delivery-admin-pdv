import { StyleSheet, StatusBar, SafeAreaView,Text,View, TouchableOpacity,Switch,Dimensions,ScrollView,ActivityIndicator } from 'react-native';
import React,{useState,useContext} from 'react';
import Header3 from '../components/Header3';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';
import DataContext from '../context/DataContext';
import LabelInputField from '../components/Inputs/LabelInputField';
import LabelInputArea from '../components/Inputs/LabelInputArea';
import ModalErro from '../components/modal/ModalErro';


const NovaPizza = () => {
    const {apiToken,pizzas,setPizzas} = useContext(DataContext);
    const navigation = useNavigation();
    const [pizza,setPizza] = useState({nome:'',descricao:'',ativo:true,grande:'',broto:'',imagem:null});
    const screenWidth = Dimensions.get('window').width;
    const [isSaving,setIsSaving] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [modalVisible,setModalVisible] = useState(false);

    const onBack = () => {
        navigation.goBack()
      } 

   const onAdd = async () => {

        if(pizza.nome.trim().length===0){
            setErrorMessage('Informe o nome da pizza por favor.')
            setModalVisible(true);
            return;
        }
        if(pizza.descricao.trim().length===0){
            setErrorMessage('Informe a descrição da pizza por favor.')
            setModalVisible(true);
            return;
        }
        if(pizza.grande.trim().length===0){
            setErrorMessage('Informe o preço da pizza grande por favor.')
            setModalVisible(true);
            return;
        }
        if(pizza.broto.trim().length===0){
            setErrorMessage('Informe o preço da pizza broto por favor.')
            setModalVisible(true);
            return;
        }
        if(parseFloat(pizza.grande) <= 0 || parseFloat(pizza.broto) <= 0){
            setErrorMessage('Os preços das pizza devem ser maiores do que zero.')
            setModalVisible(true);
            return;
        }

        setIsSaving(true);
        let response = await Api.addPizza(apiToken,pizza);

        if(response.status===201){
            const newPizza = await response.json();
            
            pizzas.push(newPizza);
            pizzas.sort((a, b) => a.nome.localeCompare(b.nome));
            const newArrPizzas = [...pizzas];
         
            setPizzas(newArrPizzas);
            setIsSaving(false);
            navigation.navigate('Pizzas');           

        }


    
   }

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
    <Header3 title="Nova Pizza" onBack={onBack} />
    <ScrollView style={{width: screenWidth}} showsVerticalScrollIndicator={false}>
       <View style={styles.body}>
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
            <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onAdd()} >
                   {!isSaving?<Text style={styles.botaoSalvarText}>SALVAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
             </TouchableOpacity>    
       </View>
    </ScrollView>
    <ModalErro visible={modalVisible} setVisible={setModalVisible} mensagem={errorMessage}/>
</SafeAreaView>
  )
}

export default NovaPizza

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  cores.whiteSmoke,
     },
     body: {
        
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'flex-start',
         paddingHorizontal: 5,
         paddingTop: 10,
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
   
    botaoSalvarText:{
        color: '#fff',
        fontSize: 17,
        fontWeight:'bold',
     },
})