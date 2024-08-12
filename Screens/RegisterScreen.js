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
import { useTranslation } from 'react-i18next';

export default function RegisterScreen({navigation}) {

    const { t: translate} = useTranslation();

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
                <Text style={{...styles['fs-2']}}>
                    {translate("register.welcome_message")}
                </Text>

                <View style={{...styles['w-100'], ...styles['gap-3']}}>
                    <View style={{...styles['w-100']}}>
                        <Input placeholder={translate("register.username_placeholder")} value={registerInfo.username} onChangeText={(text) => handleRegisterInfo(text, "username")} label/>
                    </View>

                    <View style={{...styles['w-100']}}>
                        <Input placeholder={translate("register.email_placeholder")} value={registerInfo.email} onChangeText={(text) => handleRegisterInfo(text, "email")} label/>
                    </View>

                    <View style={{...styles['w-100']}}>
                        <Input placeholder={translate("register.mobile_placeholder")} value={registerInfo.mobileNo} onChangeText={(text) => handleRegisterInfo(text, "mobileNo")} label keyboardType="phone-pad"/>
                    </View>

                    <View style={{...styles['w-100']}}>
                        <Input placeholder={translate("register.password_placeholder")} value={registerInfo.password} secureTextEntry autoCorrect={false} onChangeText={(text) => handleRegisterInfo(text, "password")} label/>
                    </View>

                    <View style={{...styles['w-100']}}>
                        <Input placeholder={translate("register.confirm_password_placeholder")} value={registerInfo.confirmPassword} secureTextEntry autoCorrect={false} onChangeText={(text) => handleRegisterInfo(text, "confirmPassword")} label/>
                    </View>

                    <Button onPress={() => handleSignUp("email")}>
                        <Text style={{...styles['col-white'], ...styles['fs-3']}}>
                            {translate("register.sign_up_button")}
                        </Text>
                    </Button>

                    <Text style={{...styles['w-100'], ...styles['text-center'], ...styles['py-2']}}>
                        {translate("register.or")}
                    </Text>

                    <Button variant='white' onPress={() => handleSignUp("google")}>
                        <Text style={{...styles['fs-4'], ...styles['col-danger']}}>
                            {translate("register.google_sign_up")}
                        </Text>
                    </Button>

                    <Button variant='white' onPress={() => navigation.navigate("Main")}>
                        <Text style={{...styles['fs-4'], ...styles['col-primary']}}>
                            {translate("register.facebook_sign_up")}
                        </Text>
                    </Button>
                </View>
            </View>
            <View style={{...styles['flex-row'], ...styles['j-content-b']}}>
                <Button style={{alignSelf:"center"}} onPress={() => navigation.navigate("Login")}>
                    <Text style={{...styles['col-white'], ...styles['fs-4']}}>
                        {translate("register.login_button")}
                    </Text>
                </Button>
                <Button style={{alignSelf:"center"}} variant='green' onPress={() => navigation.navigate("Main")}>
                    <Text style={{...styles['col-white'], ...styles['fs-4']}}>
                        {translate("register.go_back_button")}
                    </Text>
                </Button>
            </View>
        </ScreenContent>
    </View>

    )
}