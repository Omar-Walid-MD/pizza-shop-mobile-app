import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from "../../styles";
import { LinearGradient } from 'expo-linear-gradient';

import {Dimensions} from 'react-native';


export default function NavBar({state, descriptors, navigation, position})
{
    const dispatch = useDispatch();

    const screenWidth = Dimensions.get('window').width;


    const buttons = {
        "Home": <MaterialCommunityIcons name="home" color="white" style={{fontSize:40}}/>,
        "Menu": <MaterialIcons name="menu-book" color="white" style={{fontSize:40}} />,
        "Profile": <MaterialIcons name="person" color="white" style={{fontSize:40}} />,
        "Cart": <MaterialIcons name="shopping-cart" color="white" style={{fontSize:40}} />

    }

    const [buttonCenters,setButtonCenters] = useState({});

    const markerPosition = useState(new Animated.Value(screenWidth/2))[0];

    return (
        <LinearGradient
        colors={["#CC6060", "#C03E3E","#C03E3E","#943030"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1,0.3,0.7,1]}
        >
            
            <Marker markerPosition={markerPosition} />
            <View
            //style[navbar]
            style={{...styles['navbar']}}
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
                        
                        Animated.timing(markerPosition,{
                            toValue: buttonCenters[route.name],
                            duration: 500,
                            useNativeDriver: false
                        }).start();
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
                            setButtonCenters(b => ({...b,[route.name]: screenWidth - (x+width/2)}));
                            if(route.name==="Home")
                            {
                                Animated.timing(markerPosition,{
                                    toValue: screenWidth - (x+width/2),
                                    duration: 500,
                                    useNativeDriver: false
                                }).start();
                            }
                        }
                    }}
                    >
                    {
                        buttons[label]
                    } 
                </Pressable>
                
                    );
                })}


            </View>
            
        </LinearGradient>
    );
}


function Marker({markerPosition})
{
    return (
        <Animated.View
        //style[pos-abs top:-12 left:markerPosition width:50 height:50 borderRadius:25 overflow:"hidden"]
        style={{...styles['pos-abs'],
            top:-12,left:markerPosition,
            width:50,height:50,
            borderRadius:25,overflow:"hidden",transform: [{translateX:25}]
        }}
        >
                <View
                style={{width:50,height:25,backgroundColor:"#CC6060",position:"absolute",top:-10}}
                >

                </View>
        </Animated.View>
    )
}