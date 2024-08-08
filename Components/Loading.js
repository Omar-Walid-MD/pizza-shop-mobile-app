import { View, TextInput, Animated, Image } from 'react-native';
import styles from "../styles";
import Text from './Text';
import { useEffect, useState } from 'react';

export default function Loading({}) {

    const offsets = Array.from({length:4}).map(()=>useState(new Animated.Value(0))[0]);

    useEffect(()=>{
        for (let i = 0; i < offsets.length; i++)
        {
            Animated.sequence([
                Animated.delay(i*100),
                Animated.loop(Animated.sequence([
                    Animated.delay(400),
                    Animated.timing(offsets[i],{toValue:1,duration:500,useNativeDriver:true}),
                    Animated.timing(offsets[i],{toValue:0,duration:500,useNativeDriver:true})
                ]))    
            ]).start();
        }
    },[]);


    return (
        <View
        //style[w-100 al-items-c]
        style={{...styles['w-100'],...styles['al-items-c']}}
        >
            <View
            //style[width:150 flex-row flexWrap:"wrap" j-content-c]
            style={{width:110,...styles['flex-row'],flexWrap:"wrap",...styles['j-content-c']}}
            >
            {
                Array.from({length:4}).map((x,i)=>
                <Animated.View key={`loading-slice-${i}`}
                style={{
                    padding:2,
                    transform:
                    [
                        {scaleX:(i+1)%2 ? 1 : -1},
                        {scaleY:i<2 ? 1 : -1},
                        {translateX:Animated.multiply(offsets[i],10)},
                        {translateY:Animated.multiply(offsets[i],-10)},
                    ]
                }}
                >
                    <Image source={require("../assets/img/loading-slice.png")} resizeMode='contain'
                    style={{height:50,aspectRatio:1}}
                    />
                </Animated.View>
                )
            }
            </View>
        </View>
    );
}
