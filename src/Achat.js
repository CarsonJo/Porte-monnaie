import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,Text,StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

function Achat({navigation,route}){
    const keyy=useRef(0)
    const [tabDate,setTabDate]=useState([])
    const [tab,setTab]=useState([])
    const [oeuf,setOeuf]=useState(0)
    const [quantite,setQuantite]=useState(0)
    const [price,setPrice]=useState(0)
    const [calcul,setCalcul]=useState(0)
    const [listeAutre,setListeAutre]=useState([])
    const [total,setTotal]=useState(0)
    const [modal,setModal]=useState(false)
    const [arr,setArr]=useState([])
    const {nom,index,balance,set}=route.params
   

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('liste')
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }
    
    

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('liste', jsonValue)
        } catch (e) {
          console.log(e)
        }
        console.log(value,'value')
      }
      const storeDate = async (value,index) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(index, jsonValue)
        } catch (e) {
          console.log(e)
        }
        console.log(value,index,'valueeeee')
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
            if (newList !== null){  
                setTabDate(newList),
                console.log(newList,'yessss')}
            else
                console.log(newList,'NULLLLLLLL')
        })    

        } catch(e) {
            console.log(e+'erreur')
        }
        
      }
      

    const handlePress=(item)=>{
        setOeuf(item)
        setCalcul(Math.round(item*2.3/6*100)/100)
        console.log(calcul,'calcul')
    }

    const handleAjouter=(item)=>{
        let fakeTab=[...listeAutre]
        fakeTab.push(item)
        setListeAutre(fakeTab)
        console.log(quantite)
        console.log(fakeTab)
    }

    const handleDelete=(index)=>{
        let fakeTab=[...listeAutre]
        fakeTab.splice(index,1)
        setListeAutre(fakeTab)
        console.log("index",index)
    }

    const handleConfirmer=()=>{
        
        let fakeArrTwo=[...tabDate]
        let date=new Date()
        let completeDate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
        let histo={
            nom:nom,
            oldBalance:balance,
            newBalance:Math.round((balance-total)*100)/100,
            date: completeDate,
            oeuf:oeuf,
            prixOeuf:Math.round((oeuf/6)*230)/100,
            autre: listeAutre,
            total:total,
            type:'achat',
            visible:false
        }
        console.log(completeDate,'completeDate')
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
       
    
        let fakeArr=[...tab]
        fakeArr.splice(index,1,{nom:nom ,balance:Math.round((balance-total)*100)/100})
        storeData(fakeArr)
        navigation.navigate('Liste')
    }

    const key=()=>{
        keyy.current=keyy.current+1
        return keyy.current
    }
    useEffect(()=>{
        
        getDate('Date')
        console.log(tabDate,'tabDate')
       
    },[oeuf])
    
    useEffect(()=>{
        getData()
        console.log(tab,'tabb')
     },[])

    useEffect(()=>{
        let somme=listeAutre.reduce((prev,curr)=> 
            prev+Math.round(curr.nombre*curr.prix*100)/100,0
        )
        setTotal(calcul+somme)
    },[listeAutre,calcul]) 
    return (
        <View style={{flex:1}}>

           <View style={styles.header}>
             <Text style={styles.text}> {nom} </Text>
             <Text style={styles.text}>{balance}€</Text>
           </View>

            <Text style={styles.textCorp}>Achat Oeuf : </Text>

            <View style={styles.liste}>
               <TouchableOpacity onPress={()=>handlePress(6)}><Text style= {styles.choice}> 6</Text></TouchableOpacity>
               <TouchableOpacity  onPress={()=>handlePress(12)}><Text style={styles.choice}>12</Text></TouchableOpacity>
               <TouchableOpacity  onPress={()=>handlePress(18)}><Text style={styles.choice}>18</Text></TouchableOpacity>
               <TouchableOpacity  onPress={()=>handlePress(24)}><Text style={styles.choice}>24</Text></TouchableOpacity>
               <TouchableOpacity  onPress={()=>handlePress(30)}><Text style={styles.choice}>30</Text></TouchableOpacity>
                <TextInput
                    value={oeuf}
                    onChangeText={setOeuf}
                    onEndEditing={()=>setCalcul(Math.round(oeuf*2.3/6*100)/100)}
                    placeholder='0'
                    style={styles.input}
                    keyboardType='numeric'
                
                />
            </View>

            <Text style={styles.textCorp} >Autre Achat:</Text>

            <View style={styles.autreAChat}>
                <View style={styles.prix}>
                    <Text style={styles.input}>Quantité:</Text>
                    <TextInput
                        value={quantite}
                        onChangeText={setQuantite}
                        placeholder='0'
                        style={styles.input}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.input}>Prix:</Text>
                    <View style={{flexDirection:'row'}}>
                      <TextInput
                        value={price}
                        onChangeText={setPrice}
                        placeholder='0'
                        style={styles.input}
                        keyboardType='numeric'
                      /><Text style={{fontSize:20}}>€</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>handleAjouter({nombre: quantite,prix: price})}><Text style={styles.choice}>Ajouter</Text></TouchableOpacity>
           </View>
            <Text>{oeuf} oeuf {calcul}€</Text>
            {listeAutre.map((item)=>
        
                    <View key={key() } style={{flexDirection:'row'}} >
                    <Text>{item.nombre} autre {Math.round(item.prix*item.nombre*100)/100}€   </Text>
                    <TouchableOpacity onPress={()=>handleDelete(listeAutre.indexOf(item))}><AntDesign name="delete" size={24} color="black" /></TouchableOpacity>
                    </View>
                
            )}
            <Text>Total: {total}€</Text>
            <TouchableOpacity style={styles.terminer} onPress={()=>setModal(true)}><Text style={styles.choice}>Terminer Achat</Text></TouchableOpacity>

            <Modal
                visible={modal}
                onRequestClose={()=>setModal(false)}
                transparent={true}
                
            >
              <View style={styles.popUp}>
                <View style={styles.fenetre}>
                <Text style={styles.input}>Confirmer Achat?</Text>
                <Text style={styles.input}>{oeuf} oeuf {calcul}€</Text>
                {listeAutre.map((item)=>
            
                        <View key={key() } style={{flexDirection:'row'}} >
                        <Text style={styles.input}>{item.nombre} autre {Math.round(item.prix*item.nombre*100)/100}€   </Text>
                        </View>
                    
                )}
                <Text style={{textDecorationLine:'underline',fontSize:20}}>Total: {total}€</Text>
                <View style={styles.header}>
                    <Text style={styles.textCorp}> {nom} </Text>
                    <Text style={styles.textCorp}>{Math.round((balance-total)*100)/100}€</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity><Text style={styles.redChoice} onPress={()=>setModal(false)}>Annuler</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>handleConfirmer()}><Text style={styles.choice}>Confirmer</Text></TouchableOpacity>
                </View>
                
                </View>
              </View>
            
            
            
            </Modal>
        </View>
    )

}

const styles=StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:'10%'

    },
    text:{
        fontSize:30
    },
    textCorp:{
        fontSize:25
    },
    liste:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    choice:{
        padding:5,
        fontSize:20,
        borderWidth:1,
        borderRadius:25,
        backgroundColor:'cyan',
        borderColor:'cyan'
    },
    redChoice:{
        padding:5,
        fontSize:20,
        borderWidth:1,
        borderRadius:25,
        backgroundColor:'red',
        borderColor:'red'

    },
    input:{
        fontSize:20,
        
    },
    autreAChat:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:'10%'
    },
    prix:{
        
    },
    terminer:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    popUp:{
        
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        
        borderWidth:1
    },
    fenetre:{
        padding:10,
        backgroundColor:'white',
        borderRadius:20
    }

})

export default Achat