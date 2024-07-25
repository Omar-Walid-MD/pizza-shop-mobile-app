import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../Screens/HomeScreen";
import { StyleSheet } from "react-native";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../Components/Layout/NavBar';
import MenuScreen from '../Screens/MenuScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import CartScreen from '../Screens/CartScreen';
import CheckoutScreen from '../Screens/CheckoutScreen';
import OrderSuccessScreen from '../Screens/OrderSuccessScreen';
import { auth } from '../firebase';
import { setUser } from '../Store/Auth/authSlice';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function Navigator()
{

    const dispatch = useDispatch();

	useEffect(()=>{
		
		auth.onAuthStateChanged(function(user)
		{
			if(user)
			{
				if(!user.isAnonymous)
				{
                    console.log(user)
                    dispatch(setUser({
                        userId: user.uid,
                        email: user.email
                    }));

					// (async()=>{
					// 	dispatch(setUser({
					// 	userId: user.uid,
					// 	email: user.email,
					// 	...await getUser(user.uid)
					// 	}))
					// })();
				}
				else
				{

                }
			}
			else dispatch(setUser(null));
		});
	},[]);

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

function TabNavigator({navigation})
{
    return (
        <Tab.Navigator
        screenOptions={{swipeEnabled:false}} tabBarPosition='bottom'
        initialRouteName='Home'
        tabBar={props => <NavBar {...props} />}
        >
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />

        </Tab.Navigator>
    )
}
