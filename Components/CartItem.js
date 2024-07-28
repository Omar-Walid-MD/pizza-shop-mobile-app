import {View, Image, Pressable } from 'react-native';
import { s } from '../styles';
import Text from './Text';
import { useDispatch } from 'react-redux';
import { setCartItemToShow } from '../Store/Cart/cartSlice';


export default function CartItem({item}) {

    const dispatch = useDispatch();

    return (
        <Pressable style={s("menu-item-col p-1")}
        onPress={()=>dispatch(setCartItemToShow(true))}
        >
            <View style={s("menu-item-container shadow bg-white p-2 al-items-c")} pointerEvents='none'>
                <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                <Text style={s("mt-1 text-center lh-normal fs-4")}>{item.name}</Text>
                <Text>صغير الحجم</Text>
                <Text style={s("col-accent fs-3")}>{Object.values(item.prices)[0]} EGP</Text>
            </View>

            <View style={s("pos-abs bg-danger rounded shadow al-items-c",{width:25,height:25})}>
                <Text style={s("col-white")}>9</Text>
            </View>
        </Pressable>
    )
}
