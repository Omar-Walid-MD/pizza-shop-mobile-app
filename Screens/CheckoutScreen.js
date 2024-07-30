import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../styles";
import { useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';
import CheckBox from '../Components/CheckBox';
import ScreenContent from '../Components/Layout/ScreenContent';

export default function CheckoutScreen({navigation}) {

    const deliveryOptions = [
        {
            type: "normal",
            label: "Normal – 9.99 EGP"
        },
        {
            type: "quick",
            label: "Quick – 29.99 EGP"
        }
    ];

    const paymentOptions = [
        {
            type:"v-cash",
            label: "Vodafone Cash"
        },
        {
            type:"credit-card",
            label: "Credit Card"
        },
        {
            type:"inst-pay",
            label: "Insta Pay"
        }
    ]

    const [deliveryIndex,setDeliveryIndex] = useState(0);

    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent
            header={
                <View
                style={{...styles['w-100'],...styles['flex-row'],...styles['al-items-c'],...styles['j-content-b'],...styles['px-2']}}
                >
                    <Text
                    style={{...styles['fs-2']}}
                    >دفع الطلب</Text>

                    <Button variant='green'
                    onPress={()=>navigation.navigate("Main")}>
                        <Text
                        style={{...styles['col-white']}}
                        >العودة</Text>
                    </Button>
                </View>
            }>

                <View
                //style[w-100 al-items-s]
                style={{...styles['w-100'],...styles['al-items-s']}}
                >
                    <Text
                    style={{...styles['fs-2']}}
                    >تفاصيل الطلب</Text>

                    <View style={{...styles['mt-2']}}>
                    {
                        Array.from({length:4}).map((x,i)=>
                            <View
                            style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['al-items-c'],...styles['gap-3']}}
                            key={`order-item-${i}`}>
                                <Text
                                style={{...styles['fs-3'],...styles['col-gray'],...styles['w-50']}}
                                >- الإسم و الحجم  x1</Text>
                                <Text 
                                style={{...styles['fs-3'],...styles['col-gray']}}
                                >19.99 EGP</Text>
                            </View>
                        )
                    }
                    </View>
                </View>

                <View
                style={{...styles['w-100'],...styles['al-items-s']}}
                >
                    <Text
                    style={{...styles['fs-2']}}
                    >طريقة التوصيل</Text>
                    <View
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['mt-2']}}
                    >
                    {
                        deliveryOptions.map((option,i)=>
                        <View
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b']}}
                        key={`delivery-option-${i}`}>
                            <Text
                            style={{...styles['fs-3']}}
                            >{option.label}</Text>
                            <CheckBox
                            checked={deliveryIndex === i}
                            onPress={() => setDeliveryIndex(i)}
                            />
                        </View>
                        )
                    }
                    </View>
                </View>


                <View
                style={{...styles['w-100'],...styles['al-items-s']}}
                >
                    <Text style={{...styles['fs-2']}}>طريقة الدفع</Text>
                    <View
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['mt-2']}}>
                    {
                        paymentOptions.map((option,i)=>
                        <View
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b']}}
                        key={`delivery-option-${i}`}>
                            <Text
                            style={{...styles['fs-3']}}
                            >{option.label}</Text>
                            <CheckBox
                            checked={deliveryIndex === i}
                            onPress={() => setDeliveryIndex(i)}
                            />
                        </View>
                        )
                    }
                    </View>
                </View>


                <View>
                    <Text
                    style={{...styles['fs-2']}}
                    >المجموع: 29.99 EGP</Text>
                    <Text
                    style={{...styles['fs-2']}}
                    >التوصيل: 29.99 EGP</Text>
                    <Text
                    style={{...styles['fs-2']}}
                    >الإجمالي: 29.99 EGP</Text>

                </View>

                <Button style={{...styles['mt-3']}}
                onPress={()=>navigation.navigate("OrderSuccess")}>
                    <Text style={{...styles['fs-2'],...styles['col-white']}}>تأكيد الدفع</Text>
                </Button>

            </ScreenContent>
        </View>
    )
}