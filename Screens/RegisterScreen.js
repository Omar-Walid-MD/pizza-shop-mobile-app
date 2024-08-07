import {  View } from 'react-native';
import styles from "../styles";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase/firebase";

import Input from '../Components/Input';
import { useState } from 'react';
import Button from '../Components/Button';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { registerUser } from '../Firebase/Data Handlers/users';


export default function RegisterScreen({navigation}) {

    const [registerInfo,setRegisterInfo] = useState({
        username: "",
        email:"",
        mobileNo: "",
        password: "",
        confirmPassword: ""
    });


    function handleRegisterInfo(text,property)
    {
        setRegisterInfo(l => ({...l,[property]:text.trim()}));
    }

    async function handleSignUp(signUpType)
    {
        let userCred;
        if(signUpType==="email")
        {
            try {
                userCred = await createUserWithEmailAndPassword(auth,registerInfo.email,registerInfo.password);
            } catch (error) {
                console.log(error)
                if(error.code==="auth/weak-password")
                {
                    // setErrorMessage("Password.length < 6")
                }
                return
            }

            registerUser(userCred.user.uid,{
                email: registerInfo.email,
                username: registerInfo.username
            });
            
            navigation.navigate("Main");
        }
    }

    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent>
                <View style={{...styles['w-100'], ...styles['bg-main'], ...styles['shadow'], ...styles['al-items-c'], ...styles['p-2'], ...styles['gap-4'], borderTopLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Text style={{...styles['fs-2']}}>تشرفنا خدمتك</Text>

                    <View style={{...styles['w-100'], ...styles['gap-3']}}>
                        <View style={{...styles['w-100']}}>
                            <Input placeholder="إسم المستخدم" value={registerInfo.username} onChangeText={(text) => handleRegisterInfo(text, "username")} label/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="البريد الإلكتروني" value={registerInfo.email} onChangeText={(text) => handleRegisterInfo(text, "email")} label/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="رقم الهاتف" value={registerInfo.mobileNo} onChangeText={(text) => handleRegisterInfo(text, "mobileNo")} label keyboardType="phone-pad"/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="كلمة المرور" value={registerInfo.password} secureTextEntry autoCorrect={false} onChangeText={(text) => handleRegisterInfo(text, "password")} label/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="تأكيد كلمة المرور" value={registerInfo.confirmPassword} secureTextEntry autoCorrect={false} onChangeText={(text) => handleRegisterInfo(text, "confirmPassword")} label/>
                        </View>

                        <Button onPress={() => handleSignUp("email")}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>تسجيل المستخدم</Text>
                        </Button>

                        <Text style={{...styles['w-100'], ...styles['text-center'], ...styles['py-2']}}>أو يمكنك</Text>

                        <Button variant='white' onPress={() => handleSignUp("google")}>
                            <Text style={{...styles['fs-4'], ...styles['col-danger']}}>تسجيل المستخدم عبر Google</Text>
                        </Button>

                        <Button variant='white' onPress={() => navigation.navigate("Main")}>
                            <Text style={{...styles['fs-4'], ...styles['col-primary']}}>تسجيل المستخدم عبر FaceBook</Text>
                        </Button>
                    </View>
                </View>
                <View
                //style[flex-row j-content-b]
                style={{...styles['flex-row'],...styles['j-content-b']}}
                >
                    <Button style={{alignSelf:"center"}} onPress={() => navigation.navigate("Login")}>
                        <Text style={{...styles['col-white'], ...styles['fs-4']}}>تسجيل دخول لحساب</Text>
                    </Button>
                    <Button style={{alignSelf:"center"}} variant='green' onPress={() => navigation.navigate("Main")}>
                        <Text style={{...styles['col-white'], ...styles['fs-4']}}>العودة</Text>
                    </Button>
                </View>
            </ScreenContent>
        </View>

    )
}