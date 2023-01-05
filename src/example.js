import React from 'react';


export function makeFile(info){
    console.log(info,'info')
    let file='sep=,\nporte monnaie,nom'
    let date=info.map(item=>item[0].date).join(',')
    
    console.log(date,'date')
}