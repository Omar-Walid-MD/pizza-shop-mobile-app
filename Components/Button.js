import { Text, View, Image, Pressable, Animated } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * MyComponent description
 * @param {object} props - Component props
 * @param {"green"|"white"|"red"} props.variant - The variant of the component
 */

export default function Button(props) {

    const buttonOverlayOpacity = useState(new Animated.Value(0))[0];

    return (
        <LinearGradient
        style={{...(props.style || {}),borderRadius:5,shadowColor:"black",elevation:2,overflow:"hidden",justifyContent:"center"}}
        colors={
            props.variant==="red" || !props.variant ? 
            ["#CC6060", "#C03E3E","#C03E3E","#943030"]
            : props.variant==="white" ?
            ["#FFFFFF", "#FAFAFA","#FAFAFA","#D1D1D1"]
            : props.variant==="green" &&
            ["#6EB755", "#589941","#589941","#4B8237"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1,0.3,0.7,1]}
        >
            <Pressable
            
            style={{backgroundColor:"transparent",justifyContent:"center",paddingVertical:5,paddingHorizontal:15,alignItems:"center"}}
            onPress={props.onPress}

            onPressIn={()=>
                Animated.timing(buttonOverlayOpacity,{
                    toValue: 0.35,
                    duration: 100,
                    useNativeDriver: false
                }).start()
            }
            onPressOut={()=>
                Animated.timing(buttonOverlayOpacity,{
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false
                }).start()
            }
            >
            {props.children}
            </Pressable>
            <Animated.View pointerEvents="none"
            //style[pos-abs w-100 h-100 backgroundColor:"black" opacity:buttonOverlayOpacity]
            style={{...styles['pos-abs'],...styles['w-100'],...styles['h-100'],backgroundColor:"black",opacity:buttonOverlayOpacity}}
            ></Animated.View>
        </LinearGradient>
    )
}

// Define the type for your props
Button.propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    style: PropTypes.object,
    class: PropTypes.string,
    variant: PropTypes.oneOf(["red","white","green"])
};