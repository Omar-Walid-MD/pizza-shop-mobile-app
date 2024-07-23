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


export default function RegisterScreen({navigation}) {

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <View style={s("screen-content")}>
                <View style={s("w-100 bg-main shadow al-items-c p-2 gap-4",{borderTopLeftRadius:10,borderBottomRightRadius:10})}>
                    <Text style={s("fs-2")}>تشرفنا خدمتك</Text>

                    <View style={s("w-100 gap-3")}>
                        <View style={s("w-100")}>
                            <Input placeholder="إسم المستخدم" />
                        </View>

                        <View style={s("w-100")}>
                            <Input placeholder="البريد الإلكتروني" />
                        </View>

                        <View style={s("w-100")}>
                            <Input placeholder="كلمة المرور" secureTextEntry autoCorrect={false}/>
                        </View>

                        <View style={s("w-100")}>
                            <Input placeholder="تأكيد كلمة المرور" secureTextEntry autoCorrect={false}/>
                        </View>

                        <Button onPress={()=>navigation.navigate("Main")}>
                            <Text style={s("col-white fs-3")}>تسجيل الدخول</Text>
                        </Button>

                        <Text style={s("w-100 text-center py-2")}>أو يمكنك</Text>

                        <Button variant='white' onPress={()=>navigation.navigate("Main")}>
                            <Text style={s("fs-4 col-danger")}>تسجيل الدخول عبر Google</Text>
                        </Button>

                        <Button variant='white' onPress={()=>navigation.navigate("Main")}>
                            <Text style={s("fs-4 col-primary")}>تسجيل الدخول عبر FaceBook</Text>
                        </Button>

                    </View>
                </View>
                <Button onPress={()=>navigation.navigate("Main")}>
                    <Text style={s("col-white fs-3")}>العودة</Text>
                </Button>
            </View>
        </View>
    )
}