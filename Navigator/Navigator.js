import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../Screens/HomeScreen";
import { StyleSheet } from "react-native";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../Components/NavBar';
import MenuScreen from '../Screens/MenuScreen';

const Tab = createMaterialTopTabNavigator();

export default function Navigator()
{
    const dispatch = useDispatch();

    useEffect(()=>{

    },[]);

    return (
        <Tab.Navigator
        screenOptions={{swipeEnabled:false}} tabBarPosition='bottom'
        tabBar={props => <NavBar {...props} />}
        >
            <Tab.Group>
                <Tab.Screen name="Menu" component={MenuScreen} />
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Group>
        </Tab.Navigator>
    );
}

