import { StyleSheet, StatusBar, SafeAreaView,Text,View,TextInput,FlatList, TouchableOpacity,Switch,Image,Dimensions,ScrollView,ActivityIndicator } from 'react-native';
import React,{useState,useEffect,useContext} from 'react';
import Header from '../components/Header';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';
import DataContext from '../context/DataContext';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome,Fontisto } from '@expo/vector-icons';

const EditProduto = ({route}) => {
    const navigation = useNavigation();
    const {idProduto} = route.params;  
    const [nome,setNome] = useState('');
    const [descricao,setDescricao] = useState('');
    const [preco,setPreco] = useState('');
    const [categoriaId,setCategoriaId] = useState('');
    const [ativo,setAtivo] = useState(false);
    const [imagem,setImagem] = useState(null);
    const {apiToken,categorias,setCategorias} = useContext(DataContext);
    const [obrigatoriosProduto,setObrigatoriosProduto] = useState([]);
    const [obrigatorios,setObrigatorios] = useState([]);
    const [adicionaisProduto,setAdicionaisProduto] = useState([]);
    const [adicionais,setAdicionais] = useState([]);
    const screenWidth = Dimensions.get('window').width;
    const [isLoading,setIsLoading] = useState(false);
    const [isLoadingClone,setIsLoadingClone] = useState(false);
    const [isLoadingScreen,setIsLoadingScreen] = useState(true);

    useEffect(()=>{
        
        const getObrigatorios = async () => {
          setIsLoadingScreen(true);
          let response = await Api.getObrigatorios(apiToken);
          if(response.status===200) {
            let json = await response.json();
            setObrigatorios(json);
          }
          setIsLoadingScreen(false);
        }
        getObrigatorios();
    
     },[]);

     useEffect(()=>{
        
        const getAdicionais = async () => {
          setIsLoadingScreen(true);
          let response = await Api.getAdicionais(apiToken);
          if(response.status===200) {
            let json = await response.json();
            setAdicionais(json);
          }
          setIsLoadingScreen(false);
        }
        getAdicionais();
    
     },[]);

     useEffect(()=>{
        const getProduto = async (id) => {
          setIsLoadingScreen(true);
          let response = await Api.getProduto(apiToken,id);
          if(response.status===200) {
            let json = await response.json();
            setNome(json.nome);
            setDescricao(json.descricao);
            setPreco(json.preco);
            setCategoriaId(json.categoria_id);
            setAtivo(json.ativo);
            setImagem(json.imagem);
            setObrigatoriosProduto(json.obrigatorios);
            setAdicionaisProduto(json.adicionais);
          }
          setIsLoadingScreen(false);
        }
        getProduto(idProduto);
    
     },[]);
    

    const toggleSwitch = () => setAtivo(ativo => !ativo);

    const toggleSelecionavel = async (obrigatorio) => {
        // receber o obrigatorio e determinar se ele já esta vinculado ao produto atual
        if (obrigatoriosProduto.findIndex(item=>item.obrigatorio_id===obrigatorio.id)!==-1) {
            // já vinculado, deletar
            let indice = obrigatoriosProduto.findIndex(item=>item.obrigatorio_id===obrigatorio.id)
            let response = await Api.DeleteProdutoObrigatorio(apiToken,obrigatoriosProduto[indice].id);
            if(response.status===200) {
                let response2 = await Api.getProduto(apiToken,idProduto);
                let json = await response2.json();
                setObrigatoriosProduto(json.obrigatorios);
            }
        } else {
            // não vinculado, incluir
            let response = await Api.AddProdutoObrigatorio(apiToken,idProduto,obrigatorio.id);
            if(response.status===201) {
                let response2 = await Api.getProduto(apiToken,idProduto);
                let json = await response2.json();
                setObrigatoriosProduto(json.obrigatorios);
            }
        }
       
        
    }

    const toggleAdicional = async (adicional) => {
        // receber o adicional e determinar se ele já esta vinculado ao produto atual
        if (adicionaisProduto.findIndex(item=>item.adicional_id===adicional.id)!==-1) {
            // já vinculado, deletar
            let indice = adicionaisProduto.findIndex(item=>item.adicional_id===adicional.id)
            let response = await Api.DeleteProdutoAdicional(apiToken,adicionaisProduto[indice].id);
            if(response.status===200) {
                let response2 = await Api.getProduto(apiToken,idProduto);
                let json = await response2.json();
                setAdicionaisProduto(json.adicionais);
            }
        } else {
            // não vinculado, incluir
            let response = await Api.AddProdutoAdicional(apiToken,idProduto,adicional.id);
            //console.log(response.status);
            if(response.status===201) {
                let response2 = await Api.getProduto(apiToken,idProduto);
                let json = await response2.json();
                setAdicionaisProduto(json.adicionais);
            }
        }
       
        
    }
    const onClonar = async (idProduto) => {
        setIsLoadingClone(true);
        let response = await Api.cloneProduto(apiToken,idProduto);
        if (response.status===201){
            let response2 = await Api.getCategorias(apiToken);
            let json = await response2.json();
            setCategorias(json);
            navigation.navigate('Cardapio');
        } else {
            alert(response.status);
            let json = await response.json();
        }
        setIsLoadingClone(false);
    }

    const onSalvar = async (id,nome,descricao,preco,categoria_id,ativo) => {
        
        if(isNaN(preco)){
           alert("Preço inválido."); 
        } else {
            setIsLoading(true);
            let response = await Api.updateProduto(apiToken,id,nome,descricao,preco,categoria_id,ativo);
            if (response.status===200){
                let response2 = await Api.getCategorias(apiToken);
                let json = await response2.json();
                setCategorias(json);
                navigation.navigate('Cardapio');
            } else {
                alert(response.status);
                let json = await response.json();
            }
            setIsLoading(false);
      
        }
        
      
      }

      const changeImage = async () =>{
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 4],
          quality: 1,
        });
      
        if (!result.canceled) {
          setIsLoading(true);
          const fd = new FormData();
          fd.append('imagem',{uri: result.assets[0].uri,type: 'image/jpg',name: 'image.jpg',});
          let response = await Api.updateImagemProduto(apiToken,idProduto,fd);
          if (response.status===200){
            let response2 = await Api.getProduto(apiToken,idProduto);
            let json = await response2.json();
            setImagem(json.imagem);
          }
          setIsLoading(false);
        }
      
      }
      
    const onObrigatorioPress = (id) => {
         let newArray = [];
         newArray.push(id);
         setObrigatorioSelected(newArray);
    }  
   /*
    const Obrigatorio = ({obrigatorio}) => {
        return (
            <TouchableOpacity onPress={()=>toggleSelecionavel(obrigatorio)} style={[{borderWidth:1,padding:5,margin:5,borderRadius:5},obrigatoriosProduto.findIndex(item=>item.obrigatorio_id===obrigatorio.id)!==-1?styles.categorySelected:'']}>
                 <Text style={obrigatoriosProduto.findIndex(item=>item.obrigatorio_id===obrigatorio.id)!==-1?styles.categorySelectedText:''}>{obrigatorio.nome}</Text>
            </TouchableOpacity>
        )
    }
   */
    const Obrigatorio = ({obrigatorio}) => {
        return (
            <TouchableOpacity onPress={()=>toggleSelecionavel(obrigatorio)} style={{width: '98%',flexDirection:'row',alignItems:'flex-start',backgroundColor: '#daeaf5',padding:10,margin:5}}>
                 {obrigatoriosProduto.findIndex(item=>item.obrigatorio_id===obrigatorio.id)!==-1?<Fontisto name="checkbox-active" size={18} color="black" />:<Fontisto name="checkbox-passive" size={18} color="black" />}
                 <Text style={{marginLeft:10}}>{obrigatorio.nome}</Text>
            </TouchableOpacity>
        )
    }

    /*
    const Adicional = ({adicional}) => {
        return (
            <TouchableOpacity onPress={()=>toggleAdicional(adicional)} style={[{borderWidth:1,padding:5,margin:5,borderRadius:5},adicionaisProduto.findIndex(item=>item.adicional_id===adicional.id)!==-1?styles.categorySelected:'']}>
                 <Text style={adicionaisProduto.findIndex(item=>item.adicional_id===adicional.id)!==-1?styles.categorySelectedText:''}>{adicional.nome}</Text>
            </TouchableOpacity>
        )
    }
   */
    const Adicional = ({adicional}) => {
        return (
            <TouchableOpacity onPress={()=>toggleAdicional(adicional)} style={{width: '98%',flexDirection:'row',alignItems:'flex-start',backgroundColor: '#daeaf5',padding:10,margin:5}}>
                 {adicionaisProduto.findIndex(item=>item.adicional_id===adicional.id)!==-1?<Fontisto name="checkbox-active" size={18} color="black" />:<Fontisto name="checkbox-passive" size={18} color="black" />}
                 <Text style={{marginLeft:10}}>{adicional.nome}</Text>
            </TouchableOpacity>
        )
    }

    const Categoria = ({categoria,selected}) => {
        return (
             <TouchableOpacity onPress={()=>setCategoriaId(categoria.id)} style={[{borderWidth:1,padding:5,margin:5,borderRadius:5},categoria.id===selected?styles.categorySelected:'']}>
                <Text style={categoria.id===selected?styles.categorySelectedText:''}>{categoria.nome}</Text>
             </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
           <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
           <Header title="Editando Produto"/>
           {isLoadingScreen&&<ActivityIndicator style={styles.loading} size="large" color={cores.primary}/>}
           <ScrollView style={{width: screenWidth}} showsVerticalScrollIndicator={false}>
           <View style={styles.body}>
                  <Text style={styles.label}>Nome:</Text>
                  <View style={styles.inputArea}>
                       <TextInput style={styles.input}
                                  placeholder="Nome do produto..."
                                  value={nome}
                                  onChangeText={t=>setNome(t)}
                                  placeholderTextColor="#c1c1c1" 
                       />
                   </View> 

                   <Text style={styles.label}>Descrição:</Text>
                   <View style={[styles.inputArea,{height:75}]}>
                       <TextInput style={styles.input}
                                  placeholder="Descrição do produto..."
                                  value={descricao}
                                  onChangeText={t=>setDescricao(t)}
                                  placeholderTextColor="#c1c1c1" 
                                  multiline={true}
                                  numberOfLines={4}
                       />
                   </View> 
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
                    <Text style={styles.label}>Categoria:</Text>
                    <FlatList 
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatList}
                        data={categorias}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=><Categoria categoria={item} selected={categoriaId}/>}
                        horizontal={true}
                    />
                    <View style={{width:'100%',flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start'}}>
                        <Text style={[styles.labelAtivo]}>Exibir no cardápio:</Text>  
                        <Switch
                            style={{marginLeft: 10,}}
                            trackColor={{false: '#767577', true: '#767577'}}
                            thumbColor={ativo ? cores.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={ativo}
                        />    
                    </View>
                        <Text style={styles.label}>Itens Selecionáveis:</Text>
                        {obrigatorios.map((item)=><Obrigatorio key={item.id} obrigatorio={item}/>)}
                        

                        <Text style={styles.label}>Itens Adicionais:</Text>
                        {adicionais.map((item)=><Adicional key={item.id} adicional={item}/>)}
                        

                    <TouchableOpacity onPress={changeImage} style={styles.imgButton}>
                        {imagem===null&&<>
                        <FontAwesome name="photo" size={50} color={cores.primary} />
                        <Text style={{color:cores.primary,fontSize:14,fontWeight:'bold'}}>Adicionar Imagem</Text>
                        </>}
                        {imagem&&<Image style={styles.imagem} source={{uri:`${Api.base_storage}/${imagem}`,}}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoClonar} onPress={()=>onClonar(idProduto)} >
                        {!isLoadingClone?<Text style={styles.botaoClonarText}>CLONAR ESTE PRODUTO</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onSalvar(idProduto,nome,descricao,preco,categoriaId,ativo)} >
                        {!isLoading?<Text style={styles.buttonText}>SALVAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
                    </TouchableOpacity>
           </View>
           </ScrollView>
        </SafeAreaView>
      )
}

export default EditProduto

const styles = StyleSheet.create({

    container: {
            flex: 1,
            backgroundColor: cores.whiteSmoke,
        },
        body: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 5,
            paddingTop: 10,
        },
       
        label: {
            width: '100%',
            textAlign: 'left',    
            fontWeight: 'bold',
            fontSize: 16,
            marginLeft:10,
            marginBottom:5,
            color: cores.primary,
        },
        labelAtivo:{
            fontWeight: 'bold',
            fontSize: 16,
            marginLeft:5,
            marginBottom:5,
            color: cores.primary,
        },
        inputArea: {
            width: '98%',
            height: 50,
            flexDirection: 'row',
            borderColor: 'black',
            borderRadius: 10,
            paddingHorizontal: 5,
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: '#daeaf5'
        },
      input: {
            flex: 1,
            fontSize: 16,
            paddingHorizontal: 4,
            color: '#000',
    },
    flatList: {
        width: '100%',
        paddingHorizontal: 5,
    },
    categorySelected: {
        borderColor: cores.primary,
    },
    categorySelectedText: {
        color: cores.primary,
        fontWeight: 'bold',
    },
    imgButton: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginBottom:10,
        borderWidth:2,
        borderRadius: 5,
        borderColor: cores.primary,
        width: '100%',
        height: 150,
        borderStyle: 'dashed',
        padding: 10,
   },
   imagem:{
      width: '100%',
      height: 140,
      borderRadius: 5,
   },
   botaoClonar:{
    borderColor: cores.primary,
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height:50,
    width: '100%',
    marginBottom: 10,
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
    botaoClonarText:{
        color: cores.primary,
        fontSize: 17,
        fontWeight:'bold',
    },
    buttonText:{
        color: '#fff',
        fontSize: 17,
        fontWeight:'bold',
     },
     loading:{
        position: 'absolute',
        top: '50%',
        width: '100%',
       }

})