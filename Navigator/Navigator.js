import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../Screens/HomeScreen";
import { StyleSheet } from "react-native";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/Layout/NavBar';
import MenuScreen from '../Screens/MenuScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import CartScreen from '../Screens/CartScreen';
import CheckoutScreen from '../Screens/CheckoutScreen';
import OrderSuccessScreen from '../Screens/OrderSuccessScreen';
import { auth } from '../Firebase/firebase';
import { setUser } from '../Store/Auth/authSlice';
import { getUser } from '../Firebase/Data Handlers/users';
import { getItems } from '../Store/Items/itemsSlice';
import { getCart } from '../Store/Cart/cartSlice';
import { getOrders } from '../Store/Orders/ordersSlice';
import OrdersScreen from '../Screens/OrdersScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function Navigator()
{
    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.user);

	useEffect(()=>{	
		auth.onAuthStateChanged(function(user)
		{
			if(user)
			{
				if(!user.isAnonymous)
				{

					(async()=>{
						dispatch(setUser({
						userId: user.uid,
						email: user.email,
						...await getUser(user.uid)
						}))
					})();
				}
				
			}
			else dispatch(setUser(null));
		});
	},[]);

    useEffect(()=>{
        dispatch(getItems());
    },[]);

    useEffect(()=>{
        dispatch(getCart());
        dispatch(getOrders());
    },[user,auth.currentUser]);

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />


            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

function TabNavigator({navigation})
{
    return (
        <Tab.Navigator
        screenOptions={{swipeEnabled:true}} tabBarPosition='bottom'
        initialRouteName='Home'
        layoutDirection='ltr'
        tabBar={props => <NavBar {...props} />}
        >
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
    )
}
