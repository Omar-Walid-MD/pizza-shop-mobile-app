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
import { useSelector } from 'react-redux';


export default function ProfileScreen({navigation}) {

    const user = useSelector(store => store.auth.user);
    const loading = useSelector(store => store.auth.loading);

    return(
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <View style={s("screen-content")}>
            {
                loading ?
                <Text>جاري التحميل</Text>
                :
                user ?
                <>
                    <Text>مرحبا بك</Text>
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
            </View>
        </View>
    )
}