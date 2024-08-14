import {View, Image, Pressable } from 'react-native';
import styles from "../styles";
import Text from './Text';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItemToShow } from '../Store/Cart/cartSlice';
import { capitalize } from '../helpers';
import { useTranslation } from 'react-i18next';
import i18n from '../I18n/i18n';


export default function CartItem({itemInfo}) {

    const { t: translate} = useTranslation();
    const items = useSelector(store => store.items.items);
    const item = Object.keys(items).length ? items[itemInfo.id] : null;

    const sizeColors = {
        "s": "#589941",
        "m": "#C0851A",
        "l": "#C03E3E"
    }



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
        {
            item &&
            <>
                <View
                //style[menu-item-container shadow bg-white p-2 al-items-c]
                style={{...styles['menu-item-container'],...styles['shadow'],...styles['bg-white'],...styles['p-2'],...styles['al-items-c']}}
                pointerEvents='none'>
                        <Image source={{uri:item.image+".png"}} style={{position:"relative",height:130,aspectRatio:1}} resizeMode='contain'/>
                        <Text style={{...styles['mt-1'],...styles['text-center'],...styles['lh-normal'],...styles['fs-4']}}
                    weight='sb'
                    >{item.name[i18n.language]}</Text>

                    <View
                    style={{...styles['w-100'],...styles['al-items-c'],...styles['rounded'],...styles['shadow'],...styles['my-1'],padding:2.5,backgroundColor:sizeColors[itemInfo.size]}}
                    >
                        <Text
                        weight='sb'
                        style={{...styles['col-white'],...styles['fs-4']}}
                        >{capitalize(translate(`size.${itemInfo.size}`))}</Text>
                    </View>

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
            </>
        }
        </Pressable>
    )
}
