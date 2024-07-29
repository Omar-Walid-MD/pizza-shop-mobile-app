import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../../styles";
import { useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';

import {Ionicons} from "react-native-vector-icons"
import ScreenContent from '../Components/Layout/ScreenContent';


export default function OrderSuccessScreen({navigation}) {

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent>

                <View style={s("h-100 j-content-c al-items-c")}>

                    <Ionicons name="checkmark-circle-outline" size={150} />
                    
                    <Text style={s("text-center",{fontSize:35})}>تم إرسال الطلب بنجاح</Text>
                    <Text style={s("text-center fs-3 col-gray")}>الوقت المفترض للتوصيل: ساعتين</Text>

                    <View style={s("mt-3 gap-2")}>
                        <Button
                        onPress={()=>navigation.navigate("Main",{screen:"Home"})}>

                            <Text style={s("col-white fs-3")}>تتبع الطلب</Text>
                        </Button>

                        <Button variant='green'
                        onPress={()=>navigation.navigate("Main",{screen:"Home"})}>
                            <Text style={s("col-white fs-3")}>العودة الى الرئيسية</Text>
                        </Button>
                    </View>
                </View>
            </ScreenContent>
        </View>
    )
}