import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, TextInput, TouchableOpacity, View,StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


function Ajouter({setRefresh}){
    const [open,setOpen]=useState(false)
    const [nom,setNom]=useState('')
    const [balance,setBalance]=useState(0)
    const [tab,setTab]=useState([])
    const [tabDate,setTabDate]=useState([])
    
    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('Date')
          return true
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }
    
      
    const storeData = async (value,indice) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(indice, jsonValue)
        } catch (e) {
          console.log(e)
        }
        setRefresh(refresh=>!refresh)
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
      const getDate = async (index) => {
        try {
          await AsyncStorage.getItem(index).then(value=>{
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
        
    const handlePress=()=>{
        setOpen(true)

    }
    const handleClose=()=>{
        setNom('')
        setBalance(0)
        setOpen(false)
    }
    
    const handleSave=()=>{
        let arr=[]
        if (!tab){
         arr=[]
        } else{
            arr=[...tab]
        }
        arr.push({'nom':nom,'balance':parseFloat(balance)})
        storeData(arr,'liste')

        
        
        let fakeArrTwo=[...tabDate]
        let date=new Date()
        let completeDate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
        arr={
          nom:nom,
          balance:balance,
          date:completeDate,
          visible:false,
          type:'creation'
      }
        tabDate.length>0?    
          tabDate[tabDate.length-1][0].date===completeDate?(
            fakeArrTwo[tabDate.length-1].push(arr),
            console.log(fakeArrTwo,'fakearrone'),
            storeData(fakeArrTwo,'Date')
          ) :(
            fakeArrTwo.push([arr]),
            console.log(fakeArrTwo,'fakearrTwo'),
            storeData(fakeArrTwo,'Date')
          )
          :(
            fakeArrTwo.push([arr]),
            console.log(fakeArrTwo,'fakearrThree'),
            storeData(fakeArrTwo,'Date')
          )
        
        setOpen(false)
        

    }
    useEffect(()=>{
       getData()
       console.log(tab,'tab')
       console.log('open')
    },[open])
    
    useEffect(()=>{
        
        getDate('Date')
        console.log(tabDate,'tabDate')
       
    },[])
    

    return(
        <View style={{flex:1}} >
            <TouchableOpacity onPress={()=>handlePress()} ><AntDesign name="pluscircle" size={50} color="black" /></TouchableOpacity>
            <Modal
            visible={open}
            onRequestClose={( ) => setOpen(false)}
           
            >
            <View style={styles.position}>
                <TextInput
                    value={nom}
                    placeholder='nom'
                    onChangeText={setNom}
                    style={styles.input}
                />
                <TextInput
                    value={balance}
                    placeholder='porte-monnaie'
                    onChangeText={setBalance}
                    keyboardType='numeric'
                    style={styles.input}
                />
            </View>
            <View style={styles.close}>
                <TouchableOpacity onPress={()=>handleSave()}><AntDesign name="save" size={50} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleClose()}><AntDesign name="closecircle" size={50} color="black" /></TouchableOpacity>
            </View>
            </Modal>
        </View>

    )
}

const styles=StyleSheet.create({
    input:{
        borderWidth:1,
        padding:10,
        alignItems:'center'
    },
    close:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'

    },
    position:{
        flex:1,
        justifyContent:'center'
    }
   
})
export default Ajouter