import { Text, View, Image, Pressable } from 'react-native';
import { s } from '../styles';


export default function MenuItem({openTab}) {

    return (
        <Pressable style={s("menu-item-col p-1")}
        onPress={openTab}
        >
            <View style={s("menu-item-container shadow bg-white p-2 al-items-c")} pointerEvents='none'>
                <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                <Text style={s("mt-1 text-center lh-normal fs-4")}>Pizza Name Label</Text>

                <Text style={s("col-accent")}>يبدأ من</Text>
                <Text style={s("col-accent fs-3")}>29.99 EGP</Text>

            </View>
        </Pressable>
    )
}
