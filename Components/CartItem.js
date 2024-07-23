import {View, Image, Pressable } from 'react-native';
import { s } from '../styles';
import Text from './Text';


export default function CartItem({openTab}) {

    return (
        <Pressable style={s("menu-item-col p-1")}
        onPress={openTab}
        >
            <View style={s("menu-item-container shadow bg-white p-2 al-items-c")} pointerEvents='none'>
                <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                <Text style={s("mt-1 text-center lh-normal fs-4")}>Pizza Name Label</Text>
                <Text>صغير الحجم</Text>
                <Text style={s("col-accent fs-3")}>29.99 EGP</Text>
            </View>

            <View style={s("pos-abs bg-danger rounded shadow al-items-c",{width:25,height:25})}>
                <Text style={s("col-white")}>9</Text>
            </View>
        </Pressable>
    )
}
