import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView, FlatList } from 'react-native';
import styles from "../styles";
import { useEffect, useMemo, useState } from 'react';
import Button from '../Components/Button';
import Background from '../Components/Background';
import Text from '../Components/Text';
import CartItem from '../Components/CartItem';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import ScreenContent from '../Components/Layout/ScreenContent';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setCartItemToShow } from '../Store/Cart/cartSlice';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const sizeStrings = {
    "s": "صغير",
    "m": "وسط",
    "l": "كبير"
};

const sizeColors = {
    "s": "#589941",
    "m": "#C0851A",
    "l": "#C03E3E"
};

const deliveryStatusStrings = {
    "baking": "جاري الخبز",
    "delivering": "جاري التوصيل"
}

export default function CartScreen({navigation}) {

    const user = useSelector(store => store.auth.user);
    const items = useSelector(store => store.items.items);
    const cart = useSelector(store => store.cart.cart);

    const orders = useSelector(store => store.orders.orders);
    const currentOrder = orders && orders[useSelector(store => store.orders.currentOrderID)];

    const ordersLoading = useSelector(store => store.orders.loading);

    const [screenType,setScreenType] = useState("cart");

    const totalCost = useMemo(()=>{
        return cart.reduce((sum,item) => sum + items[item.id].prices[item.size] * item.count,0)
    },[cart]);


    useEffect(()=>{
        if(currentOrder)
        {
            setScreenType("track");
        }
        else
        {
            setScreenType("cart");
        }
    },[currentOrder]);


    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {
                ordersLoading ?
                <>
                    <Text>جاري التحميل</Text>
                </>
                :
                screenType === "cart" ?
                <>
                    {/* Screen Content */}
                    <ScreenContent header={<Text font="Harmattan" style={{fontSize:40}}>السلة</Text>}>
                    {
                        cart.length ?
                        <>
                            <FlatList
                                numColumns={2}
                                scrollEnabled={false}
                                data={cart}
                                renderItem={({item}) =>
                                    <CartItem itemInfo={item} key={`menu-item-${item.id}`} />
                                }
                            />

                            <View
                            style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['px-2']}}
                            >
                                <Text style={{...styles['text-center'], ...styles['fs-3']}}>إجمالي الطلب:</Text>
                                <Text style={{...styles['text-center'], ...styles['fs-2']}}>{totalCost} ج.م.</Text>

                            </View>
                            <Button style={{...styles['w-100']}}
                                onPress={() => navigation.navigate("Checkout")}>
                                <Text style={{...styles['col-white'], ...styles['fs-3']}}>دفع الطلب</Text>
                            </Button>
                        </>
                        :
                        <>
                            <View
                            //style[h-100 al-items-c j-content-c gap-2]
                            style={{...styles['h-100'],...styles['al-items-c'],...styles['j-content-c'],...styles['gap-2']}}
                            >
                                <Text
                                //style[fs-1]
                                style={{...styles['fs-1']}}
                                >السلة فارغة</Text>

                                <Button onPress={()=>navigation.navigate("Menu")}>
                                    <Text
                                    //style[col-white fs-3]
                                    style={{...styles['col-white'],...styles['fs-3']}}
                                    >الى القائمة</Text>
                                </Button>
                            </View>
                        </>
                    }


                    </ScreenContent>
                    
                    {/* Modals */}
                    <CartItemModal />
                </>
                : screenType === "track" &&
                <>
                    {/* Screen Content */}
                    <ScreenContent header={<Text style={{...styles['fs-2']}}>السلة</Text>}>

                        <View style={{...styles['h-100'], ...styles['w-100'], ...styles['al-items-c'], ...styles['j-content-c']}}>
                            <Text font='Harmattan' style={{...styles['col-accent'],...styles['mb-3'], fontSize: 55}}>{deliveryStatusStrings[currentOrder.deliveryStatus]}</Text>

                            <View style={{...styles['w-100'], ...styles['al-items-s']}}>
                                <DeliveryTimer order={currentOrder}/>
                                {/* <Text style={{...styles['fs-3'], ...styles['col-gray']}}>الوقت المتبقي: 10د 5ث</Text> */}

                                <View
                                //style[w-100 p-2 al-items-c j-content-c flex:1]
                                style={{...styles['w-100'],...styles['my-2'],...styles['al-items-c'],...styles['j-content-c'],flex:1}}
                                >
                                    <View
                                        style={{...styles['w-100'],...styles['j-content-c'],...styles['al-items-c'],...styles['rounded'],...styles['shadow'],backgroundColor:"lightgray",height:250,overflow:"hidden"}}
                                        >
                                        <MapView
                                        //style[w-100 flex:1]
                                        style={{...styles['w-100'],flex:1}}
                                        scrollEnabled={false}
                                        region={{...user?.location,latitudeDelta:0.01,longitudeDelta:0.01}}
                                        >
                                            {/* <MapViewDirections
                                            origin={{latitude:31.194849,longitude:29.8972593}}
                                            destination={user.location}
                                            apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
                                            strokeWidth={10}
                                            strokeColor='black'
                                            /> */}
                                        </MapView>
                                    </View>
                                </View>

                                <Text weight='sb' style={{...styles['fs-4']}}>إذا واجهت مشكلة, اتصل بنا على الرقم التالي:</Text>
                                <Text weight='b' style={{...styles['fs-4'], ...styles['col-accent']}}>+123 456 7890</Text>
                            </View>
                        </View>
                    </ScreenContent>
                </>
            }
        </View>

    )
}

