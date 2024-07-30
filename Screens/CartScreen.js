import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView, FlatList } from 'react-native';
import styles from "../styles";
import { useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';
import CartItem from '../Components/CartItem';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import ScreenContent from '../Components/Layout/ScreenContent';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItemToShow } from '../Store/Cart/cartSlice';


export default function CartScreen({navigation}) {

    const cart = useSelector(store => store.cart.cart);
    console.log("cart on screen:",cart)
    const dispatch = useDispatch();

    const [screenType,setScreenType] = useState("cart");

    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {
                screenType === "cart" ?
                <>
                    {/* Screen Content */}
                    <ScreenContent header={<Text style={{...styles['fs-2']}}>السلة</Text>}>

                        <FlatList
                            numColumns={2}
                            scrollEnabled={false}
                            data={cart}
                            renderItem={({item}) =>
                                <CartItem itemInfo={item} key={`menu-item-${item.id}`} />
                            }
                        />

                        <Text style={{...styles['w-100'], ...styles['text-center'], ...styles['fs-2']}}>إجمالي الطلب: 599.99 EGP</Text>
                        <Button style={{...styles['w-100']}}
                            onPress={() => navigation.navigate("Checkout")}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>دفع الطلب</Text>
                        </Button>

                    </ScreenContent>
                    
                    {/* Modals */}
                    <CartItemModal />
                </>
                : screenType === "track" &&
                <>
                    {/* Screen Content */}
                    <ScreenContent header={<Text style={{...styles['fs-2']}}>السلة</Text>}>

                        <View style={{...styles['h-100'], ...styles['w-100'], ...styles['al-items-c'], ...styles['j-content-c']}}>
                            <Text style={{...styles['col-accent'], fontSize: 40}}>حالة الطلب هنا</Text>

                            <View style={{...styles['w-100'], ...styles['al-items-s']}}>
                                <Text style={{...styles['fs-3']}}>الوقت المنقضي: 10د 5ث</Text>
                                <Text style={{...styles['fs-3'], ...styles['col-accent']}}>الوقت المنقضي: 10د 5ث</Text>

                                <View style={{...styles['w-100'], ...styles['bg-black'], ...styles['rounded'], ...styles['border-2'], ...styles['border-accent'], ...styles['my-3'], height: 250}}></View>

                                <Text style={{...styles['fs-4']}}>إذا واجهت مشكلة, اتصل بنا على الرقم التالي:</Text>
                                <Text style={{...styles['fs-4'], ...styles['col-accent']}}>+123 456 7890</Text>
                            </View>
                        </View>
                    </ScreenContent>
                </>
            }
        </View>

    )
}


function CartItemModal({})
{
    const dispatch = useDispatch();
    const itemToShow = useSelector(store => store.cart.cartItemToShow);

    return (
        <Modal visible={itemToShow !== null} animationType='slide'>
            <View style={{...styles['w-100'], ...styles['h-100'], ...styles['bg-white'], ...styles['shadow'], ...styles['al-items-c']}}>
                {
                    itemToShow &&
                    <ScrollView style={{...styles['w-100']}}>
                        <View style={{...styles['w-100'], ...styles['p-4'], ...styles['al-items-c'], ...styles['pt-4'], ...styles['gap-3']}}>
                            <Image source={require("../assets/img/pizza.png")} style={{height: 250, position: "relative"}} resizeMode='contain' />
                            
                            <View style={{...styles['w-100'], ...styles['al-items-c']}}>
                                <Text style={{...styles['text-center'], ...styles['fs-1']}}>{itemToShow.name}</Text>
                                <Text style={{...styles['fs-2']}}>{itemToShow.chosenSize}</Text>
                            </View>

                            <View style={{...styles['w-100'], ...styles['mt-2'], ...styles['gap-1'], ...styles['al-items-s']}}>
                                {
                                    itemToShow.desc.map((desc, i) =>
                                        <Text style={{...styles['fs-3'], ...styles['col-gray']}} key={`pizza-desc-${i}`}>-  {desc}</Text>
                                    )
                                }
                            </View>

                            <View style={{...styles['w-100'], ...styles['mt-2'], ...styles['gap-1'], ...styles['al-items-c']}}>
                                <Text style={{...styles['fs-3']}}>سعر الواحدة:  (x{itemToShow.count}) {itemToShow.prices[itemToShow.size]} EGP</Text>
                                <Text style={{...styles['fs-3']}}>إجمالي السعر : {parseFloat(itemToShow.prices[itemToShow.size]) * itemToShow.count} EGP</Text>
                            </View>

                            <Button style={{...styles['w-100']}}>
                                <Text style={{...styles['col-white'], ...styles['fs-3']}}>إزالة من السلة</Text>
                            </Button>
                        </View>
                    </ScrollView>
                }

                <View style={{...styles['pos-abs'], ...styles['w-100'], ...styles['al-items-s']}}>
                    <Button style={{...styles['m-2']}}
                        onPress={() => dispatch(setCartItemToShow(null))}
                    >
                        <MaterialCommunityIcons name="close" color="white" size={25} />
                    </Button>
                </View>
            </View>
        </Modal>

    )
}