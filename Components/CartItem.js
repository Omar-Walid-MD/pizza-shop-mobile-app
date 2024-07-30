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

    const sizeColors = {
        "s": "#589941",
        "m": "#C0851A",
        "l": "#C03E3E"
    }


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
                weight='sb'
                >{item.name}</Text>

                <View
                style={{...styles['w-100'],...styles['al-items-c'],...styles['rounded'],...styles['shadow'],...styles['my-1'],padding:2.5,backgroundColor:sizeColors[itemInfo.size]}}
                >
                    <Text
                    weight='sb'
                    style={{...styles['col-white'],...styles['fs-4']}}
                    >{sizeStrings[itemInfo.size]}</Text>
                </View>

                <View
                style={{...styles['flex-row'],...styles['gap-1'],...styles['al-items-e']}}
                >
                    <Text
                    weight='b'
                    style={{fontSize:12,marginBottom:5,...styles['col-accent']}}
                    >EGP</Text>
                    <Text
                    style={{...styles['col-accent'],...styles['fs-3']}}
                    weight='b'
                    >{Object.values(item.prices)[0]}</Text>
                    
                </View>
            </View>
            
            {
                itemInfo.count > 1 &&
                <View
                style={{...styles['pos-abs'],...styles['bg-danger'],...styles['rounded'],...styles['shadow'],...styles['al-items-c'],...styles['px-1']}}>
                    <Text
                    weight='sb'
                    style={{...styles['col-white'],fontSize:20}}
                    >{itemInfo.count}</Text>
                </View>
            }
        </Pressable>
    )
}
