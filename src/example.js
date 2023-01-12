import React from 'react';
import saveFile from './Fichier';
export function makeFile(info){
    const tableau=[]
    const arrNom=[]
    
    
    let date=info.map(item=>item[0].date)
    let lastDate=date.join(',,,,')
    let excel=['sep=','\n,'+lastDate,'\nnom,OR,OP,AR,AP,OR,OP,AR,AP,OR,OP,AR,AP,OR,OP,AR,AP,OR,OP,AR,AP,OR,OP,AR,AP,Porte-Monnaie']
    const ajoute=(element)=>{
        let total=0
        let a =date.indexOf(element.date)+1
        console.lo
        let indexOr ='OR'+ a
        let indexOp ='OP'+ a
        let indexAr ='AR'+ a
        let indexAp ='AP'+ a
        console.log(element.date,a,'alement.date')
        !element.type.localeCompare("achat")?(
        tableau[arrNom.indexOf(element.nom)][indexOr]=parseFloat(tableau[arrNom.indexOf(element.nom)][indexOr])+element.prixOeuf,
        tableau[arrNom.indexOf(element.nom)].pm=element.newBalance,
        console.log(element, element.type.localeCompare("achat"),'length'),
        element.autre.length>0?(
            total=element.autre.reduce((acc,curr)=>Math.round(acc+curr.prix*curr.quantite*100)/100,0),
            tableau[arrNom.indexOf(element.nom)][indexAr]=parseFloat(tableau[arrNom.indexOf(element.nom)][indexAr])+total
            )
        :null

        ): !element.type.localeCompare("recharge")?(
            tableau[arrNom.indexOf(element.nom)][indexOp]=parseFloat(tableau[arrNom.indexOf(element.nom)][indexOp])+parseFloat(element.recharge),
            tableau[arrNom.indexOf(element.nom)].pm=element.newBalance,
            console.log(element.newBalance,'elemento')

        ):  (tableau[arrNom.indexOf(element.nom)][indexOp]=element.balance,
            tableau[arrNom.indexOf(element.nom)].pm= element.balance)
    }
    const makeTabNom=()=>{
        info.forEach(arr=>{
            arr.forEach(element=>{
                arrNom.includes(element.nom)?
                    null
                    : arrNom.push(element.nom)
            })
        })
        
    }
    const makeLine=()=>{
        arrNom.forEach(nom=>{
            tableau.push({nom:nom,OR1:0,OP1:0,AR1:0,AP1:0,OR2 :0,OP2 :0,AR2 :0,AP2 :0,OR3:0,OP3 :0,AR3 :0,AP3 :0,OR4:0,OP4:0,AR4:0,AP4:0,OR5:0,OP5:0,AR5:0,AP5:0,OR6:0,OP6:0,AR6:0,AP6:0,pm:0})
        })
    }
    const fillLine=()=>{
        info.forEach(arr=>{
            arr.forEach(element=>{
                ajoute(element)
            })
        })
    }
    const  makeTab=()=>{
        tableau.forEach(element=>{
            excel.push(["\n"+element.nom,element.OR1,element.OP1,element.AR1,element.AP2,element.OR2,element.OP2,element.AR2,element.AP2,element.OR3,element.OP3,element.AR3,element.AP3,element.OR4,element.OP4,element.AR4,element.AP4,element.OR5,element.OP5,element.AR5,element.AP5,element.OR6,element.OP6,element.AR6,element.AP6,element.pm].join(','))
        })
        excel=excel.join(',')
        console.log(excel,'excel')
        
        
    }
    makeTabNom()
    makeLine()
    console.log(tableau,'tableau')
    fillLine()
    makeTab()
    saveFile(excel)
    console.log(info,'info')
    console.log(lastDate,'date')
    console.log(tableau,'tableau')
    console.log(arrNom,'arrnom')
}