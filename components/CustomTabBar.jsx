import React from 'react'
import { StyleSheet, Text,TouchableOpacity,View} from 'react-native';
import { Entypo,FontAwesome,AntDesign,Ionicons,Feather} from '@expo/vector-icons'; 
import { cores } from '../style/globalStyle';

const CustomTabBar = ({state,navigation}) => {

  const goTo = (screenName) => {
    navigation.navigate(screenName);
}

  return (
    <View style={styles.TabArea}>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Home')}>
              <Entypo style={{color:state.index === 0 ? cores.primary:cores.menuItem}} name="home" size={24}  />
              <Text style={state.index === 0 ? styles.TabItemTextSelected:styles.TabItemText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Pedidos')}>
              <Feather style={{color:state.index === 1 ? cores.primary:cores.menuItem}} name="shopping-cart" size={24}  />
              <Text style={state.index === 1 ? styles.TabItemTextSelected:styles.TabItemText}>Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Cardapio')}>
              <Ionicons style={{color:state.index === 2 ? cores.primary:cores.menuItem}} name="fast-food-outline" size={24}  />
              <Text style={state.index === 2 ? styles.TabItemTextSelected:styles.TabItemText}>Cardápio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Cadastros')}>
              <FontAwesome style={{color:state.index === 3 ? cores.primary:cores.menuItem}} name="user-circle-o" size={24}  />
              <Text style={state.index === 3 ? styles.TabItemTextSelected:styles.TabItemText}>Cadastros</Text>
            </TouchableOpacity>

    </View>
  )
}

export default CustomTabBar


const styles = StyleSheet.create({
    
    TabArea:{
        height: 60,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: cores.menuItem,

    },
    TabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TabItemText:{
      marginTop: 5,
      color: cores.menuItem
    },
    TabItemTextSelected:{
      marginTop: 5,
      color: cores.primary,
      fontWeight: 'bold'
    },
   
    AvatarIcon:{
        width: 24,
        height: 24,
        borderRadius: 12,
    },
   
    
  });