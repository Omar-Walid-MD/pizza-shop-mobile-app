import { View } from 'react-native';
import styles from "../styles";
import Input from '../Components/Input';
import { useState } from 'react';
import Button from '../Components/Button';
import Text from '../Components/Text';
import Background from '../Components/Background';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import ScreenContent from '../Components/Layout/ScreenContent';


export default function LoginScreen({navigation}) {

    const [loginInfo,setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const [errorMessage,setErrorMessage] = useState("");

    function handleLoginInfo(text,property)
    {
        setLoginInfo(l => ({...l,[property]:text.trim()}));
    }

    async function handleSignIn(signInType)
    {
        let userCred;
        if(signInType==="email")
        {
            try {  
                userCred = await signInWithEmailAndPassword(auth,loginInfo.email,loginInfo.password);
            } catch (error) {

                if(error.code==="auth/invalid-credential")
                {
                    setErrorMessage("البريد أو كلمة المرور غير صحيحة.")
                }
                return
            }
        }

        if(userCred?.user)
        {
            navigation.navigate("Main")
            // const loggedInUserInfo = await getUser(userCred.user.uid);
            
            // if(loggedInUserInfo)
            // {
            //     const user = {
            //         userId: userCred.user.uid,
            //         email: userCred.user.email,
            //         ...loggedInUserInfo
            //     }
            //     dispatch(setUser(user));
            //     navigate("/");
            // }
            // else
            // {
            //     navigate("/");
            // }

        }
    }

    return(
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent>
                <View style={{...styles['w-100'], ...styles['bg-main'], ...styles['shadow'], ...styles['al-items-c'], ...styles['p-2'], ...styles['gap-4'], borderTopLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Text style={{...styles['fs-2']}}>مرحبا بك مجددا</Text>

                    <View style={{...styles['w-100'], ...styles['gap-3']}}>
                        <View style={{...styles['w-100']}}>
                            <Input placeholder="البريد الإلكتروني" onChangeText={(text) => handleLoginInfo(text, "email")} />
                        </View>

                        <View style={{...styles['w-100']}}>
                            <Input placeholder="كلمة المرور" type="password" secureTextEntry autoCorrect={false} onChangeText={(text) => handleLoginInfo(text, "password")} />
                        </View>

                        {errorMessage && <Text style={{...styles['w-100'], ...styles['text-center'], ...styles['col-danger']}}>{errorMessage}</Text>}

                        <Button onPress={() => handleSignIn("email")}>
                            <Text style={{...styles['col-white'], ...styles['fs-3']}}>تسجيل الدخول</Text>
                        </Button>

                        <Text style={{...styles['w-100'], ...styles['text-center'], ...styles['py-2']}}>أو يمكنك</Text>

                        <Button variant='white' onPress={() => navigation.navigate("Main")}>
                            <Text style={{...styles['fs-4'], ...styles['col-danger']}}>تسجيل الدخول عبر Google</Text>
                        </Button>

                        <Button variant='white' onPress={() => navigation.navigate("Main")}>
                            <Text style={{...styles['fs-4'], ...styles['col-primary']}}>تسجيل الدخول عبر FaceBook</Text>
                        </Button>
                    </View>
                </View>
                <View
                //style[flex-row j-content-b]
                style={{...styles['flex-row'],...styles['j-content-b']}}
                >
                    <Button style={{alignSelf:"center"}} onPress={() => navigation.navigate("Register")}>
                        <Text style={{...styles['col-white'], ...styles['fs-4']}}>أنشئ حساب</Text>
                    </Button>
                    <Button style={{alignSelf:"center"}} variant='green' onPress={() => navigation.navigate("Main")}>
                        <Text style={{...styles['col-white'], ...styles['fs-4']}}>العودة</Text>
                    </Button>
                </View>
            </ScreenContent>
        </View>

    )
}