import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../Screens/HomeScreen";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
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
import { getLoggedInUserId, setUser } from '../Store/Auth/authSlice';
import { getUser } from '../Firebase/Data Handlers/users';
import { getItems } from '../Store/Items/itemsSlice';
import { getCart } from '../Store/Cart/cartSlice';
import { getOrders } from '../Store/Orders/ordersSlice';
import OrdersScreen from '../Screens/OrdersScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import { signInAnonymously } from 'firebase/auth';
import { getSettings, setSetting } from '../Store/Settings/settingsSlice';
import { changeLanguage } from '../I18n/i18n';
import Background from '../Components/Background';
import Text from '../Components/Text';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function Navigator()
{
    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.user);
    const userId = useSelector(store => store.auth.userId);
    const currentLang = useSelector(store => store.settings.lang);
    const [initialLangChange,setInitialLangChange] = useState(false);

	useEffect(()=>{
        if(userId)
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
                else
                {
                    dispatch(setUser(null));
                }

                console.log(userId);
                dispatch(getCart());
                dispatch(getOrders());

				
			}
			else
            {
                if(userId==="anonymous")
                {
                    signInAnonymously(auth).then(()=>{
                        dispatch(setUser(null));
                    });
                }
            }
		});
	},[userId]);

    useEffect(()=>{
        dispatch(getSettings());
        dispatch(getLoggedInUserId());
        dispatch(getItems());
    },[]);

    // useEffect(()=>{
    //     if(userId)
    //     {
    //         dispatch(getCart());
    //         dispatch(getOrders());
    //     }
    // },[userId,user]);

    useEffect(()=>{
        if(currentLang && !initialLangChange)
        {
            changeLanguage(currentLang);
            setInitialLangChange(true);
        }
    },[currentLang])

    return (
        <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:"transparent"}}}>
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
        sceneContainerStyle={{backgroundColor:"transparent"}}
        screenOptions={{swipeEnabled:true}} tabBarPosition='bottom'
        initialRouteName='Home'
        layoutDirection='ltr'
        tabBar={props => <NavBar {...props} />}
        >
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />

        </Tab.Navigator>
    )
}
