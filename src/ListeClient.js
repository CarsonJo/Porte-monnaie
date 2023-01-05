import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './List';
import Achat from './Achat';
import Recharge from './Recharge';

function ListeClient(){
    const Stack=createNativeStackNavigator()

    return(
        
            <Stack.Navigator>
                <Stack.Screen name='Liste' component={List}/>
                <Stack.Screen name='Achat' component={Achat} />
                <Stack.Screen name='Recharge' component={Recharge} />
            </Stack.Navigator>
       
    )
}

export default ListeClient