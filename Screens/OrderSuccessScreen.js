import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../styles";
import { useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';

import {Ionicons} from "react-native-vector-icons"
import ScreenContent from '../Components/Layout/ScreenContent';
import { useTranslation } from 'react-i18next';


export default function OrderSuccessScreen({navigation}) {

    const { t: translate} = useTranslation();

    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent>
                <View style={{...styles['h-100'], ...styles['j-content-c'], ...styles['al-items-c']}}>
                    <Ionicons name="checkmark-circle-outline" size={150} />
                    
                    <Text style={{...styles['text-center'], fontSize: 35}}>
                        {translate("order_success.order_success")}
                    </Text>
                    <Text style={{...styles['text-center'], ...styles['fs-3'], ...styles['col-gray']}}>
                        {translate("order_success.expected_delivery_time")}
                    </Text>

                    <View style={{...styles['mt-3'], ...styles['gap-2']}}>
                        <Button onPress={() => navigation.navigate("Main", {screen: "Cart"})}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                                {translate("order_success.track_order")}
                            </Text>
                        </Button>

                        <Button variant='green' onPress={() => navigation.navigate("Main", {screen: "Home"})}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                                {translate("order_success.return_to_home")}
                            </Text>
                        </Button>
                    </View>
                </View>
            </ScreenContent>
        </View>

    )
}