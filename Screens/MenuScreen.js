import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles, { s } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../Components/Input';
import  { MaterialCommunityIcons, MaterialIcons } from "react-native-vector-icons";
import { ListItem } from '@rneui/themed';
import MenuItem from '../Components/MenuItem';
import Accordion from '../Components/Accordion';
import { useState } from 'react';
import Button from '../Components/Button';
import { CheckBox } from '@rneui/base';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';


export default function MenuScreen({navigation}) {

    const [itemShowTab,setItemShowTab] = useState(false);

    const [sizeIndex,setSizeIndex] = useState(0);
    const [itemCount,setItemCount] = useState(1);

    const pizzaSizes = [
        {
            price: 50,
            name: "size 1"
        },
        {
            price: 75,
            name: "size 2"
        },
        {
            price: 100,
            name: "size 3"
        },
    ]

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

                <Accordion
                content={<Text style={s("col-gray fs-3 pr-4")}>عنوان</Text>}
                >
                    <ScrollView style={{}} contentContainerStyle={{flexGrow:1,paddingBottom:500}}>
                        <View style={s("row w-100",{})}>
                        {
                            Array.from({length:10}).map((x,i)=>
                                <MenuItem openTab={()=>setItemShowTab(true)} key={`menu-item-${i}`}/>
                            )
                        }
                        </View>
                    </ScrollView>
                </Accordion>
            </ScreenContent>



            {/* Modals */}
            <Modal visible={itemShowTab} animationType='slide'>
                <View style={s("w-100 h-100 bg-white shadow al-items-c")}>

                    <ScrollView style={s("w-100")}>
                        <View style={s("w-100 p-4 al-items-c pt-4")}>
                            <Image source={require("../assets/img/pizza.png")} style={{height:250,position:"relative"}} resizeMode='contain' />
                            <Text style={s("mt-1 text-center fs-1")}>Pizza Name Label</Text>

                            <View style={s("w-100 mt-2 gap-1 al-items-s")}>
                            {
                                Array.from({length:4}).map((x,i)=>
                                <Text style={s("fs-3 col-gray")} key={`pizza-desc-${i}`}>-  وصف البيتزا</Text>
                                )
                            }
                            </View>

                            <View style={s("w-100 al-items-c pt-4")}>
                                <Text style={s("fs-3")}>اختر الحجم</Text>

                                <View style={s("w-100 al-items-c pt-4")}>
                                {
                                    pizzaSizes.map((pizzaSize,i)=>
                                    <View style={s("w-100 flex-row j-content-b")} key={`pizza-size-${i}`}>
                                        <Text style={s("fs-3")}>{pizzaSize.name} - {pizzaSize.price}</Text>
                                        <CheckBox
                                        checked={sizeIndex === i}
                                        onPress={() => setSizeIndex(i)}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        checkedColor="#820000"
                                        />
                                    </View>
                                    )
                                }
                                </View>
                            </View>


                            <View style={s("w-100 al-items-c pt-4 gap-2")}>
                                <Text style={s("fs-3")}>اختر العدد</Text>

                                <View style={s("w-75 flex-row j-content-b border-2 border-gray rounded")}>
                                    <Pressable onPress={()=>setItemCount(x => x-1 ? x-1 : x)}>
                                        <Text style={s("fs-3 bg-black px-1 col-white")}>-</Text>
                                    </Pressable>
                                    <Text style={s("fs-3")}>{itemCount}</Text>
                                    <Pressable onPress={()=>setItemCount(x => x+1<=5 ? x+1 : x)}>
                                        <Text style={s("fs-3 bg-black px-1 col-white")}>+</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <Button style={s("mt-4 w-100")}>
                                <Text style={s("col-white fs-3")}>أضف الى السلة</Text>
                            </Button>


                        </View>
                    </ScrollView>

                    <View style={s("pos-abs w-100 al-items-s")}>
                        <Button style={s("m-2")}
                        onPress={()=>setItemShowTab(false)}
                        >
                            <MaterialCommunityIcons name="close" color="white" size={25} />
                        </Button>
                    </View>

                </View>
            </Modal>

      
            <StatusBar style="auto" />
        </View>
    );
}
 
