import {View, Image, Pressable } from 'react-native';
import styles from "../styles";
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
        <Pressable
        style={{...styles['menu-item-col'],...styles['p-1']}}
        onPress={openMenuItem}
        >
        {
            item &&
            <>
                <View
            style={{...styles['menu-item-container'],...styles['shadow'],...styles['bg-white'],...styles['p-2'],...styles['al-items-c']}}
            pointerEvents='none'>
                    <Image source={require("../assets/img/pizza.png")} style={{position:"relative",height:100}} resizeMode='contain'/>
                    <Text
                    style={{...styles['mt-1'],...styles['text-center'],...styles['lh-normal'],...styles['fs-4']}}
                    >{item.name}</Text>

                    <Text style={{...styles['col-accent'],...styles['fs-3']}} >يبدأ من</Text>
                    <Text style={{...styles['col-accent']}}>{Object.values(item.prices)[0]} EGP</Text>

                </View>
            </>
        }
        </Pressable>
    )
}
