import {View, Image, Pressable } from 'react-native';
import styles from "../styles";
import Text from './Text';
import { useDispatch } from 'react-redux';
import { setCartItemToShow } from '../Store/Cart/cartSlice';
import { items } from '../TempData/menu';


export default function CartItem({itemInfo}) {

    const sizeStrings = {
        "s": "صغير",
        "m": "وسط",
        "l": "كبير"
    };


    const item = items[itemInfo.id];

    const dispatch = useDispatch();

    function showCartItem()
    {
        dispatch(setCartItemToShow({...item,...itemInfo}));
    }


    return (
        <Pressable
        //style[menu-item-col p-1]
        style={{...styles['menu-item-col'],...styles['p-1']}}
        onPress={showCartItem}
        >
            <View
            //style[menu-item-container shadow bg-white p-2 al-items-c]
            style={{...styles['menu-item-container'],...styles['shadow'],...styles['bg-white'],...styles['p-2'],...styles['al-items-c']}}
            pointerEvents='none'>
                <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                <Text style={{...styles['mt-1'],...styles['text-center'],...styles['lh-normal'],...styles['fs-4']}}
                >{item.name}</Text>
                <Text>{sizeStrings[itemInfo.size]}</Text>
                <Text
                style={{...styles['col-accent'],...styles['fs-3']}}
                >{Object.values(item.prices)[0]} EGP</Text>
            </View>
            
            {
                itemInfo.count > 1 &&
                <View
                style={{...styles['pos-abs'],...styles['bg-danger'],...styles['rounded'],...styles['shadow'],...styles['al-items-c'],width:25,height:25}}>
                    <Text
                    style={{...styles['col-white']}}
                    >{itemInfo.count}</Text>
                </View>
            }
        </Pressable>
    )
}
