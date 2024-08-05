import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView, FlatList } from 'react-native';
import styles from "../styles";
import { useMemo, useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';
import CheckBox from '../Components/CheckBox';
import ScreenContent from '../Components/Layout/ScreenContent';
import Accordion from '../Components/Accordion';
import { useSelector } from 'react-redux';

export default function CheckoutScreen({navigation}) {

    const items = useSelector(store => store.items.items);
    const cart = useSelector(store => store.cart.cart);

    const deliveryOptions = [
        {
            type: "normal",
            label: "عادي",
            price: 9.99
        },
        {
            type: "quick",
            label: "سريع",
            price: 29.99
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
    const [paymentIndex,setPaymentIndex] = useState(0);

    const colors = ["#589941","#C0851A","#C03E3E"];

    const subtotal = useMemo(()=>{
        return cart.reduce((sum,item) => sum + items[item.id].prices[item.size] * item.count,0)
    },[cart]);

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
                    font='Harmattan'
                    style={{fontSize:35}}
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
                //style[w-100 al-items-c gap-3]
                style={{...styles['w-100'],...styles['al-items-c'],...styles['gap-3']}}
                >

                    <View
                    //style[w-100 mb-3]
                    style={{...styles['w-100'],...styles['mb-3']}}
                    >
                        <Accordion content={<Text style={{...styles['fs-3']}}>تفاصيل الطلب</Text>}>
                            <FlatList
                            style={{...styles['mt-3']}}
                            data={cart}
                            renderItem={({item,index})=>
                                <View
                                style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['al-items-c'],...styles['gap-3']}}
                                key={`order-item-${index}`}>
                                    <Text
                                    style={{...styles['fs-3'],...styles['col-gray'],width:"65%"}}
                                    >- {items[item.id].name}  x{item.count}</Text>
                                    <Text 
                                    style={{...styles['fs-3'],...styles['col-gray']}}
                                    >{items[item.id].prices[item.size] * item.count} EGP</Text>
                                </View>
                            }
                            scrollEnabled={false}
                            />
                        </Accordion>
                    </View>

                   
                    <View
                    style={{...styles['w-100'],...styles['al-items-s']}}
                    >
                        <Text
                        style={{...styles['fs-3']}}
                        >طريقة التوصيل</Text>
                        <View
                        style={{...styles['w-100'],...styles['al-items-c'],...styles['mt-2'],...styles['gap-2']}}
                        >
                        {
                            deliveryOptions.map((option,i)=>
                                <Pressable
                                style={{...styles['w-100'], ...styles['flex-row'],...styles['j-content-b'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                backgroundColor: deliveryIndex === i ? colors[i] : "#FEF7EA"}}
                                key={`delivery-option-${i}`}
                                onPress={() => setDeliveryIndex(i)}
                                >

                                    <View 
                                    //style[flex-row gap-2]
                                    style={{...styles['flex-row'],...styles['gap-2']}}
                                    >
                                        <Text style={{...styles['fs-3'],...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">{option.label}</Text>
                                        <Text style={{...styles['fs-3'],...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">-</Text>

                                        <View
                                        style={{...styles['flex-row'],...styles['gap-1'],...styles['al-items-e']}}
                                        >
                                            <Text style={{...styles['fs-3'],...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">{option.price}</Text>
                                            <Text style={{fontSize:12,marginBottom:5,...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">ج.م.</Text>
                                        </View>


                                    </View>

                                    <CheckBox
                                        checked={deliveryIndex === i}
                                        pointerEvents={"none"}
                                        checkedColor={"white"}
                                        uncheckedColor={colors[i]}

                                    />
                                </Pressable>
                            )
                        }
                        </View>
                    </View>


                    <View
                    style={{...styles['w-100'],...styles['al-items-s']}}
                    >
                        <Text style={{...styles['fs-3']}}>طريقة الدفع</Text>
                        <View
                        style={{...styles['w-100'],...styles['al-items-c'],...styles['mt-2'],...styles['gap-2']}}>
                        {
                            paymentOptions.map((option,i)=>
                                <Pressable
                                style={{...styles['w-100'], ...styles['flex-row'],...styles['j-content-b'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                backgroundColor: paymentIndex === i ? colors[i] : "#FEF7EA"}}
                                key={`delivery-option-${i}`}
                                onPress={() => setPaymentIndex(i)}
                                >

                                    <Text style={{...styles['fs-3'],...styles[`col-${paymentIndex === i ? "white" : "black"}`]}} weight="sb">{option.label}</Text>

                                    <CheckBox
                                        checked={paymentIndex === i}
                                        pointerEvents={"none"}
                                        checkedColor={"white"}
                                        uncheckedColor={colors[i]}

                                    />
                                </Pressable>
                            )
                        }
                        </View>
                    </View>

                    
                    <View
                    //style[w-100 gap-2 mt-4]
                    style={{...styles['w-100'],...styles['gap-2'],...styles['mt-4']}}
                    >
                        <View
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['px-2']}}
                        >
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>إجمالي الطلب:</Text>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>{subtotal} EGP</Text>
                        </View>

                        <View
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['px-2']}}
                        >
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>مبلغ الشحن:</Text>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>50 EGP</Text>
                        </View>

                        <View
                        style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['px-2']}}
                        >
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>المبلغ كاملا:</Text>
                            <Text style={{...styles['text-center'], ...styles['fs-2']}}>{(subtotal+50).toFixed(2)} EGP</Text>
                        </View>
                    </View>

                    <Button style={{...styles['w-100'],...styles['mt-3']}}
                    onPress={()=>navigation.navigate("OrderSuccess")}>
                        <Text style={{...styles['fs-3'],...styles['col-white']}}>تأكيد الدفع</Text>
                    </Button>
                </View>


            </ScreenContent>
        </View>
    )
}