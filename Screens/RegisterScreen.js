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
                            <Input placeholder="إسم المستخدم" onChangeText={(text) => handleRegisterInfo(text, "username")}/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="البريد الإلكتروني" onChangeText={(text) => handleRegisterInfo(text, "email")}/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="كلمة المرور" secureTextEntry autoCorrect={false} onChangeText={(text) => handleRegisterInfo(text, "password")}/>
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="تأكيد كلمة المرور" secureTextEntry autoCorrect={false} onChangeText={(text) => handleRegisterInfo(text, "confirmPassword")}/>
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
                <Button onPress={() => navigation.navigate("Main")}>
                    <Text style={{...styles['col-white'], ...styles['fs-3']}}>العودة</Text>
                </Button>
            </ScreenContent>
        </View>

    )
}