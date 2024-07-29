import {View, Image, Pressable } from 'react-native';
import { s } from '../styles';
import Text from './Text';
import { useDispatch } from 'react-redux';
import { setCartItemToShow } from '../Store/Cart/cartSlice';
import { items } from '../TempData/menu';


export default function CartItem({itemInfo}) {

    const item = items[itemInfo.id];
    console.log(itemInfo);
    const dispatch = useDispatch();

    function showCartItem()
    {
        dispatch(setCartItemToShow({...item,...itemInfo}));
    }


    return (
        <Pressable style={s("menu-item-col p-1")}
        onPress={showCartItem}
        >
            <View style={s("menu-item-container shadow bg-white p-2 al-items-c")} pointerEvents='none'>
                <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                <Text style={s("mt-1 text-center lh-normal fs-4")}>{item.name}</Text>
                <Text>صغير الحجم</Text>
                <Text style={s("col-accent fs-3")}>{Object.values(item.prices)[0]} EGP</Text>
            </View>
            
            {
                itemInfo.count > 1 &&
                <View style={s("pos-abs bg-danger rounded shadow al-items-c",{width:25,height:25})}>
                    <Text style={s("col-white")}>{itemInfo.count}</Text>
                </View>
            }
        </Pressable>
    )
}
