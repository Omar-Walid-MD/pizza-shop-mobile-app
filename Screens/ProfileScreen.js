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
import { useDispatch, useSelector } from 'react-redux';
import ScreenContent from '../Components/Layout/ScreenContent';
import { auth } from '../Firebase/firebase';
import { updateUserInfo } from '../Firebase/Data Handlers/users';
import { setUser } from '../Store/Auth/authSlice';


export default function ProfileScreen({navigation}) {

    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.user);
    const loading = useSelector(store => store.auth.loading);

    const [edit,setEdit] = useState(false);
    const [editInfo,setEditInfo] = useState({});

    function handleEditInfo(text,property)
    {
        setEditInfo(e => ({...e,[property]:text.trim()}));
    }

    async function handleSaveEdit()
    {
        if(Object.keys(editInfo).every((key)=>editInfo[key]))
        {
            await updateUserInfo(user.userId,editInfo);
            dispatch(setUser({...user,...editInfo}));
    
            setEdit(false);
        }
    }

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
                                <Text style={{...styles['fs-3'], ...styles['col-gray']}}>{user.mobileNo || ""}</Text>
                            </View>
                            <View style={{...styles['rounded-2'], ...styles['shadow'], ...styles['bg-accent']}}>
                                <MaterialIcons name="person" color="white" style={{fontSize:150}} />
                            </View>
                        </View>

                        <View style={{...styles['w-100'], ...styles['bg-accent'], ...styles['rounded-2'], ...styles['shadow'], ...styles['p-2']}}>
                            <View style={{...styles['w-100'], ...styles['al-items-c'], ...styles['gap-2'], ...styles['mb-1']}}>
                            {
                                !edit ?
                                <>
                                    <View
                                    style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['mb-2']}}
                                    >
                                        <Text weight='b' style={{...styles['col-white'], ...styles['fs-4'], ...styles['mb-1']}}>معلومات المستخدم</Text>
                                        <Button variant='green'
                                        onPress={()=>{
                                            setEdit(true); setEditInfo({
                                                username: user.username,
                                                mobileNo: user.mobileNo
                                            });
                                        }}
                                        >
                                            <MaterialCommunityIcons name="pencil" color="white" size={20}/>
                                        </Button>
                                    </View>

                                    <View style={{...styles['w-100'], ...styles['gap-2']}}>
                                        <Input value={user.username} editable={false} placeholder="إسم المستخدم"/>
                                        <Input value={user.mobileNo || ""} editable={false} placeholder="رقم الهاتف"/>
                                    </View>
                                </>
                                :
                                <>
                                    <View
                                    style={{...styles['w-100'],...styles['flex-row'],...styles['j-content-b'],...styles['mb-2']}}
                                    >
                                        <Text weight='b' style={{...styles['col-white'], ...styles['fs-4'], ...styles['mb-1']}}>معلومات المستخدم</Text>
                                        <Button variant='white'
                                        onPress={()=>{
                                            setEdit(false); setEditInfo({});
                                        }}
                                        >
                                            <MaterialCommunityIcons name="close" color="red" size={25}/>
                                        </Button>
                                    </View>

                                    <View style={{...styles['w-100'], ...styles['gap-2']}}>
                                        <Input value={editInfo.username} onChangeText={(t)=>handleEditInfo(t,"username")} placeholder="إسم المستخدم"/>
                                        <Input value={editInfo.mobileNo} onChangeText={(t)=>handleEditInfo(t,"mobileNo")} placeholder="رقم الهاتف" keyboardType="phone-pad"/>
                                    </View>

                                    <Button variant='green'
                                    //style[w-100 mt-2]
                                    style={{...styles['w-100'],...styles['mt-2']}}
                                    onPress={handleSaveEdit}
                                    >
                                        <Text
                                        //style[col-white fs-3]
                                        style={{...styles['col-white'],...styles['fs-3']}}
                                        >حفظ التغييرات</Text>
                                    </Button>
                                </>
                            }
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