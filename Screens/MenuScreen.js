import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView, FlatList } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../Components/Input';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import { ListItem } from '@rneui/themed';
import MenuItem from '../Components/MenuItem';
import Accordion from '../Components/Accordion';
import { useEffect, useMemo, useState } from 'react';
import Button from '../Components/Button';
import CheckBox from "../Components/CheckBox"
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItemOptions, setMenuItemToShow } from '../Store/Items/itemsSlice';
import { addToCart, setItemCount } from '../Store/Cart/cartSlice';
import { items } from '../TempData/menu';


const sizeStrings = {
    "s": "صغير",
    "m": "وسط",
    "l": "كبير"
};

const sizeColors = {
    "s": "#589941",
    "m": "#C0851A",
    "l": "#C03E3E"
}

export default function MenuScreen({navigation}) {

    const dispatch = useDispatch();

    const itemsCategorized = useSelector(store => store.items.itemsCategorized);
    
    return (
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent
                header={
                    <Text font="Harmattan" style={{fontSize:40}}>القائمة</Text>
                }
            >                
                <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['gap-2']}}>
                    <Input placeholder="ابحث هنا"/>
                    <Button>
                        <MaterialIcons name="search" size={25} color="white" /> 
                    </Button>
                </View>
                {
                    <FlatList
                        scrollEnabled={false}
                        data={Object.keys(itemsCategorized)}
                        renderItem={
                            ({item:category, index:categoryIndex}) =>
                                <Accordion
                                    content={<Text style={{...styles['col-gray'], ...styles['fs-3']}}>{category}</Text>}
                                    key={`cat-${categoryIndex}`}
                                >
                                    <FlatList
                                        numColumns={2}
                                        scrollEnabled={false}
                                        data={itemsCategorized[category]}
                                        renderItem={
                                            ({item:itemId, index}) => 
                                                <MenuItem itemId={itemId} key={`menu-item-${index}`}/>
                                        }
                                    />
                                </Accordion>
                        }
                    />
                }
            </ScreenContent>

            {/* Modals */}
            <MenuItemModal />

            <StatusBar style="auto" />
        </View>

    );
}


function MenuItemModal({})
{
    const dispatch = useDispatch();
    const itemId = useSelector(store => store.items.menuItemToShow);
    const cart = useSelector(store => store.cart.cart);

    const itemToShow = items[itemId];
    const [itemOptions,setItemOptions] = useState({});
    

    function handleAddToCart()
    {
        const itemInCart = cart.find((cartItem) => cartItem.id===itemId && cartItem.size===itemOptions.size);
        if(itemInCart)
        {
            console.log(itemOptions.count+itemInCart.count)
            dispatch(setItemCount({id: itemId,size:itemOptions.size,count:itemOptions.count+itemInCart.count}))
        }
        else
        {
            dispatch(addToCart({id: itemId,...itemOptions}));
        }
    }

    useEffect(()=>{
        if(itemToShow)
        {
            setItemOptions({
                size: Object.keys(itemToShow.prices)[0],
                count: 1
            });
        }
    },[itemToShow]);

    return (
        <Modal visible={itemId !== null} animationType='slide'>
            <View style={{...styles['w-100'], ...styles['h-100'], ...styles['bg-white'], ...styles['shadow'], ...styles['al-items-c']}}>
                {
                    itemToShow &&
                    <ScrollView style={{...styles['w-100']}}>
                        <View style={{...styles['w-100'], ...styles['p-4'], ...styles['al-items-c'], ...styles['pt-4']}}>
                            <Image source={require("../assets/img/pizza.png")} style={{height: 250, position: "relative"}} resizeMode='contain' />
                            <Text style={{...styles['mt-1'], ...styles['text-center'], ...styles['fs-1']}}>{itemToShow.name}</Text>

                            <View style={{...styles['w-100'], ...styles['mt-2'], ...styles['gap-1'], ...styles['al-items-s']}}>
                                {
                                    itemToShow.desc.map((desc, i) =>
                                        <Text style={{...styles['fs-3'], ...styles['col-gray']}} key={`pizza-desc-${i}`}>-  {desc}</Text>
                                    )
                                }
                            </View>

                            <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['pt-4']}}>
                                <Text style={{...styles['fs-3']}}>اختر الحجم</Text>

                                <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['pt-2'], ...styles['gap-2']}}>
                                    {
                                        Object.keys(itemToShow.prices).map((size, i) =>
                                            <Pressable
                                            style={{...styles['w-100'], ...styles['flex-row'],...styles['j-content-b'],...styles['rounded'],...styles['shadow'],...styles['p-1'],...styles['px-2'],
                                            backgroundColor:itemOptions?.size === size ? sizeColors[size] : "#FEF7EA"}}
                                            key={`pizza-size-${i}`}
                                            onPress={() => setItemOptions({...itemOptions, size})}>

                                                <Text style={{...styles['fs-3'],...styles[`col-${itemOptions?.size === size ? "white" : "black"}`]}} weight="sb">{sizeStrings[size]} - {itemToShow.prices[size]}</Text>

                                                <CheckBox
                                                    checked={itemOptions?.size === size}
                                                    pointerEvents={"none"}
                                                    checkedColor={"white"}
                                                    uncheckedColor={sizeColors[size]}

                                                />
                                            </Pressable>
                                        )
                                    }
                                </View>
                            </View>

                            <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['pt-4'], ...styles['gap-2']}}>
                                <Text style={{...styles['fs-3']}}>اختر العدد</Text>

                                <View style={{...styles['w-75'], ...styles['flex-row'], ...styles['j-content-b'], ...styles['border-3'], ...styles['border-danger'], ...styles['rounded'], ...styles['shadow'], ...styles['bg-white'], ...styles['overflow-hidden']}}>
                                    <Pressable onPress={() => setItemOptions(i => ({...i, count: i.count - 1 ? i.count - 1 : i.count}))}>
                                        <Text style={{...styles['fs-3'], ...styles['bg-accent'], ...styles['px-2'], ...styles['col-white']}}>-</Text>
                                    </Pressable>
                                    <Text style={{...styles['fs-3']}}>{itemOptions?.count}</Text>
                                    <Pressable onPress={() => setItemOptions(i => ({...i, count: i.count < 5 ? i.count + 1 : i.count}))}>
                                        <Text style={{...styles['fs-3'], ...styles['bg-accent'], ...styles['px-2'], ...styles['col-white']}}>+</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <Button style={{...styles['mt-4'], ...styles['w-100']}} onPress={handleAddToCart}>
                                <Text style={{...styles['col-white'], ...styles['fs-3']}}>أضف الى السلة</Text>
                            </Button>
                        </View>
                    </ScrollView>
                }

                <View style={{...styles['pos-abs'], ...styles['w-100'], ...styles['al-items-s']}}>
                    <Button style={{...styles['m-2']}}
                        onPress={() => dispatch(setMenuItemToShow(null))}
                    >
                        <MaterialCommunityIcons name="close" color="white" size={25} />
                    </Button>
                </View>
            </View>
        </Modal>

    )
}
 