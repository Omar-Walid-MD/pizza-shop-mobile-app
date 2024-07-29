import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../../styles";
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
import { useSelector } from 'react-redux';
import ScreenContent from '../Components/Layout/ScreenContent';
import { auth } from '../Firebase/firebase';


export default function ProfileScreen({navigation}) {

    const user = useSelector(store => store.auth.user);
    const loading = useSelector(store => store.auth.loading);

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent
            header={
                <Text style={s("fs-2")}>الملف الشخصي</Text>
            }
            >
            {
                loading ?
                <Text>جاري التحميل</Text>
                :
                user ?
                <>
                    <View style={s("w-100 flex-row gap-3 j-content-b")}>
                        <View style={s("al-items-s")}>
                            <Text style={s("fs-3")}>{user.username}</Text>
                            <Text style={s("fs-3 col-gray")}>{user.email}</Text>
                            <Text style={s("fs-3 col-gray")}>user.mobileNo</Text>
                        </View>
                        <View style={s("rounded-2 shadow bg-accent")}>
                            <MaterialIcons name="person" color="white" style={{fontSize:150}} />
                        </View>
                    </View>

                    <View style={s("w-100 bg-accent rounded-2 shadow p-2")}>
                        <View style={s("w-100 al-items-c gap-2 mb-1")}>
                            <Text style={s("col-white fs-4 mb-1")}>المعلومات العامة</Text>

                            <View style={s("w-100 gap-2")}>
                                <Input placeholder="إسم المستخدم"/>
                            
                                <Input placeholder="رقم الهاتف"/>
                            </View>
                        </View>

                        <View style={s("w-100 al-items-c gap-2 mb-1")}>
                            <Text style={s("col-white fs-4 mb-1")}>العنوان</Text>

                            <View style={s("w-100 gap-2")}>
                                <Input placeholder="المدينة"/>
                           
                                <Input placeholder="سطر العنوان الأول"/>
                         
                                <Input placeholder="سطر العنوان الأول"/>
                            </View>

                        </View>
                    </View>

                    <Button
                    onPress={()=>auth.signOut()}>
                        <Text style={s("fs-3 col-white")}>تسجيل الخروج</Text>
                    </Button>
                </>
                :
                <>
                    <Button onPress={()=>navigation.navigate("Login")}>
                        <Text style={s("col-white fs-3")}>تسجيل الدخول</Text>
                    </Button>

                    <Button onPress={()=>navigation.navigate("Register")}>
                        <Text style={s("col-white fs-3")}>تسجيل مستخدم جديد</Text>
                    </Button>
                </>
            }
            </ScreenContent>
        </View>
    )
}