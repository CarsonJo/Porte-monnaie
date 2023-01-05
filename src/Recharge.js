import React, { useState,useEffect } from 'react';
import { View,StyleSheet,Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Recharge({navigation,route}){
    const {index,nom,balance}=route.params
    console.log(index,nom,balance,'route.params')
    const [name,setName]=useState(nom)
    const [tab,setTab]=useState([])
    const [tabDate,setTabDate]=useState([])
    const [pmonnaie,setPmonnaie]=useState(0)
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('liste', jsonValue)
        } catch (e) {
          console.log(e)
        }
        
        console.log(value,'valueeeee')
      }
      const storeDate = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('Date', jsonValue)
        } catch (e) {
          console.log(e)
        }
        console.log(value,'valueeeee')
      }
      
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

      const getDate = async () => {
        try {
          await AsyncStorage.getItem('Date').then(value=>{
            let newList=JSON.parse(value) 
            if (newList !== null)  
                setTabDate(newList)
            else
                console.log(newList,'NULLLLLLLL')
        })    

        } catch(e) {
            console.log(e+'erreur')
        }
        
      }
    console.log(typeof(balance),typeof(parseFloat(pmonnaie)),'typeof')
    const handleConfirmer=()=>{
        if(name!==nom || parseFloat(pmonnaie)!==balance){
            let newTab=[...tab]
            newTab.splice(index,1,{nom:name, balance:Math.round((parseFloat(pmonnaie)+parseFloat(balance))*100)/100})
            storeData(newTab)

            let fakeArrTwo=[...tabDate]
            let date=new Date()
            let completeDate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
            let histo={
            nom:nom,
            oldBalance:balance,
            newBalance:Math.round((parseFloat(balance)+parseFloat(pmonnaie))*100)/100,
            recharge:pmonnaie,
            date: completeDate,
            type:'recharge'
            }
            tabDate.length>0?    
              tabDate[tabDate.length-1][0].date===completeDate?(
                fakeArrTwo[fakeArrTwo.length-1].push(histo),
                storeDate(fakeArrTwo,'Date')
              ) :(
                fakeArrTwo.push([histo]),
                storeDate(fakeArrTwo,'Date')
              )
              :(
                fakeArrTwo.push([histo]),
                storeDate(fakeArrTwo,'Date')
              )
            navigation.navigate("Liste")
        }
    }
    const handleSupprimer= ()=>{
      let newTab=[...tab]
      balance==0?(
        newTab.splice(index,1),
        storeData(newTab),
        navigation.navigate("Liste")
      ) : alert('le compte n\'est pas a 0 impossible de supprimer')
    }
    useEffect(()=>{
        getData()
        console.log(tab,'tabb')
     },[])
     useEffect(()=>{
        
      getDate()
      console.log(tabDate,'tabDate')
     
  },[pmonnaie])
    return (
        
          <View style={styles.header}>
            <View style={{marginBottom:10}}>
              <Text style={styles.text}> {nom} </Text>
              <Text style={styles.text}>{balance}€</Text>
            </View>
            <View style={styles.group}>
            <Text style={styles.text}>Changer Nom :</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder={nom}
                style={styles.text}                
            />
            </View>
            <View style={styles.group}>
              <Text style={styles.text}>Recharger porte-monnaie: </Text>
              <TextInput
                value={pmonnaie}
                onChangeText={setPmonnaie}
                placeholder='0'
                keyboardType='numeric'
                style={styles.text}
              />
              <Text style={styles.text}>€</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={()=>handleConfirmer()} ><Text style={{fontSize:20}} >Confirmer Changement</Text></TouchableOpacity>
            </View>
            <View style={styles.supprButton}>
              <TouchableOpacity onPress={()=>handleSupprimer()} ><Text style={{fontSize:20}} >Supprimer</Text></TouchableOpacity>
            </View>
          </View>
        
    )
}
const styles = StyleSheet.create({
    header:{
        flex:1,
        

    },
    group:{
        flexDirection:'row'
    },
    text:{
        fontSize:25
    },
    button:{
        position:'absolute',
        bottom:10,
        right:10,
        padding:5,
        borderWidth:1,
        borderColor:'cyan',
        backgroundColor:'cyan',
        borderRadius:20
    },
    supprButton:{
      position:'absolute',
      bottom:10,
      left:10,
      padding:5,
      backgroundColor:'red',
      borderRadius:20
    }
})
