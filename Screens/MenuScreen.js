import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../Components/Input';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import { ListItem } from '@rneui/themed';
import MenuItem from '../Components/MenuItem';
import Accordion from '../Components/Accordion';
import { useMemo, useState } from 'react';
import Button from '../Components/Button';
import CheckBox from "../Components/CheckBox"
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItemOptions, setMenuItemToShow } from '../Store/Items/itemsSlice';


export default function MenuScreen({navigation}) {

    const dispatch = useDispatch();

    const itemsCategorized = useSelector(store => store.items.itemsCategorized);

    // const [itemOptions,setItemOptions] = useState({
    //     size: "",
    //     count: 1
    // });

    

    console.log("parent screen rerendered"); 

    return (
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent
            header={
                <Text style={s("fs-2 mb-3")}>القائمة</Text>
            }>                

                <View style={s("w-100 flex-row j-content-b gap-2")}>
                    <Input placeholder="ابحث هنا"/>
                    <Button>
                        <MaterialIcons name="search" size={25} color="white" /> 
                    </Button>
                </View>
                {
                    Object.keys(itemsCategorized).map((category,i)=>
                    <Accordion
                    content={<Text style={s("col-gray fs-3")}>{category}</Text>}
                    key={`cat-${i}`}
                    >
                        <ScrollView style={{}} contentContainerStyle={{flexGrow:1,paddingBottom:20}}>
                            <View style={s("row w-100",{})}>
                            {
                                itemsCategorized[category].map((item,i)=>
                                    <MenuItem item={item} openTab={()=>{
                                        dispatch(setMenuItemToShow(item));
                                        dispatch(setMenuItemOptions({size:Object.keys(item.prices)[0],count:1}))
                                    }} key={`menu-item-${i}`}/>
                                )
                            }
                            </View>
                        </ScrollView>
                    </Accordion>
                    )
                }
            </ScreenContent>



            {/* Modals */}
            <MenuItemModal />

      
            <StatusBar style="auto" />
        </View>
    );
}


function MenuItemModal({})
{
    const dispatch = useDispatch();
    const itemToShow = useSelector(store => store.items.menuItemToShow);
    const itemOptions = useSelector(store => store.items.menuItemOptions);
    const sizeStrings = {
        "s": "صغير",
        "m": "وسط",
        "l": "كبير"
    };

    return (
        <Modal visible={itemToShow!==null} animationType='slide'>
            <View style={s("w-100 h-100 bg-white shadow al-items-c")}>
            {
                itemToShow &&
                <ScrollView style={s("w-100")}>
                    <View style={s("w-100 p-4 al-items-c pt-4")}>
                        <Image source={require("../assets/img/pizza.png")} style={{height:250,position:"relative"}} resizeMode='contain' />
                        <Text style={s("mt-1 text-center fs-1")}>{itemToShow.name}</Text>

                        <View style={s("w-100 mt-2 gap-1 al-items-s")}>
                        {
                            itemToShow.desc.map((desc,i)=>
                            <Text style={s("fs-3 col-gray")} key={`pizza-desc-${i}`}>-  {desc}</Text>
                            )
                        }
                        </View>

                        <View style={s("w-100 al-items-c pt-4")}>
                            <Text style={s("fs-3")}>اختر الحجم</Text>

                            <View style={s("w-100 al-items-c pt-4")}>
                            {
                                Object.keys(itemToShow.prices).map((size,i)=>
                                <Pressable style={s("w-100 flex-row j-content-b")} key={`pizza-size-${i}`}
                                onPress={() => dispatch(setMenuItemOptions({...itemOptions,size}))}>

                                    <Text style={s("fs-3")}>{sizeStrings[size]} - {itemToShow.prices[size]}</Text>
                                    
                                    <CheckBox
                                    checked={itemOptions?.size === size}
                                    pointerEvents={"none"}
                                    />
                                </Pressable>
                                )
                            }
                            </View>
                        </View>


                        <View style={s("w-100 al-items-c pt-4 gap-2")}>
                            <Text style={s("fs-3")}>اختر العدد</Text>

                            <View style={s("w-75 flex-row j-content-b border-3 border-danger rounded shadow bg-white overflow-hidden")}>
                                <Pressable onPress={()=>dispatch(setMenuItemOptions({...itemOptions,count: itemOptions.count-1 ? itemOptions.count-1 : itemOptions.count}))}>
                                    <Text style={s("fs-3 bg-accent px-2 col-white")}>-</Text>
                                </Pressable>
                                <Text style={s("fs-3")}>{itemOptions?.count}</Text>
                                <Pressable onPress={()=>dispatch(setMenuItemOptions({...itemOptions,count: itemOptions.count<5 ? itemOptions.count+1 : itemOptions.count}))}>
                                    <Text style={s("fs-3 bg-accent px-2 col-white")}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                        
                        <Button style={s("mt-4 w-100")}>
                            <Text style={s("col-white fs-3")}>أضف الى السلة</Text>
                        </Button>


                    </View>
                </ScrollView>
            }

                <View style={s("pos-abs w-100 al-items-s")}>
                    <Button style={s("m-2")}
                    onPress={()=>dispatch(setMenuItemToShow(null))}
                    >
                        <MaterialCommunityIcons name="close" color="white" size={25} />
                    </Button>
                </View>

            </View>
        </Modal>
    )
}
 