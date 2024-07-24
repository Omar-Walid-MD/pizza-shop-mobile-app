import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles, { s } from '../styles';
import { useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';
import CheckBox from '../Components/CheckBox';

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
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <View style={s("screen-content")}>

                <View style={s("w-100 flex-row al-items-c j-content-b")}>
                    <Text style={s("fs-1")}>دفع الطلب</Text>

                    <Button variant='green'
                    onPress={()=>navigation.navigate("Main")}>
                        <Text style={s("col-white")}>العودة</Text>
                    </Button>
                </View>

                <ScrollView style={s("w-100")}>
                    <View style={s("w-100 gap-3 pb-4")}>
                        <View style={s("w-100 al-items-s")}>
                            <Text style={s("fs-2")}>تفاصيل الطلب</Text>

                            <View style={s("mt-2")}>
                            {
                                Array.from({length:4}).map((x,i)=>
                                    <View style={s("w-100 flex-row j-content-b al-items-c gap-3")} key={`order-item-${i}`}>
                                        <Text style={s("fs-3 col-gray w-50")}>- الإسم و الحجم  x1</Text>
                                        <Text style={s("fs-3 col-gray")}>19.99 EGP</Text>
                                    </View>
                                )
                            }
                            </View>
                        </View>

                        <View style={s("w-100 al-items-s")}>
                            <Text style={s("fs-2")}>طريقة التوصيل</Text>
                            <View style={s("w-100 al-items-c mt-2")}>
                            {
                                deliveryOptions.map((option,i)=>
                                <View style={s("w-100 flex-row j-content-b")} key={`delivery-option-${i}`}>
                                    <Text style={s("fs-3")}>{option.label}</Text>
                                    <CheckBox
                                    checked={deliveryIndex === i}
                                    onPress={() => setDeliveryIndex(i)}
                                    />
                                </View>
                                )
                            }
                            </View>
                        </View>


                        <View style={s("w-100 al-items-s")}>
                            <Text style={s("fs-2")}>طريقة الدفع</Text>
                            <View style={s("w-100 al-items-c mt-2")}>
                            {
                                paymentOptions.map((option,i)=>
                                <View style={s("w-100 flex-row j-content-b")} key={`delivery-option-${i}`}>
                                    <Text style={s("fs-3")}>{option.label}</Text>
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
                            <Text style={s("fs-2")}>المجموع: 29.99 EGP</Text>
                            <Text style={s("fs-2")}>التوصيل: 29.99 EGP</Text>
                            <Text style={s("fs-2")}>الإجمالي: 29.99 EGP</Text>

                        </View>

                        <Button style={s("mt-3")}>
                            <Text style={s("fs-2 col-white")}>تأكيد الدفع</Text>
                        </Button>
                    </View>
                </ScrollView>



            </View>
        </View>
    )
}