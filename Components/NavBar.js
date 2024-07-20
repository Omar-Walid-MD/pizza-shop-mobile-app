import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons'

import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {s} from "../styles";

export default function NavBar({state, descriptors, navigation, position})
{
    const dispatch = useDispatch();

    // const buttons = {
    //     "Home": {
    //         icon: "home",
    //         size: 40,
    //         style: {}
    //     },
    //     "Timetable": {
    //         icon: "timetable",
    //         size: 35,
    //         style: {paddingTop:5,alignItems:"center"}
    //     },
    //     "Settings": {
    //         icon: "cog",
    //         size: 40,
    //         style: {alignItems:"flex-end"}
    //     }
    // }



    return (

        <View style={s("navbar")}>
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

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };                

                return (
                <Pressable
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                // style={{...buttons[label].style,flexGrow:1}}
                key={`tab-button-${index}`}
                >
                    <MaterialCommunityIcons name="home" color="white" style={{fontSize:50}}/>
            </Pressable>
           
                );
            })}


        </View>
    );
}
 