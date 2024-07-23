import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, Pressable, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons'

import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {s} from "../styles";
import { LinearGradient } from 'expo-linear-gradient';

export default function NavBar({state, descriptors, navigation, position})
{
    const dispatch = useDispatch();

    const buttons = {
        "Home": <MaterialCommunityIcons name="home" color="white" style={{fontSize:40}}/>,
        "Menu": <MaterialIcons name="menu-book" color="white" style={{fontSize:40}} />,
        "Profile": <MaterialIcons name="person" color="white" style={{fontSize:40}} />
    }

    return (
        <LinearGradient
        colors={["#CC6060", "#C03E3E","#C03E3E","#943030"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1,0.3,0.7,1]}
        >
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
 