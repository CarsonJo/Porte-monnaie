import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, View,TouchableOpacity,Text, StyleSheet  } from 'react-native';
import saveFile from './Fichier';
import { makeFile } from './example';


function Historique () {
    

    const [tab,setTab]=useState([])
    const [tabDate,setTabDate]=useState([])
    const [refresh,setRefresh]=useState(true)
    const [visible,setVisible]=useState(false)

   
    const getData= async()=>{
        try{
            await AsyncStorage.getItem('Date').then(value =>{
                let newList=JSON.parse(value)
                setTab(newList)

            })
        } catch(e){
            console.log('erreur',e)
        }
    } 
    const handlePress=(index)=>{
      let fakeArray=[...tab]
      fakeArray[index][0].visible=!fakeArray[index][0].visible
      setTab(fakeArray)
      console.log(tab[index][0].visible,'true')
    }

    
    const handleRefresh=()=>{
      setRefresh(refresh=>!refresh)
    
    }
    const handleFichier=()=>{
      makeFile(tab)
    }

    const renderItem=({item})=>{
      return(
        item.type==='achat'?
        <View style={styles.flatlist}>
          <Text style={{fontWeight:'bold'}}>{item.nom}:</Text>
          <Text>Ancien compte: {item.oldBalance}€</Text>
          <Text>{item.oeuf} oeufs {item.prixOeuf}€</Text>
          {item.autre.map(item=>
              <View  key={item.prix} style={{flexDirection:'row'}} >
                <Text style={styles.input}>{item.nombre} autre {Math.round(item.prix*item.nombre*100)/100}€   </Text>
              </View>
            )}
          <Text>Total: {item.total}€</Text>
          <Text>Nouveau compte: {item.newBalance} €</Text>
        </View> 
        : item.type==='recharge'?
        <View style={styles.flatlist}>
          <Text style={{fontWeight:'bold'}}>{item.nom}:</Text>
          <Text>Ancien compte: {item.oldBalance}€</Text>
          <Text>Recharge : {item.recharge}€</Text>
          <Text>Nouveau compte: {item.newBalance} €</Text>
        </View> 
        : 
        <View style={styles.flatlist}>
          <Text style={{fontWeight:'bold'}}>{item.nom}:</Text>
          <Text>Création: {item.balance} €</Text>
          
        </View> 
      )
    }
    const renderList=({item})=> {
      return(
        <View style={{flex:1,flexDirection:'column'}} >
          <TouchableOpacity style={styles.touch} onPress={()=>handlePress(tab.indexOf(item))}><Text style={styles.text}>{item[0].date}</Text></TouchableOpacity>
          {item[0].visible?
          <FlatList
            data={item}
            renderItem={renderItem}
            numColumns={2}
          /> : null
          }
        </View>
      )
    }

    useEffect(() => {
      getData()
      console.log('refresh')
      console.log(tab,"newlisttttt")
    }, [refresh])
    
    
    return (
        <View style={{flex:1}}>
          <FlatList
            data={tab}
            renderItem={renderList}
            extraData={tab}
          
          />
          <TouchableOpacity onPress={()=>handleRefresh()}><Text>refresh </Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>handleFichier()}><Text>save </Text></TouchableOpacity>
          
        </View>
    )
    
    
}
const styles=StyleSheet.create({
    text:{
      fontSize:25,
      
      
    },
    touch:{
      flex:1,
      alignItems:'center',
      backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
      width: '100%',
      marginVertical: 10,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      
      
    },
    flatlist:{
      marginRight:25
    }
})

export default Historique ;