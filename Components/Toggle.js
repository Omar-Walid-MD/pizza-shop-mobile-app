import { useEffect, useState } from "react";
import styles from "../styles";
import { Animated, I18nManager, Pressable, View } from "react-native"

export default function Toggle({})
{

    const [toggled,setToggled] = useState(false);
    const toggleSwitch = useState(new Animated.Value(0))[0];

    useEffect(()=>{

    Animated.timing(toggleSwitch,{
        toValue: toggled ? 1 : 0,
        duration: 100,
        useNativeDriver: false
    }).start()
    },[toggled]);

    return (
        <Pressable
        onPress={()=>setToggled(!toggled)}
        >
            <View
            //style[toggle]
            style={{...styles['toggle']}}
            >
                <Animated.View
                style={{...styles['h-100'],...styles['w-100'],backgroundColor:"#589941",opacity:toggleSwitch}}
                >

                </Animated.View>
                <Animated.View
                style={{height:"80%",...styles['w-50'],...styles['bg-white'],...styles['pos-abs'],...styles['shadow'],right:3,borderRadius:35,
                    transform: [{translateX:Animated.multiply(toggleSwitch,23*(I18nManager.isRTL ? 1 : -1))}]
                }}
                ></Animated.View>        
            </View>
        </Pressable>
    )
}