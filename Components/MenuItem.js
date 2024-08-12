import {View, Image, Pressable } from 'react-native';
import styles from "../styles";
import Text from './Text';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItemOptions, setMenuItemToShow } from '../Store/Items/itemsSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../I18n/i18n';


export default function MenuItem({itemId}) {

    const { t: translate} = useTranslation();

    const items = useSelector(store => store.items.items);
    const item = items && items[itemId];

    // console.log(item.image);

    const dispatch = useDispatch();

    function openMenuItem()
    {
        dispatch(setMenuItemToShow(itemId));
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
                    <Image source={{uri:item.image+".png"}} style={{position:"relative",height:130,aspectRatio:1}} resizeMode='contain'/>
                    <Text
                    weight='sb'
                    style={{...styles['mt-1'],...styles['text-center'],...styles['lh-normal'],...styles['fs-4']}}
                    >{item.name[i18n.language]}</Text>

                    <Text style={{...styles['col-accent']}} >{translate("starting_from")}</Text>
                    <View
                    style={{...styles['flex-row'],...styles['gap-1'],...styles['al-items-e']}}
                    >
                        <Text
                        style={{...styles['col-accent'],...styles['fs-3']}}
                        weight='b'
                        >{Object.values(item.prices)[0]}</Text>
                        <Text
                        weight='b'
                        style={{fontSize:12,marginBottom:5,...styles['col-accent']}}
                        >{translate("currency")}</Text>
                        
                    </View>
                </View>
            </>
        }
        </Pressable>
    )
}
