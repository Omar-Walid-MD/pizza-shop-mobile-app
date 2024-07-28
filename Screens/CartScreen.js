import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView, FlatList } from 'react-native';
import styles, { s } from '../styles';
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
    const dispatch = useDispatch();

    const [screenType,setScreenType] = useState("cart");

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {
                screenType==="cart" ?
                <>
                    {/* Screen Content */}
                    <ScreenContent
                    header={<Text style={s("fs-2")}>السلة</Text>}>

                        <FlatList
                        numColumns={2}
                        scrollEnabled={false}
                        data={cart}
                        renderItem={
                            ({item,index}) =>
                            <CartItem item={item} key={`menu-item-${index}`}/>
                        }
                        />

                        
                        <Text style={s("w-100 text-center fs-2")}>إجمالي الطلب: 599.99 EGP</Text>
                        <Button style={s("w-100")}
                        onPress={()=>navigation.navigate("Checkout")}>
                            <Text style={s("col-white fs-3")}>دفع الطلب</Text>
                        </Button>

                    </ScreenContent>
                        

                    {/* Modals */}
                    <CartItemModal />
                </>
                : screenType==="track" &&
                <>
                    {/* Screen Content */}
                    <ScreenContent
                    header={<Text style={s("fs-2")}>السلة</Text>}>

                        <View style={s("h-100 w-100 al-items-c j-content-c")}>
                            <Text style={s("col-accent",{fontSize:40})}>حالة الطلب هنا</Text>

                            <View style={s("w-100 al-items-s")}>
                                <Text style={s("fs-3")}>الوقت المنقضي: 10د 5ث</Text>
                                <Text style={s("fs-3 col-accent")}>الوقت المنقضي: 10د 5ث</Text>

                                <View style={s("w-100 bg-black rounded border-2 border-accent my-3",{height:250})}></View>

                                <Text style={s("fs-4")}>إذا واجهت مشكلة, اتصل بنا على الرقم التالي:</Text>
                                <Text style={s("fs-4 col-accent")}>+123 456 7890</Text>
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
        <Modal visible={itemToShow!==null} animationType='slide'>
            <View style={s("w-100 h-100 bg-white shadow al-items-c")}>
            {
                itemToShow &&
                <ScrollView style={s("w-100")}>
                    <View style={s("w-100 p-4 al-items-c pt-4 gap-3")}>
                        <Image source={require("../assets/img/pizza.png")} style={{height:250,position:"relative"}} resizeMode='contain' />
                        
                        <View style={s("w-100 al-items-c")}>
                            <Text style={s("text-center fs-1")}>{itemToShow.name}</Text>
                            <Text style={s("fs-2")}>{itemToShow.chosenSize}</Text>
                        </View>


                        <View style={s("w-100 mt-2 gap-1 al-items-s")}>
                        {
                            itemToShow.desc.map((desc,i)=>
                            <Text style={s("fs-3 col-gray")} key={`pizza-desc-${i}`}>-  {desc}</Text>
                            )
                        }
                        </View>


                        <View style={s("w-100 mt-2 gap-1 al-items-c")}>
                            <Text style={s("fs-3")}>سعر الواحدة:  (x1) 29.99 EGP</Text>
                            <Text style={s("fs-3")}>إجمالي السعر : 29.99 EGP</Text>
                        </View>

                        <Button style={s("w-100")}>
                            <Text style={s("col-white fs-3")}>إزالة من السلة</Text>
                        </Button>


                    </View>
                </ScrollView>
            }


                <View style={s("pos-abs w-100 al-items-s")}>
                    <Button style={s("m-2")}
                    // onPress={()=>setItemShowTab(false)}
                    >
                        <MaterialCommunityIcons name="close" color="white" size={25} />
                    </Button>
                </View>

            </View>
        </Modal>
    )
}