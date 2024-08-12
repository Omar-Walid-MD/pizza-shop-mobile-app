import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable, ScrollView, Animated, I18nManager } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from "../../styles";
import { LinearGradient } from 'expo-linear-gradient';

import {Dimensions} from 'react-native';
import { isMissingProfileInfo } from '../../helpers';
import i18n from '../../I18n/i18n';


export default function NavBar({state, descriptors, navigation, position})
{
    const buttons = {
        "Home": <MaterialCommunityIcons name="home" color="white" style={{fontSize:40}}/>,
        "Menu": <MaterialIcons name="menu-book" color="white" style={{fontSize:40}} />,
        "Profile": <MaterialIcons name="person" color="white" style={{fontSize:40}} />,
        "Cart": <MaterialIcons name="shopping-cart" color="white" style={{fontSize:40}} />,
        "Settings": <MaterialIcons name="settings" color="white" style={{fontSize:40}} />

    }
    const dispatch = useDispatch();
    const currentOrderID = useSelector(store => store.orders.currentOrderID);
    const user = useSelector(store => store.auth.user); 
        
    const [buttonCenters,setButtonCenters] = useState({});
    const screenWidth = Dimensions.get('window').width;
    const markerPosition = useState(new Animated.Value(screenWidth/2))[0];
    



    useEffect(()=>{
        const stateName = state.routes[state.index].name;
        if(buttonCenters[stateName])
        {
            Animated.timing(markerPosition,{
                toValue: buttonCenters[stateName],
                duration: 250,
                useNativeDriver: false
            }).start();
        }
    },[state]);

    return (
        <LinearGradient
        colors={["#CC6060", "#C03E3E","#C03E3E","#943030"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1,0.3,0.7,1]}
        >
            
            <NavBarMarker markerPosition={markerPosition} />
            <View
            //style[navbar]
            style={{...styles['navbar'],flexDirection: I18nManager.isRTL ? "row-reverse" : "row"}}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                        
                    };

                    
                    return (
                    <Pressable
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    // style={{...buttons[label].style,flexGrow:1}}
                    key={`tab-button-${index}`}

                    onLayout={(e)=>{
                        if(e?.nativeEvent?.layout)
                        {
                            let {x,width} = e.nativeEvent.layout;
                            setButtonCenters(b => ({...b,[route.name]: 
                                I18nManager.isRTL ?
                                screenWidth - (x+width/2):
                                x+width/2
                            }));
                            if(route.name==="Home")
                            {
                                Animated.timing(markerPosition,{
                                    toValue: 
                                        I18nManager.isRTL ?
                                        screenWidth - (x+width/2):
                                        x+width/2,
                                    duration: 500,
                                    useNativeDriver: false
                                }).start();
                            }
                        }
                    }}
                    >
                    {
                        <View
                        //style[al-items-c]
                        style={{...styles['al-items-c']}}
                        >
                            {buttons[label]}
                            {
                                ((route.name==="Cart" && currentOrderID) ||
                                (route.name==="Profile" && isMissingProfileInfo(user))) &&
                                <View
                                //style[pos-abs j-content-c al-items-c shadow top:-5 transform:"translateX(15px)" height:20 aspectRatio:1 borderRadius:20 backgroundColor:"limegreen"]
                                style={{...styles['pos-abs'],...styles['j-content-c'],...styles['al-items-c'],...styles['shadow'],top:-5,transform:"translateX(15px)",height:20,aspectRatio:1,borderRadius:20,backgroundColor:"limegreen"}}
                                >
                                    <MaterialCommunityIcons name="exclamation-thick" color="white" size={15} />
                                </View>
                            }
                        </View>
                    } 
                </Pressable>
                
                    );
                })}


            </View>
            
        </LinearGradient>
    );
}


function NavBarMarker({markerPosition})
{

    const lang = i18n.locale;
    return (
        <Animated.View
        style={{...styles['pos-abs'],
            top:-12,left:markerPosition,
            width:50,height:50,
            borderRadius:25,overflow:"hidden",
            transform: [{translateX:25*(I18nManager.isRTL ? 1 : -1)}]
        }}
        >
                <View
                style={{width:50,height:25,backgroundColor:"#CC6060",position:"absolute",top:-10}}
                >
                </View>
        </Animated.View>
    )
}