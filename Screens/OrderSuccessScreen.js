import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../styles";
import { useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';

import {Ionicons} from "react-native-vector-icons"
import ScreenContent from '../Components/Layout/ScreenContent';


export default function OrderSuccessScreen({navigation}) {

    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent>

                <View
                style={{...styles['h-100'],...styles['j-content-c'],...styles['al-items-c']}}
                >

                    <Ionicons name="checkmark-circle-outline" size={150} />
                    
                    <Text
                    style={{...styles['text-center'],fontSize:35}}>تم إرسال الطلب بنجاح</Text>
                    <Text
                    style={{...styles['text-center'],...styles['fs-3'],...styles['col-gray']}}
                    >الوقت المفترض للتوصيل: ساعتين</Text>

                    <View
                    style={{...styles['mt-3'],...styles['gap-2']}}
                    >
                        <Button
                        onPress={()=>navigation.navigate("Main",{screen:"Cart"})}>

                            <Text
                            style={{...styles['col-white'],...styles['fs-3']}}
                            >تتبع الطلب</Text>
                        </Button>

                        <Button variant='green'
                        onPress={()=>navigation.navigate("Main",{screen:"Home"})}>
                            <Text
                            style={{...styles['col-white'],...styles['fs-3']}}
                            >العودة الى الرئيسية</Text>
                        </Button>
                    </View>
                </View>
            </ScreenContent>
        </View>
    )
}