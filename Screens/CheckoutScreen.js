import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView, FlatList } from 'react-native';
import styles from "../styles";
import { useMemo, useState } from 'react';
import Button from '../Components/Button';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import Text from '../Components/Text';
import CheckBox from '../Components/CheckBox';
import ScreenContent from '../Components/Layout/ScreenContent';
import Accordion from '../Components/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../Store/Orders/ordersSlice';
import { emptyCart } from '../Store/Cart/cartSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../I18n/i18n';
import Input from '../Components/Input';


export default function CheckoutScreen({navigation}) {

    const dispatch = useDispatch();
    const { t: translate} = useTranslation();

    const items = useSelector(store => store.items.items);
    const cart = useSelector(store => store.cart.cart);
    const user = useSelector(store => store.auth.user);
    const userId = useSelector(store => store.auth.userId);


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

    const [checkoutInfoModalShown,setCheckoutInfoModalShown] = useState(false);
    const [checkoutUserInfo,setCheckoutUserInfo] = useState({
        name: "",
        email: "",
        mobileNo: ""
    });

    const subtotal = useMemo(()=>{
        return cart.reduce((sum,item) => sum + items[item.id].prices[item.size] * item.count,0)
    },[cart]);


    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            {/* <Background /> */}
            
            {/* Screen Content */}
            <ScreenContent
                header={
                    <View
                        style={{...styles['w-100'], ...styles['flex-row'], ...styles['al-items-c'], ...styles['j-content-b'], ...styles['px-2']}}
                    >
                        <Text font="accent" style={{fontSize: 40}}>
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
                                            {`- ${items[item.id].name[i18n.language]} x${item.count}`}
                                        </Text>
                                        <Text style={{...styles['fs-3'], ...styles['col-gray']}}>
                                            {items[item.id].prices[item.size] * item.count} {translate("currency")}
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
                                                {translate("currency")}
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
                                {subtotal} {translate("currency")}
                            </Text>
                        </View>

                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['px-2']}}>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {translate("checkout.shipping_fee")}:
                            </Text>
                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                {deliveryOptions[deliveryIndex].price} {translate("currency")}
                            </Text>
                        </View>

                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['px-2']}}>
                            <Text weight='b' style={{...styles['text-center'], ...styles['fs-3']}}>
                                {translate("checkout.total_amount")}:
                            </Text>
                            <Text weight='b' style={{...styles['text-center'], ...styles['fs-2']}}>
                                {(subtotal + deliveryOptions[deliveryIndex].price).toFixed(2)} {translate("currency")}
                            </Text>
                        </View>
                    </View>
                    
                    {
                        userId!=="anonymous"
                        ?
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
                        :
                        <Button style={{...styles['w-100'], ...styles['mt-3']}} onPress={()=>setCheckoutInfoModalShown(true)}>
                            <Text style={{...styles['fs-3'], ...styles['col-white']}}>
                                {translate("checkout.next")}
                            </Text>
                        </Button>
                    }
                </View>
            </ScreenContent>

            {/* Modals */}
            <CheckoutInfoModal
            checkoutInfoModalShown={checkoutInfoModalShown}
            setCheckoutInfoModalShown={setCheckoutInfoModalShown}
            info={checkoutUserInfo}
            setInfo={setCheckoutUserInfo}
            />
        </View>

    )
}

function CheckoutInfoModal({checkoutInfoModalShown,setCheckoutInfoModalShown,info,setInfo})
{
    const dispatch = useDispatch();
    const { t: translate} = useTranslation();


    function handleInfo(text,property)
    {
        setInfo(e => ({...e,[property]:text.trim()}));
    }


    return (
        <Modal visible={checkoutInfoModalShown} animationType='slide' onRequestClose={() => setCheckoutInfoModalShown(false)}>
            <View style={{...styles['w-100'], ...styles['h-100'], ...styles['bg-white'], ...styles['shadow'], ...styles['al-items-c']}}>

                <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['gap-2'], ...styles['p-4'], ...styles['mb-1']}}>
                    <Text
                    //style[text-center fs-2 mt-4 mb-2]
                    style={{...styles['text-center'],...styles['fs-2'],...styles['mt-4'],...styles['mb-2']}}
                    >فضلا إملأ البيانات لتأكيد الطلب</Text>

                    <View style={{...styles['w-100'], ...styles['gap-3']}}>
                        <Input value={info.name} onChangeText={(t) => handleInfo(t, "name")} placeholder={translate("profile.username_placeholder")} label />
                        <Input value={info.email} onChangeText={(t) => handleInfo(t, "email")} placeholder={translate("profile.email_placeholder")} label />
                        <Input value={info.mobileNo} onChangeText={(t) => handleInfo(t, "mobileNo")} placeholder={translate("profile.mobile_placeholder")} label keyboardType="phone-pad" />

                    </View>

                    <Button style={{...styles['w-100'], ...styles['mt-2']}}
                    onPress={()=>{
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
                    }}
                    >
                        <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                            {translate("checkout.confirm_payment")}
                        </Text>
                    </Button>
                </View>  

                <View style={{...styles['pos-abs'], ...styles['w-100'], ...styles['al-items-e']}}>
                    <Button variant='green' style={{...styles['m-2']}} onPress={() => setCheckoutInfoModalShown(false)}>
                        <Text style={{...styles['col-white']}}>
                            {translate("checkout.back_button")}
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    )
}