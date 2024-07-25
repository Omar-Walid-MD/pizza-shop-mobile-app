import { View } from 'react-native';
import { s } from '../styles';
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
        <View style={s("screen-container")}>
            {/* Background */}
            <Background />
            
            {/* Screen Content */}
            <ScreenContent>
                <View style={s("w-100 bg-main shadow al-items-c p-2 gap-4",{borderTopLeftRadius:10,borderBottomRightRadius:10})}>
                    <Text style={s("fs-2")}>مرحبا بك مجددا</Text>

                    <View style={s("w-100 gap-3")}>
                        <View style={s("w-100")}>
                            <Input placeholder="البريد الإلكتروني" onChangeText={(text)=>handleLoginInfo(text,"email")} />
                        </View>

                        <View style={s("w-100")}>
                            <Input placeholder="كلمة المرور" type="password" secureTextEntry autoCorrect={false} onChangeText={(text)=>handleLoginInfo(text,"password")} />
                        </View>

                        {errorMessage && <Text style={s("w-100 text-center col-danger")}>{errorMessage}</Text>}

                        <Button onPress={()=>handleSignIn("email")}>
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
            </ScreenContent>
        </View>
    )
}