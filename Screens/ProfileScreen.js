import { StatusBar } from 'expo-status-bar';
import { Modal, View, Image, Pressable, ScrollView } from 'react-native';
import styles from "../styles";
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
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />

            {/* Screen Content */}
            <ScreenContent
                header={
                    <Text font="Harmattan" style={{fontSize:35}}>الملف الشخصي</Text>
                }
            >
                {
                    loading ?
                    <Text>جاري التحميل</Text>
                    :
                    user ?
                    <>
                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['gap-3'], ...styles['j-content-b']}}>
                            <View style={{...styles['al-items-s']}}>
                                <Text style={{...styles['fs-3']}}>{user.username}</Text>
                                <Text style={{...styles['fs-3'], ...styles['col-gray']}}>{user.email}</Text>
                                <Text style={{...styles['fs-3'], ...styles['col-gray']}}>user.mobileNo</Text>
                            </View>
                            <View style={{...styles['rounded-2'], ...styles['shadow'], ...styles['bg-accent']}}>
                                <MaterialIcons name="person" color="white" style={{fontSize:150}} />
                            </View>
                        </View>

                        <View style={{...styles['w-100'], ...styles['bg-accent'], ...styles['rounded-2'], ...styles['shadow'], ...styles['p-2']}}>
                            <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['gap-2'], ...styles['mb-1']}}>
                                <Text style={{...styles['col-white'], ...styles['fs-4'], ...styles['mb-1']}}>المعلومات العامة</Text>

                                <View style={{...styles['w-100'], ...styles['gap-2']}}>
                                    <Input placeholder="إسم المستخدم"/>
                                
                                    <Input placeholder="رقم الهاتف"/>
                                </View>
                            </View>

                            <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['gap-2'], ...styles['mb-1']}}>
                                <Text style={{...styles['col-white'], ...styles['fs-4'], ...styles['mb-1']}}>العنوان</Text>

                                <View style={{...styles['w-100'], ...styles['gap-2']}}>
                                    <Input placeholder="المدينة"/>
                                
                                    <Input placeholder="سطر العنوان الأول"/>
                                
                                    <Input placeholder="سطر العنوان الأول"/>
                                </View>
                            </View>
                        </View>

                        <Button
                            onPress={()=>auth.signOut()}>
                            <Text style={{...styles['fs-3'], ...styles['col-white']}}>تسجيل الخروج</Text>
                        </Button>
                    </>
                    :
                    <>
                        <Button onPress={()=>navigation.navigate("Login")}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>تسجيل الدخول</Text>
                        </Button>

                        <Button onPress={()=>navigation.navigate("Register")}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>تسجيل مستخدم جديد</Text>
                        </Button>
                    </>
                }
            </ScreenContent>
        </View>

    )
}