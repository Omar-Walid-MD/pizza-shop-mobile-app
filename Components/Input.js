import { View, TextInput, Animated } from 'react-native';
import styles from "../styles";
import Text from './Text';
import { useEffect, useState } from 'react';

export default function Input(props) {

    const [labelOpacity,setLabelOpacity] = useState(new Animated.Value(0));
    const [labelEnabled,setLabelEnabled] = useState(false);

    useEffect(()=>{
        Animated.timing(labelOpacity,{
            toValue: labelEnabled,
            duration: 100,
            useNativeDriver: false
        }).start();
    },[labelEnabled]);

    useEffect(()=>{
        if(props.label)
        {
            if(props.value && !labelEnabled) setLabelEnabled(1)
            else if(!props.value && labelEnabled) setLabelEnabled(0);
        }
    },[props.label,props.value]);


    return (
        <View>
            <TextInput cursorColor={"#C03E3E"} textAlign='right'
            style={{...styles['input'],...styles['shadow'],fontFamily:"Cairo",fontSize:16.5,color:"black",
                ...(props.label ? {paddingTop:8} : {})
            }}
            {...props}/>
            
            {
                props.label &&
                <Animated.View
                pointerEvents='none'
                style={{...styles['pos-abs'],...styles['rounded'],paddingHorizontal:4,backgroundColor:"gray",
                    transform: [{translateY:-8},{translateX:-5}],opacity:labelOpacity
                }}>
                    <Text
                    //style[col-white fontSize:10]
                    style={{...styles['col-white'],fontSize:10}}
                    weight='sb'
                    >{props.placeholder}</Text>
                </Animated.View>
            }
        </View>
    );
}
