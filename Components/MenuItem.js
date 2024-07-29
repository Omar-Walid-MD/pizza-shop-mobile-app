import {View, Image, Pressable } from 'react-native';
import { s } from '../styles';
import Text from './Text';
import { items } from '../TempData/menu';
import { useDispatch } from 'react-redux';
import { setMenuItemOptions, setMenuItemToShow } from '../Store/Items/itemsSlice';


export default function MenuItem({itemId}) {

    const item = items[itemId];

    const dispatch = useDispatch();

    function openMenuItem()
    {
        dispatch(setMenuItemToShow(itemId));
        dispatch(setMenuItemOptions({size:Object.keys(item.prices)[0],count:1}))
    }

    return (
        <Pressable style={s("menu-item-col p-1")}
        onPress={openMenuItem}
        >
        {
            item &&
            <>
                <View style={s("menu-item-container shadow bg-white p-2 al-items-c")} pointerEvents='none'>
                    <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                    <Text style={s("mt-1 text-center lh-normal fs-4")}>{item.name}</Text>

                    <Text style={s("col-accent")}>يبدأ من</Text>
                    <Text style={s("col-accent fs-3")}>{Object.values(item.prices)[0]} EGP</Text>

                </View>
            </>
        }
        </Pressable>
    )
}
