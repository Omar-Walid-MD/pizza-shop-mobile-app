import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';
import { auth } from "../Firebase/firebase";
import { MaterialIcons } from "react-native-vector-icons";
import Loading from '../Components/Loading';
import { useTranslation } from 'react-i18next';


export default function HomeScreen({navigation}) {

    const currentOrderID = useSelector(store => store.orders.currentOrderID);
    const { t: translate} = useTranslation();

    const loading = useSelector(store => store.auth.loading);
    const user = useSelector(store => store.auth.user);

    return (
        <View style={{...styles['screen-container']}}>
        {/* Background */}
        {/* <Background /> */}

        {/* Screen Content */}
        <ScreenContent>
            <View style={{...styles['al-items-c']}}>
                <Text font='accent' style={{width:"100%",textAlign:"center",fontSize:40}}>
                    {translate("home.welcome_message")}
                </Text>
                {
                    loading ?
                    <Loading /> :
                    user ?
                    <Text style={{...styles['fs-2'],...styles['col-accent']}}>
                        {user.username}
                    </Text> :
                    <View style={{...styles['gap-1'],...styles['mt-2'],...styles['al-items-c']}}>
                        <Text weight='sb' style={{...styles['fs-3'],...styles['text-center']}}>
                            {translate("home.login_prompt")}
                        </Text>
                        <View style={{...styles['flex-row'],...styles['gap-2'],...styles['mt-1']}}>
                            <Button variant='green' onPress={()=>navigation.navigate("Register")}>
                                <Text style={{...styles['col-white'],...styles['fs-4']}}>
                                    {translate("home.create_account")}
                                </Text>
                            </Button>
                            <Button onPress={()=>navigation.navigate("Login")}>
                                <Text style={{...styles['col-white'],...styles['fs-4']}}>
                                    {translate("home.login")}
                                </Text>
                            </Button>
                        </View>
                    </View>
                }

                {
                    currentOrderID &&
                    <Button 
                        style={{...styles['mt-3'],...styles['w-100']}}
                        containerStyle={{...styles['flex-row'],...styles['gap-2']}}
                        onPress={()=>navigation.navigate("Cart")}
                    >
                        <Text style={{...styles['col-white'], ...styles['fs-3']}} weight='sb'>
                            {translate("home.pending_order")}
                        </Text>
                        <MaterialIcons name="delivery-dining" color="white" size={30} />
                    </Button>
                }
            </View>
        </ScreenContent>

        <StatusBar style="auto" />
    </View>

    );
}
 