function DeliveryTimer({order})
{
    const [currentDate,setCurrentDate] = useState(Date.now());

    function getTimeElapsedString()
    {
        if(!order) return "";

        const timeElapsed = currentDate - order.date;
        let h = Math.abs(parseInt(timeElapsed /(1000 * 60 * 60) % 60));
        let m = Math.abs(parseInt(timeElapsed / (1000 * 60) % 60));
        let s = Math.abs(parseInt(timeElapsed / 1000 % 60));

        return `${h ? h+"س" : ""} ${m ? m+"د" : ""} ${s ? s+"ث" : ""}`;
    }


    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentDate(Date.now());
        },1000);
    
        return ()=> clearInterval(timer);  
    },[]);

    return (
        <Text style={{...styles['fs-3']}}>الوقت المنقضي: {getTimeElapsedString()}</Text>
    )
}


function CartItemModal({})
{
    const dispatch = useDispatch();
    const items = useSelector(store => store.items.items);
    const itemToShow = useSelector(store => store.cart.cartItemToShow);

    function handleRemoveFromCart()
    {
        dispatch(setCartItemToShow(null));
        dispatch(removeFromCart(itemToShow));
    }

    return (
        <Modal visible={itemToShow !== null} animationType='slide'>
            <View style={{...styles['w-100'], ...styles['h-100'], ...styles['bg-white'], ...styles['shadow'], ...styles['al-items-c']}}>
                {
                    itemToShow &&
                    <ScrollView style={{...styles['w-100']}}>
                        <View style={{...styles['w-100'], ...styles['p-4'], ...styles['al-items-c'], ...styles['pt-4'], ...styles['gap-3']}}>
                            <Image source={{uri:itemToShow.image+".png"}} style={{position:"relative",height:250,aspectRatio:1}} resizeMode='contain'/>
                            
                            <View style={{...styles['w-100'], ...styles['al-items-c']}}>
                                <Text style={{...styles['text-center'], ...styles['fs-1']}}>{itemToShow.name}</Text>

                                <View
                                style={{...styles['w-100'],...styles['al-items-c'],...styles['rounded'],...styles['shadow'],...styles['my-1'],padding:2.5,backgroundColor:sizeColors[itemToShow.size]}}
                                >
                                    <Text
                                    weight='sb'
                                    style={{...styles['col-white'],...styles['fs-3']}}
                                    >{sizeStrings[itemToShow.size]}</Text>
                                </View>
                            </View>

                            <View style={{...styles['w-100'],...styles['gap-1'],...styles['al-items-s']}}>
                                {
                                    itemToShow.desc.map((desc, i) =>
                                        <Text style={{...styles['fs-3'], ...styles['col-gray']}} key={`pizza-desc-${i}`}>-  {desc}</Text>
                                    )
                                }
                            </View>

                            <View style={{...styles['w-100'], ...styles['mt-2'], ...styles['gap-1'], ...styles['al-items-c']}}>
                                <View
                                style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['gap-2'],...styles['al-items-c']}}
                                >
                                    <Text
                                    style={{...styles['fs-4']}}
                                    >سعر الواحدة: </Text>
                                    <Text
                                    weight='sb'
                                    style={{...styles['fs-3'],...styles['col-gray']}}
                                    >{itemToShow.prices[itemToShow.size]} ج.م. (x{itemToShow.count}) </Text>
                                </View>

                                <View
                                style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['gap-2'],...styles['al-items-c']}}
                                >
                                    <Text
                                    style={{...styles['fs-4']}}
                                    >إجمالي السعر: </Text>
                                    <Text
                                    weight='sb'
                                    style={{...styles['fs-2']}}
                                    >{parseFloat(itemToShow.prices[itemToShow.size]) * itemToShow.count} ج.م.</Text>
                                </View>
                            </View>

                            <Button style={{...styles['w-100']}} onPress={handleRemoveFromCart}>
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