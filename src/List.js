import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, View,Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';


import Ajouter from './Ajouter';

function List({navigation,route}){
    const [tab,setTab]=useState([{nom:'default', balance:0}])
    const [index,setIndex]=useState(0)
    const [refresh,setRefresh]=useState(false)
   
    
    const getData = async () => {
        try {
          await AsyncStorage.getItem('liste').then(value=>{
            let newList=JSON.parse(value)   
            setTab(newList)

        })    

        } catch(e) {
            console.log(e+'erreur')
        }
    }

    const handleAchat=(index)=>{
        setIndex(index)
        navigation.navigate('Achat',{
            index: index,
            nom :tab[index].nom,
            balance:tab[index].balance,
            
        })
    }
    const handleRecharge=(index)=>{
        setIndex(index)
        navigation.navigate('Recharge',{
            index: index,
            nom :tab[index].nom,
            balance:tab[index].balance,
            
    
        })
    }

    const renderItem=({item})=>{
        console.log(item,"bark")
        return (

        <View style={styles.render}>
            
            <Text style={styles.text}>{item.nom}</Text>
            <TouchableOpacity style={styles.achat} onPress={() => handleAchat(tab.indexOf(item))}><Text style={styles.text}>Achat</Text></TouchableOpacity>
            <TouchableOpacity style={styles.recharge} onPress={()=> handleRecharge(tab.indexOf(item))}><Text style={styles.text}>Recharge</Text></TouchableOpacity>
            <Text style={styles.text}>{item.balance}€</Text>
            
        </View>
        )
    }
    
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Refreshed!');
            getData()
          });
          return unsubscribe;
        
    },[navigation]) 
    useEffect(()=>{
        getData()
    },[refresh])
    
    
    return (
        <View style={{flex:1}}>
    
            <FlatList 
                data={tab}
                renderItem={renderItem}
                keyExtractor={item=>item.nom}
                
             />
             <View style={styles.ajouter}>
                <Ajouter setRefresh={setRefresh}/>
             </View>
        </View>
    )   
}
const styles=StyleSheet.create({
    render:{
        padding:'5%',
        borderBottomWidth:2,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    ajouter:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    touch:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    Text:{
        fontSize:25
    },
    modal:{
        flex:0.5,
        backgroundColor:'#FFFFFF',
        justifyContent:'space-between'
    },
    achat:{
        padding:5,
        backgroundColor:'cyan',
        borderColor:'cyan',
        borderWidth:1,
        borderRadius:25
        
    },
    recharge:{
        padding:5,
        backgroundColor:'cyan',
        borderColor:'cyan',
        borderWidth:1,
        borderRadius:25
        
    },
    layoutAchat:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginBottom:'5%',
        marginTop:'5%',    
    },
    panier:{
        fontSize:20
    },
    valider:{
        marginRight:'80%',
        fontSize:20,
        borderWidth:1,
        borderRadius:20,
        borderColor:'cyan',
        backgroundColor:'cyan'
        
    },
    text:{
        fontSize:20
    }
})
export default List