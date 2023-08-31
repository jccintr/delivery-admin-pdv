import { StyleSheet, StatusBar, SafeAreaView,Text,View,TextInput,FlatList, TouchableOpacity,Image,ActivityIndicator,ScrollView ,Dimensions} from 'react-native';
import React,{useState,useContext} from 'react';
import Header3 from '../components/Header3';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';
import DataContext from '../context/DataContext';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';


const NovoProduto = () => {
  const navigation = useNavigation();
  const [nome,setNome] = useState('');
  const [descricao,setDescricao] = useState('');
  const [preco,setPreco] = useState('');
  const [categoriaId,setCategoriaId] = useState(0);
  const [imagem,setImagem] = useState(null);
  const {apiToken,categorias,setCategorias} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const screenWidth = Dimensions.get('window').width;
 

  const onBack = () => {
    navigation.goBack()
  }

  const onSalvar = async (nome,descricao,preco,categoria_id) => {
        
    if (categoria_id===0){
      alert("Selecione uma categoria por favor."); 
      return;
    }

    if(isNaN(preco)){
      alert("Preço inválido."); 
      return;
    }
    setIsLoading(true);
    const fd = new FormData();
    fd.append('nome',nome);
    fd.append('descricao',descricao);
    fd.append('preco',preco);
    fd.append('categoria_id',categoriaId);
    if (imagem!=null){
       fd.append('imagem',{uri: imagem,type: 'image/jpg',name: 'image.jpg',});
    }
    let response = await Api.addProduto(apiToken,fd);
    if (response.status===201){
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

  const Categoria = ({categoria,selected}) => {
    return (
         <TouchableOpacity onPress={()=>setCategoriaId(categoria.id)} style={[{borderWidth:1,padding:5,margin:5,borderRadius:5},categoria.id===selected?styles.categorySelected:'']}>
            <Text style={categoria.id===selected?styles.categorySelectedText:''}>{categoria.nome}</Text>
         </TouchableOpacity>
    )
}

const selectImage = async () =>{
    
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 4],
    quality: 1,
  });

  if (!result.canceled) {
    setImagem(result.assets[0].uri);
  }

}


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={cores.primary} barStyle="dark-content"/>
        
        <Header3 title="Novo Produto" onBack={onBack} />
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
                 <TouchableOpacity onPress={selectImage} style={styles.imgButton}>
                    {imagem===null&&<>
                      <FontAwesome name="photo" size={50} color={cores.primary} />
                      <Text style={{color:cores.primary,fontSize:14,fontWeight:'bold'}}>Adicionar Imagem</Text>
                    </>}
                    {imagem&&<Image style={styles.imagem} source={{uri:`${imagem}`,}}/>}
                 </TouchableOpacity>
                 
                 <TouchableOpacity style={styles.botaoSalvar} onPress={()=>onSalvar(nome,descricao,preco,categoriaId)} >
                    {!isLoading?<Text style={styles.buttonText}>SALVAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
                 </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default NovoProduto

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
   botaoSalvar:{
        backgroundColor: cores.primary,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        height:50,
        width: '100%',
        marginBottom: 10,
   },
   buttonText:{
        color: '#fff',
        fontSize: 17,
        fontWeight:'bold',
   },
 
})