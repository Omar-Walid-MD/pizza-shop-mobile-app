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
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../Store/Orders/ordersSlice';
import { emptyCart } from '../Store/Cart/cartSlice';
import { useTranslation } from 'react-i18next';


export default function CheckoutScreen({navigation}) {

    const { t: translate} = useTranslation();
    const items = useSelector(store => store.items.items);
    const cart = useSelector(store => store.cart.cart);
    const user = useSelector(store => store.auth.user);

    const dispatch = useDispatch();

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
                        style={{...styles['w-100'], ...styles['flex-row'], ...styles['al-items-c'], ...styles['j-content-b'], ...styles['px-2']}}
                    >
                        <Text font="Harmattan" style={{fontSize: 35}}>
                            {translate("checkout.title")}
                        </Text>

                        <Button variant="green" onPress={() => navigation.navigate("Main")}>
                            <Text style={{...styles['col-white']}}>
                                {translate("checkout.back_button")}
                            </Text>
                        </Button>
                    </View>
                }
            >
                <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['gap-3']}}>
                    <View style={{...styles['w-100'], ...styles['mb-3']}}>
                        <Accordion content={<Text style={{...styles['fs-3']}}>{translate("checkout.order_details")}</Text>}>
                            <FlatList
                                style={{...styles['mt-3']}}
                                data={cart}
                                renderItem={({item, index}) => (
                                    <View
                                        style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['al-items-c'], ...styles['gap-3']}}
                                        key={`order-item-${index}`}
                                    >
                                        <Text style={{...styles['fs-3'], ...styles['col-gray'], width: "65%"}}>
                                            {`- ${items[item.id].name} x${item.count}`}
                                        </Text>
                                        <Text style={{...styles['fs-3'], ...styles['col-gray']}}>
                                            {items[item.id].prices[item.size] * item.count} {translate("checkout.currency")}
                                        </Text>
                                    </View>
                                )}
                                scrollEnabled={false}
                            />
                        </Accordion>
                    </View>

                    <View style={{...styles['w-100'], ...styles['al-items-s']}}>
                        <Text style={{...styles['fs-3']}}>
                            {translate("checkout.delivery_method")}
                        </Text>
                        <View
                            style={{...styles['w-100'], ...styles['al-items-c'], ...styles['mt-2'], ...styles['gap-2']}}
                        >
                            {deliveryOptions.map((option, i) => (
                                <Pressable
                                    style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                        backgroundColor: deliveryIndex === i ? colors[i] : "#FEF7EA"
                                    }}
                                    key={`delivery-option-${i}`}
                                    onPress={() => setDeliveryIndex(i)}
                                >
                                    <View style={{...styles['flex-row'], ...styles['gap-2']}}>
                                        <Text style={{...styles['fs-3'], ...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">
                                            {option.label}
                                        </Text>
                                        <Text style={{...styles['fs-3'], ...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">
                                            -
                                        </Text>

                                        <View style={{...styles['flex-row'], ...styles['gap-1'], ...styles['al-items-e']}}>
                                            <Text style={{...styles['fs-3'], ...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">
                                                {option.price}
                                            </Text>
                                            <Text style={{fontSize: 12, marginBottom: 5, ...styles[`col-${deliveryIndex === i ? "white" : "black"}`]}} weight="sb">
                                                {translate("checkout.currency")}
                                            </Text>
                                        </View>
                                    </View>

                                    <CheckBox
                                        checked={deliveryIndex === i}
                                        pointerEvents={"none"}
                                        checkedColor={"white"}
                                        uncheckedColor={colors[i]}
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <View style={{...styles['w-100'], ...styles['al-items-s']}}>
                        <Text style={{...styles['fs-3']}}>
                            {translate("checkout.payment_method")}
                        </Text>
                        <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['mt-2'], ...styles['gap-2']}}>
                            {paymentOptions.map((option, i) => (
                                <Pressable
                                    style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                        backgroundColor: paymentIndex === i ? colors[i] : "#FEF7EA"
                                    }}
                                    key={`payment-option-${i}`}
                                    onPress={() => setPaymentIndex(i)}
                                >
                                    <Text style={{...styles['fs-3'], ...styles[`col-${paymentIndex === i ? "white" : "black"}`]}} weight="sb">
                                        {option.label}
                                    </Text>

                                    <CheckBox
                                        checked={paymentIndex === i}
                                        pointerEvents={"none"}
                                        checkedColor={"white"}
                                        uncheckedColor={colors[i]}
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <View style={{...styles['w-100'], ...styles['gap-2'], ...styles['mt-4']}}>
                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['px-2']}}>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {translate("checkout.order_total")}:
                            </Text>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {subtotal} {translate("checkout.currency")}
                            </Text>
                        </View>

                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['px-2']}}>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {translate("checkout.shipping_fee")}:
                            </Text>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {deliveryOptions[deliveryIndex].price} {translate("checkout.currency")}
                            </Text>
                        </View>

                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['px-2']}}>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {translate("checkout.total_amount")}:
                            </Text>
                            <Text style={{...styles['text-center'], ...styles['fs-2']}}>
                                {(subtotal + deliveryOptions[deliveryIndex].price).toFixed(2)} {translate("checkout.currency")}
                            </Text>
                        </View>
                    </View>

                    <Button style={{...styles['w-100'], ...styles['mt-3']}} onPress={() => {
                        navigation.navigate("OrderSuccess");
                        dispatch(addOrder({
                            items: cart.map(cartItem => ({...cartItem, unitPrice: items[cartItem.id].prices[cartItem.size]})),
                            orderStatus: "pending",
                            deliveryStatus: "baking",
                            date: Date.now(),
                            deliveryType: deliveryOptions[deliveryIndex].type,
                            paymentType: paymentOptions[paymentIndex].type,
                            subtotal,
                            deliveryFees: deliveryOptions[deliveryIndex].price,
                            total: subtotal + deliveryOptions[deliveryIndex].price,
                            deliveryLocation: user.location
                        }));
                        dispatch(emptyCart());
                    }}>
                        <Text style={{...styles['fs-3'], ...styles['col-white']}}>
                            {translate("checkout.confirm_payment")}
                        </Text>
                    </Button>
                </View>
            </ScreenContent>
        </View>

    )
}